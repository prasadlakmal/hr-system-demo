import { graphql, HttpResponse } from 'msw';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  state: string;
}

let users: User[] = Array.from({ length: 1000 }, (_, id) => ({
  id: id + 1,
  firstName: `First${id + 1}`,
  lastName: `Last${id + 1}`,
  age: Math.floor(Math.random() * 60) + 18,
  gender: id % 2 === 0 ? 'male' : 'female',
  email: `user${id + 1}@example.com`,
  phone: `+${Math.floor(Math.random() * 9999999) + 1000}`,
  state: `State ${id}`,
}));

export const handlers = [
  graphql.query('GetUsers', ({ query, variables }) => {
    console.log('@@@@: query: ', query);
    console.log('@@@@: variables: ', variables);
    const { filter, sort } = variables;

    console.log('@@@@ userssss: ', users);

    let filteredUsers = users;

    if (filter) {
      filteredUsers = filteredUsers.filter((user) =>
        Object.keys(filter).every(
          (key) => user[key as keyof User] === filter[key]
        )
      );
    }

    if (sort) {
      filteredUsers = filteredUsers.sort((a, b) => {
        if (a[sort.field as keyof User] < b[sort.field as keyof User])
          return sort.order === 'asc' ? -1 : 1;
        if (a[sort.field as keyof User] > b[sort.field as keyof User])
          return sort.order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return HttpResponse.json({ data: filteredUsers });
  }),

  //   graphql.mutation('AddUser', (req, res, ctx) => {
  //     const { user } = req.variables;
  //     const newUser: User = { ...user, id: users.length + 1 };
  //     users.push(newUser);
  //     return res(ctx.data({ addUser: newUser }));
  //   }),

  //   graphql.mutation('UpdateUser', (req, res, ctx) => {
  //     const { id, user } = req.variables;
  //     users = users.map((u) => (u.id === id ? { ...u, ...user } : u));
  //     return res(ctx.data({ updateUser: users.find((u) => u.id === id) }));
  //   }),

  //   graphql.mutation('DeleteUser', (req, res, ctx) => {
  //     const { id } = req.variables;
  //     users = users.filter((u) => u.id !== id);
  //     return res(ctx.data({ deleteUser: id }));
  //   }),
];
