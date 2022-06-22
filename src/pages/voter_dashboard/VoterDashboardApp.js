import React from 'react'
import { Box, Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import {
  AppVoterData,
  AppVoterVoteRooms
} from '../../sections/@dashboard/app';
import { getCurrentVoter } from '../../_actions_/voter/actions/voterAction';
import { useLocation } from 'react-router-dom';
export default function DashboardApp() {
  let [VoterData,setVoterData]=useState([{}])
  let [data,setData]=useState([])
  const location = useLocation()
  const fetchVoterData = (url)=>{
    fetch(url).then(res=>{
          if(res.ok){
            return res.json()
          }
          }).then(jsonRes => setVoterData(jsonRes.data))
  }
  const fetchData = (url)=>{
    fetch(url).then(res=>{
          if(res.ok){
            return res.json()
          }
          }).then(jsonRes => setData(jsonRes.data))
  }
  useEffect(()=>{
      fetchVoterData(`http://localhost:5000/voter/voter/${getCurrentVoter()}`)
      fetchData(`http://localhost:5000/voteroom/voterooms/${getCurrentVoter()}`)
  },[location.key])

  return (
    <Page title="Voter Dashboard | NEARVOTE">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Voter Dashboard</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <AppVoterData data={VoterData}/>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppVoterVoteRooms data={data.length}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
