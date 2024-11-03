'use client';
import { createUser } from '@/actions/user';
import UserForm from '@/components/UserForm';
import useToast from '@/hooks/useToast';
import { Alert, Box, Container, Snackbar } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

const initialValues = {
  name: '',
};

const CreateUser = () => {
  const { toast, showToast, closeToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onError() {
      showToast('Failed to create user', 'error');
    },
    onSuccess() {
      showToast('User created successfully!', 'success');
    },
  });

  return (
    <Container maxWidth='sm'>
      <Box mt={4}>
        <UserForm
          initialValues={initialValues}
          onSubmit={(values) => mutate(values)}
          buttonText='Create User'
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
  );
};

export default CreateUser;
