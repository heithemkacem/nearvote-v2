import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import {signupUser} from '../../../_actions_/organization/actions/organizationAction'
import React from 'react'
import { connect } from 'react-redux';

const RegisterForm = ({signupUser}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    orgName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('organization name required'),
    orgDescription: Yup.string().min(5, 'Too Short!').max(100, 'Too Long!').required('organization description required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      orgName:"",
      orgDescription:"",
      email:"",
      password:"",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values,{setSubmitting}) => {
      signupUser(values,navigate,setSubmitting)
      
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Organization Name"
              {...getFieldProps('orgName')}
              error={Boolean(touched.orgName && errors.orgName)}
              helperText={touched.orgName && errors.orgName}
            />

            <TextField
              fullWidth
              label="Oraganization Description"
              {...getFieldProps('orgDescription')}
              error={Boolean(touched.orgDescription && errors.orgDescription)}
              helperText={touched.orgDescription && errors.orgDescription}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email Address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default connect(null,{signupUser})(RegisterForm)
 

