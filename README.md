# HR System (Demo)

This project was created for demonstration purpose.

## Setup

To run in dev mode

- `yarn install`
- `yarn dev`

Or if you want to run a production build

- `yarn build` to create a production build.
- `yarn start` to run the production build.

## Setup local sqlite database and Prisma ORM

- Create `dev.db` file inside `prisma` directory (Skip this step if it's already there)
  - `touch prisma/dev.db`
- Make sure `.env` is there in the root level and it has following property.
  - `DATABASE_URL="file:./dev.db"`
- To migrate the schema to your local database, run the below command
  - `npx prisma db push`

## Seed database

Use the following script to pre-populate the database with 1000 of records.

- `yarn prisma-seed`

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

### Why a mock server was not used ?

- Most of the mock server libraries available, stubs only the browser `fetch` API. Such a setup doesn't work for server side data fetching. An attempt was made to setup msw, in both server end and client end, but it gave inconsistent behaviours because starting the msw server before the sever components trigger, consistently in every run, was not straightfarward. Therefore, decided to make a simple backend API using available features with Next.js because setting them up was far easier.

## TODO

- The dashboard page with charts is incomplete, it needs to be integrated with back-end data.
- Sorting and filtering at the moment works only with client side data, should integrate it with backend APIs to enable backend sorting and filtering.
- Add integration tests and E2E tests.
- UX improvements i.e: Giving a warning before delete action.
