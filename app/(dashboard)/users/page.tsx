import { getUsers } from '@/actions/user';
import Table from '@/components/Table';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <Table columns={[{ accessorKey: 'name', header: 'Name' }]} data={users} />
  );
}
