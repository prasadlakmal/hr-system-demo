import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialUsers = [
  { name: 'User 1' },
  { name: 'User 2' },
  { name: 'User 3' },
];

const seed = async () => {
  await prisma.user.deleteMany();

  for (const user of initialUsers) {
    await prisma.user.create({
      data: user,
    });
  }
};

seed();
