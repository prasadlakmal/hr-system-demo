// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($filter: UserFilter, $sort: UserSort) {
    users(filter: $filter, sort: $sort) {
      id
      name
      age
      gender
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($user: UserInput!) {
    addUser(user: $user) {
      id
      name
      age
      gender
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      id
      name
      age
      gender
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
