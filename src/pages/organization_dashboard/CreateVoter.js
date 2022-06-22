import React from 'react'

import { connect } from 'react-redux'
import { RegisterVoterForm } from '../../sections/authentication/register';
import { styled } from '@mui/material/styles';

const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

const CreateVoter = () => {
  return (
    <ContentStyle>
       <RegisterVoterForm />
    </ContentStyle>
  )
}

export default connect(null,{})(CreateVoter)