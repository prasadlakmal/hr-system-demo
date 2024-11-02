import UserList from '@/components/UserList';
import { VirtualizedTable } from '@/components/VirtualizedTable';
import { GET_USERS } from '@/graphql/queries';
import Typography from '@mui/material/Typography';
import { print } from 'graphql';

export default async function UsersPage() {
  const { data } = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: print(GET_USERS),
    }),
    next: { revalidate: 10 },
  }).then((res) => res.json());

  console.log('@@@@: data: ', data);
  return (
    <>
      <Typography>Welcome to users</Typography>
      <UserList>
        <VirtualizedTable data={data} />
      </UserList>
    </>
  );
}
