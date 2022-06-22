import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import {verifyOrg} from '../../../_actions_/organization/actions/organizationAction'
import React from 'react'
import { connect } from 'react-redux';

const OtpVerification = ({verifyOrg}) => {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const orgID = window.location.pathname.replace("/verify","")
  const RegisterSchema = Yup.object().shape({
    otp: Yup.string().min(6).max(6).required('otp is required')
  });

  const formik = useFormik({
    initialValues: {
      otp:"",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values,{setSubmitting}) => {
      verifyOrg(values,navigate,setSubmitting,orgID)
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
         
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="OTP"
            {...getFieldProps('otp')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.otp && errors.otp)}
            helperText={touched.otp && errors.otp}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Verify
          </LoadingButton>
          <Button  onClick={()=>{navigate(`/resendOTP${orgID}`, { replace: true })}}>
              Resend verification otp code
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default connect(null,{verifyOrg})(OtpVerification)
 

