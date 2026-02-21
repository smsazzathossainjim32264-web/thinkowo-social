import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Password123!', 12);

  const [admin, alice, bob] = await Promise.all([
    prisma.user.upsert({ where: { email: 'admin@thinkowo.dev' }, update: {}, create: { email: 'admin@thinkowo.dev', username: 'admin', passwordHash, role: 'ADMIN', owocoinBalance: 10000, isVerified: true } }),
    prisma.user.upsert({ where: { email: 'alice@thinkowo.dev' }, update: {}, create: { email: 'alice@thinkowo.dev', username: 'alice', passwordHash, role: 'CREATOR', tier: 'CREATOR_PRO', owocoinBalance: 1500, isVerified: true } }),
    prisma.user.upsert({ where: { email: 'bob@thinkowo.dev' }, update: {}, create: { email: 'bob@thinkowo.dev', username: 'bob', passwordHash, owocoinBalance: 500 } }),
  ]);

  await prisma.post.createMany({ data: [
    { authorId: alice.id, content: 'Welcome to Think OwO 🚀 #thinkowo', hashtags: ['thinkowo'] },
    { authorId: bob.id, content: 'OwO Coin is live! #owocoin', hashtags: ['owocoin'] },
  ]});

  await prisma.walletTransaction.createMany({ data: [
    { toUserId: alice.id, type: 'MINT', amount: 1500 },
    { toUserId: bob.id, type: 'MINT', amount: 500 },
  ]});

  console.log('Seeded demo data');
  console.log({ admin: admin.email, alice: alice.email, bob: bob.email });
}

main().finally(() => prisma.$disconnect());
