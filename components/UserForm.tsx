'use client';
import { User } from '@/actions/user';
import { Box, Button, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().required('Middle name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  zipCode: Yup.string().required('Zip code is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  petName: Yup.string().required('Pet name is required'),
  age: Yup.number().min(0).max(100).required('Age is required'),
  salary: Yup.string().required('Salary is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  dateOfJoining: Yup.date().required('Date of joining is required'),
  isActive: Yup.string()
    .oneOf(['Active', 'Inactive'])
    .required('Status is required'),
});

interface UserFormProps {
  initialValues: User;
  onSubmit: (
    values: User,
    formikHelpers: FormikHelpers<User>
  ) => void | Promise<any>;
  isPending?: boolean;
  buttonText: string;
}

function UserForm({
  initialValues,
  onSubmit,
  isPending,
  buttonText,
}: UserFormProps) {
  return (
    <Formik<User>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, errors }) => (
        <Form>
          <Box mb={3}>
            <Field
              as={TextField}
              fullWidth
              name='firstName'
              label='First Name'
              variant='outlined'
              value={values.firstName}
              onChange={handleChange}
              helperText={
                errors.firstName ? <ErrorMessage name='firstName' /> : null
              }
              error={Boolean(errors.firstName)}
            />
          </Box>
          <Box mt={3}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              disabled={isPending}
            >
              {buttonText}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
