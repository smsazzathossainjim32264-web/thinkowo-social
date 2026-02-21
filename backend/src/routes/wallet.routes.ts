import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

router.get('/me', requireAuth, async (req, res) => {
  const [user, txs] = await Promise.all([
    prisma.user.findUnique({ where: { id: req.user!.id }, select: { owocoinBalance: true } }),
    prisma.walletTransaction.findMany({ where: { OR: [{ fromUserId: req.user!.id }, { toUserId: req.user!.id }] }, orderBy: { createdAt: 'desc' }, take: 100 }),
  ]);
  res.json({ balance: user?.owocoinBalance ?? 0, transactions: txs });
});

router.post('/transfer', requireAuth, async (req, res) => {
  const { toUserId, amount } = req.body as { toUserId: string; amount: number };
  if (!Number.isInteger(amount) || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

  await prisma.$transaction(async (tx) => {
    const sender = await tx.user.findUnique({ where: { id: req.user!.id } });
    if (!sender || sender.owocoinBalance < amount) throw new Error('Insufficient balance');
    await tx.user.update({ where: { id: req.user!.id }, data: { owocoinBalance: { decrement: amount } } });
    await tx.user.update({ where: { id: toUserId }, data: { owocoinBalance: { increment: amount } } });
    await tx.walletTransaction.create({ data: { fromUserId: req.user!.id, toUserId, amount, type: 'TRANSFER' } });
  });
  res.json({ ok: true });
});

router.post('/mint', requireAuth, requireRole('ADMIN'), async (req, res) => {
  const { toUserId, amount } = req.body;
  await prisma.user.update({ where: { id: toUserId }, data: { owocoinBalance: { increment: amount } } });
  await prisma.walletTransaction.create({ data: { toUserId, amount, type: 'MINT', metadata: { by: req.user!.id } } });
  res.json({ ok: true });
});

export default router;
