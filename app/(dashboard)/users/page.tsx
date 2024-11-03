'use client';
import { deleteUser, getUsers } from '@/actions/user';
import Table from '@/components/Table';
import useToast from '@/hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';

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
  const { showToast } = useToast();
  const { data, isFetching, refetch } = useQuery({
    queryKey: [`users`],
    queryFn: async () => {
      const data = await getUsers();
      return data;
    },
    initialData: [],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onError() {
      showToast('Failed to delete user', 'error');
    },
    onSuccess() {
      showToast('User deleted successfully!', 'success');
      refetch();
    },
  });

  return (
    <Table
      columns={columns}
      data={data}
      loading={isFetching || isPending}
      onDeleteClick={(id) => {
        mutate(id);
      }}
    />
  );
}
