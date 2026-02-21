import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { signToken } from '../utils/jwt';

const router = Router();
const schema = z.object({ email: z.string().email(), username: z.string().min(3).max(20), password: z.string().min(8) });

router.post('/register', async (req, res) => {
  const data = schema.parse(req.body);
  const exists = await prisma.user.findFirst({ where: { OR: [{ email: data.email }, { username: data.username }] } });
  if (exists) return res.status(409).json({ message: 'User exists' });

  const user = await prisma.user.create({
    data: { email: data.email, username: data.username, passwordHash: await bcrypt.hash(data.password, 12) },
  });
  return res.json({ token: signToken({ id: user.id, role: user.role }), user });
});

router.post('/login', async (req, res) => {
  const data = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ message: 'Invalid credentials' });
  return res.json({ token: signToken({ id: user.id, role: user.role }), user });
});

export default router;
