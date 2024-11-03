import { prisma } from '@/lib/prisma';

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export type User = Awaited<ReturnType<typeof getUsers>>[0];
