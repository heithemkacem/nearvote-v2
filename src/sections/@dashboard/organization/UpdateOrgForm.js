import * as Yup from 'yup';
import React from 'react'
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { updateOrg } from '../../../_actions_/organization/actions/organizationAction';
import { connect } from 'react-redux';
import { getCurrentOrganizationId } from '../../../_actions_/organization/actions/organizationAction';
const UpdateOrgForm = ({updateOrg}) => {
    const orgid = getCurrentOrganizationId()
    const navigate = useNavigate();
    const RegisterSchema = Yup.object().shape({
      orgName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('User name required'),
      orgDescription: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name required'),
      phone:Yup.string().required("phone is required")
    });
  
    const formik = useFormik({
      initialValues: {
          orgName: '',
          orgDescription: '',
          phone: '',
      },
      validationSchema: RegisterSchema,
      onSubmit: (values,{setSubmitting}) => {
        updateOrg(values,orgid,setSubmitting)
        navigate('/dashboard/app', { replace: true });
      }
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  
    return (
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Org Name"
                  {...getFieldProps('orgName')}
                  error={Boolean(touched.orgName && errors.orgName)}
                  helperText={touched.orgName && errors.orgName}
                />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                  fullWidth
                  label="Org Description"
                  {...getFieldProps('orgDescription')}
                  error={Boolean(touched.orgDescription && errors.orgDescription)}
                  helperText={touched.orgDescription && errors.orgDescription}
                  />
                  
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                  fullWidth
                  label="Phone Number"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  />
                  
              </Stack>
              <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
              >
                  Update
              </LoadingButton>
              </Stack>
        </Form>
      </FormikProvider>
    )
}

export default connect(null,{updateOrg})(UpdateOrgForm)
