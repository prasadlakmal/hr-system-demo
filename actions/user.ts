'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
});

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const createUser = async (data: Omit<User, 'id'>) => {
  try {
    const { name } = createUserSchema.parse({
      name: data.name,
    });

    await prisma.user.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.log('Failed saving user: ', error);
  }
  revalidatePath('/users');
};

export type User = Awaited<ReturnType<typeof getUsers>>[0];
