import { Router } from 'express';
import { prisma } from '../config/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

const tierPrice: Record<string, number> = { FREE: 0, PREMIUM: 100, CREATOR_PRO: 250 };

router.post('/change-tier', requireAuth, async (req, res) => {
  const { tier, payWithCoins } = req.body as { tier: 'FREE' | 'PREMIUM' | 'CREATOR_PRO'; payWithCoins: boolean };
  const price = tierPrice[tier] ?? 0;

  if (payWithCoins && price > 0) {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: req.user!.id } });
      if (!user || user.owocoinBalance < price) throw new Error('Insufficient balance');
      await tx.user.update({ where: { id: req.user!.id }, data: { owocoinBalance: { decrement: price }, tier } });
      await tx.walletTransaction.create({ data: { fromUserId: req.user!.id, amount: price, type: 'SUBSCRIPTION', metadata: { tier } } });
    });
  } else {
    await prisma.user.update({ where: { id: req.user!.id }, data: { tier } });
  }

  res.json({ ok: true, tier });
});

export default router;
