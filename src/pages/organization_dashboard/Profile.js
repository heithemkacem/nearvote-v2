import React from 'react'

import { connect } from 'react-redux'
import { styled } from '@mui/material/styles';
import { UpdateOrgForm } from '../../sections/@dashboard/organization';
import Page from '../../components/Page';
const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
}));

const CreateVoter = () => {
  return (
    <ContentStyle>
        <Page title="Profile | NEARVOTE">
          <UpdateOrgForm />
        </Page>
    </ContentStyle>
  )
}

export default connect(null,{})(CreateVoter) 