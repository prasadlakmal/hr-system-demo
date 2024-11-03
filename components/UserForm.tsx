'use client';
import { Box, Button, TextField } from '@mui/material';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
});

interface UserFormProps<T> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>;
  isPending?: boolean;
  buttonText: string;
}

function UserForm<T extends FormikValues>({
  initialValues,
  onSubmit,
  isPending,
  buttonText,
}: UserFormProps<T>) {
  return (
    <Formik<T>
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
              name='name'
              label='Name'
              variant='outlined'
              value={values.name}
              onChange={handleChange}
              helperText={errors.name ? <ErrorMessage name='name' /> : null}
              error={Boolean(errors.name)}
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
