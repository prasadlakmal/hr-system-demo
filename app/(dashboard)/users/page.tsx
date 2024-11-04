'use client';
import { deleteUser, getUsers } from '@/actions/user';
import Table from '@/components/Table';
import useToast from '@/hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const { showToast } = useToast();
  const { data, isFetching, refetch } = useQuery({
    queryKey: [`users`],
    queryFn: async () => {
      const data = await getUsers(
        pagination.pageIndex + 1,
        pagination.pageSize
      );
      return data;
    },
    initialData: { data: [], count: 0 },
  });

  useEffect(() => {
    refetch();
  }, [pagination.pageIndex, pagination.pageSize]);

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
      data={data.data}
      loading={isFetching || isPending}
      onDeleteClick={(id) => {
        mutate(id);
      }}
      rowCount={data.count}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
