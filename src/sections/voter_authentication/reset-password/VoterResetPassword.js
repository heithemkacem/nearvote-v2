import * as Yup from 'yup';
import React from 'react';

import { useState } from 'react';
import {useNavigate,useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import {voterResetPassword} from '../../../_actions_/voter/actions/voterAction'
import {connect} from 'react-redux'
const ResetPassword = ({voterResetPassword}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const ResetSchema = Yup.object().shape({
      newPassword: Yup.string().min(8, "Password is too short").max(26,"Password is too long").required("Required"),
      confirmNewPassword:Yup.string().required().oneOf([Yup.ref("newPassword")],"Password must match")
  });
  const {uniqueId,resetString} = useParams()

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
      uniqueId,
      resetString
    },
    validationSchema: ResetSchema,
    onSubmit: (values,{setSubmitting}) => {
      voterResetPassword(values, navigate,setSubmitting)
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
            <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                {...getFieldProps('newPassword')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                error={Boolean(touched.newPassword && errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
              />
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmNewPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          />
        </Stack>
         
        <LoadingButton
          style={{marginTop:20}}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Reset password
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

export default connect(null,{voterResetPassword}) (ResetPassword)

