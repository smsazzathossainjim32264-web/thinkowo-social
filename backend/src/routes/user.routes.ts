import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  res.json(user);
});

router.patch('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: { bio: req.body.bio, avatarUrl: req.body.avatarUrl, coverUrl: req.body.coverUrl, socialLinks: req.body.socialLinks },
  });
  res.json(user);
});

router.post('/:id/follow', requireAuth, async (req, res) => {
  await prisma.follow.create({ data: { followerId: req.user!.id, followingId: req.params.id } });
  res.json({ ok: true });
});

router.delete('/:id/follow', requireAuth, async (req, res) => {
  await prisma.follow.delete({ where: { followerId_followingId: { followerId: req.user!.id, followingId: req.params.id } } });
  res.json({ ok: true });
});

export default router;
