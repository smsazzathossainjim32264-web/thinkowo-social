import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();
router.use(requireAuth, requireRole('ADMIN'));

router.get('/stats', async (_req, res) => {
  const [users, posts, txCount] = await Promise.all([prisma.user.count(), prisma.post.count(), prisma.walletTransaction.count()]);
  res.json({ users, posts, txCount });
});

router.get('/reports', async (_req, res) => {
  res.json([{ id: 'r1', type: 'content', status: 'open' }]);
});

router.patch('/users/:id/verify', async (req, res) => {
  await prisma.user.update({ where: { id: req.params.id }, data: { isVerified: true } });
  res.json({ ok: true });
});

export default router;
