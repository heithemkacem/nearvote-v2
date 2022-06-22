import React from 'react'
import { Box, Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import {
  AppVoters,
  AppVoteRooms,
  AppCurrentVisits,
} from '../../sections/@dashboard/app';
import authHeader from './../../_actions_/organization/auth/auth-header'
import { useLocation } from 'react-router-dom';
export default function DashboardApp() {
  const location = useLocation()
  let [data,setData]=useState([{}])
  let [VoterData,setVoterData]=useState([{}])
  const fetchData = (url)=>{
    fetch(url,{
          headers: authHeader()
          }).then(res=>{
          if(res.ok){
            return res.json()
          }
          }).then(jsonRes => setData(jsonRes.data))
  }
  const fetchVoterData = (url)=>{
    fetch(url,{
          headers: authHeader()
          }).then(res=>{
          if(res.ok){
            return res.json()
          }
          }).then(jsonRes => setVoterData(jsonRes.data))
  }
 
  useEffect(()=>{
      fetchVoterData('http://localhost:5000/voter/voterlist'),
      fetchData('http://localhost:5000/voteroom/voteroomslist')
  },[location.key])
  let VerifiedVoters =0
  
  
  if (data === "no data"){
    data = 0
  }
  if (VoterData === "no data"){
    VoterData = 0
  }else{
    VoterData.map(voter =>{
      if(voter.verified === true){
        VerifiedVoters +=1
      }
    })
  }

  return (
    <Page title="Dashboard | NEARVOTE">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Grid container spacing={3}>
          
          <Grid item xs={12} md={12} lg={6}>
            <AppVoteRooms data={data.length}/>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <AppVoters data={VoterData.length}/>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <AppCurrentVisits data={VerifiedVoters} numberOfVoters={VoterData.length}/>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
