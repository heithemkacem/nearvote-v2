import React from 'react'

import { connect } from 'react-redux'
import { styled } from '@mui/material/styles';
import { UpdateVoter} from '../../sections/@dashboard/voter';
import Page from '../../components/Page';
const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

const UpdateVoterInDashboard = () => {
  return (
    <Page title="Update Voter | NEARVOTE">
    <ContentStyle>
       <UpdateVoter />
    </ContentStyle>
    </Page>
  )
}

export default connect(null,{})(UpdateVoterInDashboard) 