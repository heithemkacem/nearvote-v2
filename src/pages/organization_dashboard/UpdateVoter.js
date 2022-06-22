import React from 'react'

import { connect } from 'react-redux'
import { styled } from '@mui/material/styles';
import { UpdateVoterForm } from '../../sections/@dashboard/voter';

const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

const CreateVoter = () => {
  return (
    <ContentStyle>
       <UpdateVoterForm />
    </ContentStyle>
  )
}

export default connect(null,{})(CreateVoter) 