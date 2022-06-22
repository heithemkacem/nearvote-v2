import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { signupVoter } from '../../../_actions_/voter/actions/voterAction';
import { connect } from 'react-redux';
import React from 'react'
const RegisterVoterForm = ({signupVoter}) => {
    const navigate = useNavigate();
    const RegisterSchema = Yup.object().shape({
      username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('User name required'),
      firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name required'),
      lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
      phone: Yup.number().required('Phone is required')
    });
  
    const formik = useFormik({
      initialValues: {
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
      },
      validationSchema: RegisterSchema,
      onSubmit: (values,{setSubmitting}) => {
        signupVoter(values,setSubmitting,navigate)
       
      }
    });
  
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
    return (
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
              <TextField
                fullWidth
                label="Username"
                {...getFieldProps('username')}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />
  
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                  fullWidth
                  label="First name"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  />
  
                  <TextField
                  fullWidth
                  label="Last name"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  />
              </Stack>
  
              <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
              />
  
              <TextField
                  fullWidth
                  label="Phone Number"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
              />
              <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
              >
                  Add Voter
              </LoadingButton>
              </Stack>
        </Form>
      </FormikProvider>
    )
}

export default connect(null,{signupVoter})(RegisterVoterForm)
