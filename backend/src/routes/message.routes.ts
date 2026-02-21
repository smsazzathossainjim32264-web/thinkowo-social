import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.get('/:userId', requireAuth, async (req, res) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: req.user!.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user!.id },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });
  res.json(messages);
});

router.post('/:userId', requireAuth, async (req, res) => {
  const msg = await prisma.message.create({ data: { senderId: req.user!.id, receiverId: req.params.userId, content: req.body.content, attachmentUrl: req.body.attachmentUrl } });
  res.status(201).json(msg);
});

export default router;
