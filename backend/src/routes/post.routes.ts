import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', async (_req, res) => {
  const posts = await prisma.post.findMany({ include: { author: true, comments: true }, orderBy: { createdAt: 'desc' }, take: 50 });
  res.json(posts);
});

router.get('/trending', async (_req, res) => {
  const posts = await prisma.post.findMany({ orderBy: [{ likeCount: 'desc' }, { shareCount: 'desc' }, { createdAt: 'desc' }], take: 20 });
  res.json(posts);
});

router.post('/', requireAuth, async (req, res) => {
  const data = z.object({ content: z.string().min(1), mediaUrl: z.string().optional(), mediaType: z.string().optional(), hashtags: z.array(z.string()).optional(), isPaid: z.boolean().optional(), coinPrice: z.number().int().min(0).optional() }).parse(req.body);
  const post = await prisma.post.create({ data: { ...data, authorId: req.user!.id, hashtags: data.hashtags || [] } });
  await prisma.walletTransaction.create({ data: { toUserId: req.user!.id, type: 'REWARD', amount: 2, metadata: { reason: 'post_reward', postId: post.id } } });
  await prisma.user.update({ where: { id: req.user!.id }, data: { owocoinBalance: { increment: 2 } } });
  res.status(201).json(post);
});

router.post('/:id/comment', requireAuth, async (req, res) => {
  const comment = await prisma.comment.create({ data: { postId: req.params.id, authorId: req.user!.id, content: req.body.content } });
  res.status(201).json(comment);
});

export default router;
