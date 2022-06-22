import React from 'react'
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField ,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {resendOTP} from '../../../_actions_/organization/actions/organizationAction'
import { connect } from 'react-redux';

const ResendOTPPage = ({resendOTP}) => {
  
  const navigate = useNavigate();
  const orgID = window.location.pathname.replace("/resendOTP/","")
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("must be a valid email").required('email is required')
  });

  const formik = useFormik({
    initialValues: {
      email:"",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values,{setSubmitting}) => {
      resendOTP(orgID,values,navigate,setSubmitting)
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
         
        <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email Address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Resend OTP
          </LoadingButton>
          
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default connect(null,{resendOTP})(ResendOTPPage)
 

