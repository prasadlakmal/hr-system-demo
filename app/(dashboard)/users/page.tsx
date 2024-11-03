'use client';
import { getUsers } from '@/actions/user';
import Table from '@/components/Table';
import { useQuery } from '@tanstack/react-query';

const columns = [
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'middleName', header: 'Middle Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'phoneNumber', header: 'Phone' },
  { accessorKey: 'address', header: 'Address' },
  { accessorKey: 'zipCode', header: 'Zip' },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'country', header: 'Country' },
  { accessorKey: 'isActive', header: 'Status' },
];

export default function UsersPage() {
  const { data, isFetching } = useQuery({
    queryKey: [`users`],
    queryFn: async () => {
      const data = await getUsers();
      return data;
    },
    initialData: [],
  });

  return <Table columns={columns} data={data} loading={isFetching} />;
}
