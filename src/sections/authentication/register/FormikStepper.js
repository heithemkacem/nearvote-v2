import React, { useState } from "react";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from "@mui/material";
import {  Form, Formik} from "formik";
import { connect } from "react-redux";
import { sendOTP } from "../../../_actions_/organization/actions/organizationAction";
const FormikStepper = ({
    children,
    sendOTP,
    ...props
  }) => {
    const childrenArray = React.Children.toArray(children)
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step] 
    const [completed, setCompleted] = useState(false);
    function isLastStep() {
      return step === childrenArray.length - 1;
    }
    return (
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
          } else {
            setStep(s => s + 1);
          }
          if(step===0){
              const phone = values.countryCode + values.phone
              sendOTP(phone)
          }
          if(step===1){
              
              
          }
        }}
      >
        {({  isSubmitting }) => (
          <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {currentChild}
            <Grid container spacing={2}>
              <Grid item>
                {step > 0 ? (
                  <Button
                    onClick={() => setStep(s => s - 1)}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                ) : null}
              </Grid>
              <Grid item>
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? "Submitting"
                    : isLastStep()
                    ? " Submit"
                    : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )
  }
  
  export default connect(null,{sendOTP}) (FormikStepper)