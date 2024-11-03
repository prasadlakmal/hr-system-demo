'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

export const getUsers = async (page = 1, limit = 20) => {
  const data = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
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
    await prisma.user.create({
      data,
    });
  } catch (error) {
    console.log('Failed saving user: ', error);
  }
  revalidatePath('/users');
};

export const updateUser = async (data: User) => {
  try {
    await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    });
  } catch (error) {
    console.log('Failed updating user: ', error);
  }
  revalidatePath('/users');
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log('Failed updating user: ', error);
  }
  revalidatePath('/users');
};

export type User = Awaited<ReturnType<typeof getUsers>>[0];
