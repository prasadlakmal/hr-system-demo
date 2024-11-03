'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
});

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return notFound();
  }

  return user;
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

export const updateUser = async (data: User) => {
  try {
    const { name } = createUserSchema.parse({
      name: data.name,
    });

    await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log('Failed updating user: ', error);
  }
  revalidatePath('/users');
};

export type User = Awaited<ReturnType<typeof getUsers>>[0];
