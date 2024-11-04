# HR System (Demo)

This project was created for demonstration purpose.

## Setup

- `yarn install` to copy project dependencies
- `yarn dev` to run the project in watch mode.
- `yarn build` to create a production build.
- `yarn start` to run the production build.

## To seed database

- Create a `dev.db` file inside `prisma` directory
  - `cd prisma`
  - `touch dev.db`
- Run `yarn prisma-seed` to fill the sqlite database with 1000 mock data.

## Features

- Add a new user
- View/Upate user data
- Delete user
- Search, sorting and filters (client side only)
- Pagination (server integrated)
- Dashboard (incomplete, showing hardcoded charts at the moment)

## Tools and Technologies

- Next.JS
- Material UI
- Toolpad Core
- Tanstack Query
- Prisma ORM
- SQLite
- Formik

## Explainations

### Why Next.JS ?

- [React official docs](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework) no longer recommends creating plain React applications for new projects.

### Why Redux was not used ?

- Getting Redux to work with React Server Component (RSC) is not an easy path. It’s very prone to issues as the state missmatches can happen between server state and client state (despite the steps provided by official docs)
- And also, did not come accross a situation where it’s necessory.

## TODO

- The dashboard page with charts is incomplete, it needs to be integrated with back-end data.
- Sorting and filtering at the moment works only with client side data, integrate it with backend APIs to enable backend sorting and filtering.
- Add integration tests and E2E tests.
- Give a warning on delete action.
- Improving UX
