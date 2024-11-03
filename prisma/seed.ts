import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const makeData = (numberOfRows: number) =>
  [...Array(numberOfRows).fill(null)].map(() => ({
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    age: faker.number.float({ min: 0, max: 100 }),
    salary: faker.number.float({ min: 0, max: 1000000 }),
    isActive: faker.datatype.boolean() ? 'Active' : 'Inactive',
  }));

const seed = async () => {
  await prisma.user.deleteMany();

  for (const user of makeData(1000)) {
    await prisma.user.create({
      data: user,
    });
  }
};

seed();
