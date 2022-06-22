import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import React from 'react'
// material
import {
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {forgetPassword} from '../../../_actions_/organization/actions/organizationAction'
import {connect} from 'react-redux'
const ForgetPassword = ({forgetPassword}) => {
                
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values,{setSubmitting}) => {
      forgetPassword(values, navigate,setSubmitting)
    }
  });
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
          style={{marginBottom:20}}
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

        </Stack>
         
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </Form>
    </FormikProvider>
  )
}

export default connect(null,{forgetPassword}) (ForgetPassword)

