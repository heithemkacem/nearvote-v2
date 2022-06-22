import React from 'react'

import { connect } from 'react-redux'
import { UpdateVoteRoomForm } from '../../sections/@dashboard/vote-room';

import { styled } from '@mui/material/styles';

const ContentStyle = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

const CreateVoter = () => {
  return (
    <ContentStyle>
       <UpdateVoteRoomForm />
    </ContentStyle>
  )
}

export default connect(null,{})(CreateVoter) 