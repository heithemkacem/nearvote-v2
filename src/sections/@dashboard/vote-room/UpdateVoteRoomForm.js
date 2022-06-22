import React, { useState } from "react";
import * as Yup from 'yup'
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { Field, Form, Formik} from "formik";
import {  TextField } from "formik-material-ui";
import Voter from './../../../pages/organization_dashboard/RoomVoters'
import { updateVoteRoom } from "../../../_actions_/voter/actions/voterAction";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
let initialValues = {
  roomName: "",
  roomDescription: "",
  voters: [],
};
export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}) {
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
  );
}

const CreateVoteRoom = ({updateVoteRoom}) => {
 
  const voteroomid = window.location.pathname.replace("/dashboard/update-vote-room/","")
  const navigate = useNavigate()
  const [voters, setVoters] = useState([])
  const sendVoters = (index) => {
    setVoters(index)
  }

  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={initialValues}
          onSubmit={async (values , {setSubmitting}) => {
            values.voters = voters 
            updateVoteRoom(values,setSubmitting,voteroomid,navigate)
           
          }}
        >
          <FormikStep label="Room Data" validationSchema={
            Yup.object({
            roomName: Yup.string().min(4, "organizationName is too short").max(1024,"organizationName is too long").required("Required"),
            roomDescription: Yup.string().min(4, "organizationName is too short").max(1024,"organizationName is too long").required("Required"),
            })}>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="roomName"
                component={TextField}
                label="Room Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="roomDescription"
                component={TextField}
                label="Room Description"
              />
            </Box>
          </FormikStep>
          <FormikStep
            label="Choose Voters"
            validationSchema={            
              Yup.object({
                voters: Yup.array().required("Required"),
              })}
          >
          <br/>
          <br/>
          <br/>
          <Voter sendVoters={sendVoters}/>
          </FormikStep>
          
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export default connect(null,{updateVoteRoom}) (CreateVoteRoom)