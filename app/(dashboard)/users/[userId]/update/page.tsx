'use client';
import { findUserById, updateUser } from '@/actions/user';
import UserForm from '@/components/UserForm';
import useToast from '@/hooks/useToast';
import { Alert, Box, Container, Skeleton, Snackbar } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PageContainer } from '@toolpad/core';

const initialData = {
  id: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  zipCode: '',
  city: '',
  state: '',
  country: '',
  age: 0,
  salary: 0,
  isActive: '',
};

type UpdateUserProps = {
  params: {
    userId: string;
  };
};

const UpdateUser = ({ params }: UpdateUserProps) => {
  const { toast, showToast, closeToast } = useToast();
  const { data, isFetching } = useQuery({
    queryKey: [`user`],
    queryFn: async () => {
      const data = await findUserById(params.userId);
      return data;
    },
    initialData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onError() {
      showToast('Failed to update user', 'error');
    },
    onSuccess() {
      showToast('User updated successfully!', 'success');
    },
  });

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <PageContainer
      title={`Update`}
      breadcrumbs={[
        { title: 'Dashboard', path: '/' },
        { title: 'View', path: '/users' },
        {
          title: `${data.firstName} ${data.lastName}`,
          path: '',
        },
      ]}
    >
      <Container maxWidth='sm'>
        <Box mt={4}>
          <UserForm
            initialValues={data ?? []}
            onSubmit={(values) => mutate(values)}
            isPending={isPending}
            buttonText='Update User'
          />
        </Box>
        <Snackbar
          open={Boolean(toast)}
          autoHideDuration={6000}
          onClose={closeToast}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={closeToast}
            severity={toast?.severity}
            sx={{ width: '100%' }}
          >
            {toast?.message}
          </Alert>
        </Snackbar>
      </Container>
    </PageContainer>
  );
};

export default UpdateUser;
