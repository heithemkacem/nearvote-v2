import React from 'react'
import { useState,useEffect } from 'react'
import {  CardActionArea, CardActions,Card,Typography,CardContent,Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import FinalResult from '../organization_dashboard/FinalResult'
import { toast } from 'react-toastify';
import {getCurrentVoterEmail} from './../../_actions_/voter/actions/voterAction'
import Page from '../../components/Page';
const VoterVoteParty = () => {
  const IDS = window.location.pathname.replace("/voter-dashboard/vote-party/","")  
  const myArray = IDS.split("/")
  const [data,setData] = useState([])
  const [disableButton,setDisableButton] = useState(false)
  const [disableEmail,setDisableEmail] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const email=getCurrentVoterEmail()
  useEffect(async () => {
   
    await fetch(`http://localhost:5000/voteparty/voterparty/${myArray[0]}/${myArray[1]}/${myArray[2]}`).then(res=>{
    if(res.ok){
      return res.json()
    }
    }).then(jsonRes =>{ 
      setData(jsonRes)
    })
    const getInfo = async ()=>{

      let didVoterEmailVote = await window.contract.emailDidParticipate({
        prompt: data.mainQuestion,
        email: email
      })

      setDisableEmail(didVoterEmailVote)

      let didVoterVote = await window.contract.didParticipate({
        prompt: data.mainQuestion,
        user: window.accountId
      })

      setDisableButton(didVoterVote)
      
    }
    await getInfo()
    
  })
  var end = new Date(`${data.endDate}, 23:59:59`).getTime()      
  var start = new Date(`${data.startDate}, 00:00:00`).getTime() 
  var now = new Date().getTime() 
  var distance = end - now
  var distance2 = start - now
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  const result = days + "d " + hours + "h "+ minutes + "m " + seconds + "s"
  const result2 =result.toString()
  const result3 =result.toString()
  const handleClick =async (index)=>{
    setIsSubmitting(true)
    if(window.accountId.length ===0){
      toast.error("You need to connect your wallet to vote", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    setIsSubmitting(false)
    //!add jwt refresh token
    //!fetching the data as a real time database
    }else{
      if(disableEmail){
        toast.error("You have aleardy voted", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
      setIsSubmitting(false)
      }else{
        if(disableButton){
          toast.error("You have aleardy voted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        setIsSubmitting(false)
        }else{
          await window.contract.recordVoterEmail({prompt : data.mainQuestion , email : email})
          await window.contract.recordVoter({prompt : data.mainQuestion , user : window.accountId})
          await window.contract.addVote({prompt : data.mainQuestion , index : index})
          
          toast.success("You vote has been submited to the blockchain", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setIsSubmitting(false)
    }}}}
  return(
  <Page title="Vote Party | NEARVOTE">
    <div>
 {(distance2>0 && distance > 0) && (
      <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.mainQuestion}?
          </Typography>
          <Typography>
            <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>Start Date: <span style={{color : 'black',marginLeft : '4px'  }} > {data.startDate}</span></span>
          </Typography>
          <Typography>
            <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>End Date:<span style={{color : 'black',marginLeft : '4px' }} > {data.endDate}</span></span>
          </Typography>
          <Typography>
            <span style={{ fontWeight : 'bold', marginLeft : '6px'}}> {result2}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
  </Card>
  )}
  {(distance2 < 0 && distance > 0)&&(
      <div>
          <Card style={{padding : '20px'}} sx={{ maxWidth: '100%' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.mainQuestion}
                </Typography>
                <Typography>
                  <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>Start Date: <span style={{color : 'black',marginLeft : '4px'  }} > {data.startDate}</span></span>
                </Typography>
                <Typography>
                  <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>End Date:<span style={{color : 'black',marginLeft : '4px' }} > {data.endDate}</span></span>
                </Typography>
                <Typography >
                  <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>Ends In : <span style={{color : 'black',marginLeft : '4px' }}>{result3}</span></span>
                </Typography>
              </CardContent>
            </CardActionArea>
            </Card>
            <Grid style={{padding : '20px'}} container spacing={5}>
              <Grid  item xs={12} md={5} lg={6}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      {data.option1}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <LoadingButton loading={isSubmitting} disabled={disableEmail} variant='contained' onClick={()=>handleClick(0)}>Vote</LoadingButton>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid  item xs={12} md={5} lg={6}>
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      {data.option2}
                      </Typography>
                    </CardContent>
                    <CardActions>
                        <LoadingButton loading={isSubmitting} disabled={disableEmail} variant='contained' onClick={()=>handleClick(1)}>Vote</LoadingButton>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
      </div>
   )}
  {(distance < 0 && distance2 < 0 ) &&(
      <FinalResult />
  )}
    </div>
  </Page>   
  )
}
export default VoterVoteParty