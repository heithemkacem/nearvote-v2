import React from "react";
import * as Yup from 'yup'
import {
  Stack,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { Field} from "formik";
import {  TextField } from "formik-material-ui";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import FormikStepper from "./FormikStepper"
export function FormikStep({ children }) {
  return <>{children}</>;
}

const Register2FactorAuth = () => {
  let initialValues = {
    orgName: "",
    orgDescription: "",
    email: "",
    phone: "",
    password: "",
    otpPhone:"",
    otpEmail:"",
  };
  const navigate = useNavigate()
  return (
    <Card >
      <CardContent>
        <FormikStepper
          initialValues={initialValues}
          onSubmit={async (values , {setSubmitting}) => {
          }}
        >
          <FormikStep   label="Organization Data" validationSchema={
            Yup.object({
            orgName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('organization name required'),
            orgDescription: Yup.string().min(5, 'Too Short!').max(100, 'Too Long!').required('organization description required'),
            email: Yup.string().email('Email must be a valid email address').required('Email is required'),
            phone: Yup.string().required(' required'),
            countryCode: Yup.string().required(' required'),
            email: Yup.string().email('Email must be a valid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            confirmPassword:Yup.string().required().oneOf([Yup.ref("password")],"Password must match")
            })}
         
            >
            <Box paddingBottom={2} paddingTop={2}>
              <Field
                fullWidth
                name="orgName"
                component={TextField}
                label="Organization Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="orgDescription"
                component={TextField}
                label="Organization Description"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="Email"
              />
            </Box>
            <Box paddingBottom={2} >
            <Stack direction="row" alignItems="center" justifyContent="space-between" >
            <Field
                name="countryCode"
                component={TextField}
                label=" (+999)"
              />
            <Field
                fullWidth
                name="phone"
                component={TextField}
                label="Phone"
              />
            </Stack>
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="password"
                type="password"
                component={TextField}
                label="Password "
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="confirmPassword"
                type="password"
                component={TextField}
                label="Confirm Password "
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Phone Validation"
            validationSchema={            
              Yup.object({
                otpPhone: Yup.string().required("Required"),
              })}
          >
          <Box paddingBottom={2}  paddingTop={2}>
              <Field
                fullWidth
                name="otpPhone"
                component={TextField}
                label="OTP Phone Number"
              />
            </Box>
          </FormikStep>

          <FormikStep
            label="Email Validation"
            validationSchema={            
              Yup.object({
                otpEmail: Yup.string().required("Required"),
              })}
          >
          <Box paddingBottom={2} paddingTop={2} >
              <Field
                fullWidth
                name="otpEmail"
                component={TextField}
                label="OTP Email"
              />
            </Box>
          </FormikStep>
          
          
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export default connect(null) (Register2FactorAuth)



