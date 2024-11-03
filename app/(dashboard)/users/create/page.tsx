'use client';
import { createUser } from '@/actions/user';
import useToast from '@/hooks/useToast';
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  // address: Yup.string().required('Address is required'),
  // email: Yup.string()
  //   .email('Invalid email address')
  //   .required('Email is required'),
  // phone: Yup.string().required('Phone number is required'),
  // gender: Yup.string().required('Gender is required'),
});

const CreateUser = () => {
  const { toast, showToast, closeToast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onError(error) {
      showToast('Failed to create user', 'error');
    },
    onSuccess() {
      showToast('User created successfully!', 'success');
    },
  });

  const initialValues = {
    name: '',
    // address: '',
    // email: '',
    // phone: '',
    // gender: '',
  };

  const handleSubmit = (values: typeof initialValues) => {
    mutate(values);
  };

  return (
    <Container maxWidth='sm'>
      <Box mt={4}>
        {/* <Typography variant='h4' gutterBottom>
          Create User
        </Typography> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  name='name'
                  label='Name'
                  variant='outlined'
                  value={values.name}
                  onChange={handleChange}
                  helperText={errors.name ? <ErrorMessage name='name' /> : null}
                  error={Boolean(errors.name)}
                />
              </Box>
              {/* <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  name='address'
                  label='Address'
                  variant='outlined'
                  value={values.address}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='address' />}
                  error={Boolean(<ErrorMessage name='address' />)}
                />
              </Box>
              <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  name='email'
                  label='Email'
                  variant='outlined'
                  value={values.email}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='email' />}
                  error={Boolean(<ErrorMessage name='email' />)}
                />
              </Box>
              <Box mb={3}>
                <Field
                  as={TextField}
                  fullWidth
                  name='phone'
                  label='Phone'
                  variant='outlined'
                  value={values.phone}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='phone' />}
                  error={Boolean(<ErrorMessage name='phone' />)}
                />
              </Box>
              <Box mb={3}>
                <Field
                  as={TextField}
                  select
                  fullWidth
                  name='gender'
                  label='Gender'
                  variant='outlined'
                  value={values.gender}
                  onChange={handleChange}
                  helperText={<ErrorMessage name='gender' />}
                  error={Boolean(<ErrorMessage name='gender' />)}
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Field>
              </Box> */}
              <Box mt={3}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  fullWidth
                  disabled={isPending}
                >
                  Create User
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
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
