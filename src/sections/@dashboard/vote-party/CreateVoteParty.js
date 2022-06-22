import React from 'react'
import { connect } from 'react-redux'
import { styled } from '@mui/material/styles';
import { useFormik,FormikProvider, Form} from "formik"
import {  Stack ,TextField} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';
import {AddVoteParty} from './../../../_actions_/voter/actions/voterAction'
import * as Yup from 'yup'

const StyledLabel = styled('label')(() => ({
    color:"red" , fontWeight : "bold"}));
const CreateVoteParty = ({VoteRoomId,AddVoteParty}) => {
    const today = new Date()
    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1 // Months start at 0!
    let dd = today.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    const todaya = mm + '/' + dd + '/' + yyyy
    const VoteRoomSchema = Yup.object().shape({
        mainQuestion: Yup.string().required("required"),
        option1: Yup.string().required("required"),
        option2: Yup.string().required("required"),
        startDate: Yup.date().min(todaya).required("required"),
        endDate: Yup.date().min(
            Yup.ref('startDate'),
            "end date can't be before start date"
          ).required("Required")
      })
     

    const formik = useFormik({
        initialValues:{
            mainQuestion:"",
            startDate:"",
            endDate:"",
            VoteRoomId:VoteRoomId,
            option1 : "",
            option2 : ""
        },
        validationSchema : VoteRoomSchema,
        onSubmit: (values)=>{
            AddVoteParty(values)
        }   
      });
    const { errors, touched, isSubmitting,handleSubmit, getFieldProps } = formik;
  
    return (
        <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} style={{width:"400px"}}>
                    <StyledLabel>Main Question  </StyledLabel>
                    <TextField
                    type="text"
                    label="Main Question"
                    icon={<Iconify icon="eva:question-mark-outline" />}
                    disabled={isSubmitting}
                    {...getFieldProps('mainQuestion')}
                    error={Boolean(touched.mainQuestion && errors.mainQuestion)}
                    helperText={touched.mainQuestion && errors.mainQuestion}     
                    />
                    
                    <Stack direction={{ xs: 'column', sm: 'column' }} justifyContent="space-between" spacing={2}>
                        <Stack direction={{ xs: 'column', sm: 'column' }} justifyContent="space-between" spacing={1}>
                            <StyledLabel>Start Date</StyledLabel>
                            <TextField
                            type="date"
                            disabled={isSubmitting}
                            {...getFieldProps('startDate')}
                            error={Boolean(touched.startDate && errors.startDate)}
                            helperText={touched.startDate && errors.startDate}
                            />
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'column' }} justifyContent="space-between" spacing={1}>
                            <StyledLabel>End Date</StyledLabel>
                            <TextField
                            type="date"
                            disabled={isSubmitting}
                            {...getFieldProps('endDate')}
                            error={Boolean(touched.endDate && errors.endDate)}
                            helperText={touched.endDate && errors.endDate}
                            />
                        </Stack>
                    </Stack>
            </Stack>
            <Stack >
                        <Stack direction={{ xs: 'column', sm: 'column' }} justifyContent="space-between" spacing={2}>
                        <StyledLabel style={{marginTop : "15px"}}>Option 1</StyledLabel>
                        <TextField
                            required
                            style={{width:'400px'}}
                            {...getFieldProps('option1')}
                            type="text"
                            disabled={isSubmitting}
                            label= "Option 1"
                            error={Boolean(touched.option1 && errors.option1)}
                    helperText={touched.option1 && errors.option1}     
                        />
                         </Stack>
                         <Stack direction={{ xs: 'column', sm: 'column' }} justifyContent="space-between" spacing={2}>
                        <StyledLabel style={{marginTop : "15px"}}>Option 2</StyledLabel>
                        <TextField
                            required
                            style={{width:'400px'}}
                            {...getFieldProps('option2')}
                            type="text"
                            disabled={isSubmitting}
                            label= "Option 2"
                            error={Boolean(touched.option2 && errors.option2)}
                    helperText={touched.option2 && errors.option2}     
                        />
                         </Stack>
                        
        </Stack>   
        <LoadingButton
        style={{marginTop : "20px",width:'400px'}}
        disabled={isSubmitting}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        >
          Create Vote Party
        </LoadingButton>
        </Form>
        </FormikProvider>

    )
}

export default connect(null,{AddVoteParty}) (CreateVoteParty)