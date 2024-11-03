'use client';
import { User } from '@/actions/user';
import { Button, Grid2 as Grid, MenuItem, TextField } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  zipCode: Yup.string().required('Zip code is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
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

const gridSize = { xs: 12, sm: 6, md: 6 };

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
      {({ values, handleChange, errors, touched, dirty }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='firstName'
                label='First Name'
                variant='outlined'
                error={Boolean(errors.firstName && touched.firstName)}
                helperText={
                  errors.firstName && touched.firstName ? errors.firstName : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='middleName'
                label='Middle Name'
                variant='outlined'
                error={Boolean(errors.middleName && touched.middleName)}
                helperText={
                  errors.middleName && touched.middleName
                    ? errors.middleName
                    : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='lastName'
                label='Last Name'
                variant='outlined'
                error={Boolean(errors.lastName && touched.lastName)}
                helperText={
                  errors.lastName && touched.lastName ? errors.lastName : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='email'
                label='Email'
                variant='outlined'
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email ? errors.email : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='phoneNumber'
                label='Phone Number'
                variant='outlined'
                error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                helperText={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='address'
                label='Address'
                variant='outlined'
                error={Boolean(errors.address && touched.address)}
                helperText={
                  errors.address && touched.address ? errors.address : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='zipCode'
                label='Zip Code'
                variant='outlined'
                error={Boolean(errors.zipCode && touched.zipCode)}
                helperText={
                  errors.zipCode && touched.zipCode ? errors.zipCode : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='city'
                label='City'
                variant='outlined'
                error={Boolean(errors.city && touched.city)}
                helperText={errors.city && touched.city ? errors.city : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='state'
                label='State'
                variant='outlined'
                error={Boolean(errors.state && touched.state)}
                helperText={errors.state && touched.state ? errors.state : ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                fullWidth
                name='country'
                label='Country'
                variant='outlined'
                error={Boolean(errors.country && touched.country)}
                helperText={
                  errors.country && touched.country ? errors.country : ''
                }
                onChange={handleChange}
              />
            </Grid>
            <Grid size={gridSize}>
              <Field
                as={TextField}
                select
                fullWidth
                name='isActive'
                label='Status'
                variant='outlined'
                error={Boolean(errors.isActive && touched.isActive)}
                helperText={
                  errors.isActive && touched.isActive ? errors.isActive : ''
                }
                onChange={handleChange}
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </Field>
            </Grid>
            <Grid size={gridSize}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
                disabled={!dirty || isPending}
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
