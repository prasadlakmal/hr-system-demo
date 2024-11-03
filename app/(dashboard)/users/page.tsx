import UserList from '@/components/UserList';
import { VirtualizedTable } from '@/components/VirtualizedTable';
import { getUsers } from '@/data/user';
import Typography from '@mui/material/Typography';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <Typography>Welcome to users</Typography>
      <UserList>
        <VirtualizedTable data={users} />
      </UserList>
    </>
  );
}
