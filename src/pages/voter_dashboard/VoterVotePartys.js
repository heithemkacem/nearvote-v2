import React,{useState,useEffect} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import authHeader from '../../_actions_/organization/auth/auth-header';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentVoter } from '../../_actions_/voter/actions/voterAction';
import Page from '../../components/Page';
const VoterVotePartys = () => {
  const navigate = useNavigate()
  const [data,setData]=useState([])
  const IDS = window.location.pathname.replace("/voter-dashboard/vote-partys/","")  
  const myArray = IDS.split("/")
  const fetchData = (url)=>{
    fetch(url,{
          headers: authHeader()
    }).then(res=>{
          if(res.ok){
            return res.json()
          }
    }).then(jsonRes => setData(jsonRes.data))
  }
  useEffect(()=>{
      fetchData(`http://localhost:5000/voteparty/roompartys/${myArray[0]}/${myArray[1]}`)
  },[])
  const handleEnter = (partyid)=>{
    navigate(`/voter-dashboard/vote-party/${getCurrentVoter()}/${myArray[1]}/${partyid}`)
  }
  return (
    <Page title="Vote Partys | NEARVOTE">
    <div>
      {data.map((party)=>{
        return (
          <Accordion key={party._id} style={{backgroundColor : '#FFFAFA'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{party.mainQuestion} ?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>Start Date: <span style={{color : 'black',marginLeft : '4px'  }} > {party.startDate}</span></span>
              </Typography>
              <Typography>
               <span style={{color : 'red' , fontWeight : 'bold', marginLeft : '6px'}}>End Date:<span style={{color : 'black',marginLeft : '4px' }} > {party.endDate}</span></span>
              </Typography>
              <Button variant='contained' onClick={()=> handleEnter(party._id)} >Enter</Button>
            </AccordionDetails>
          </Accordion>
    
        )
      })}
    </div>
    </Page>
  )
}

export default VoterVotePartys

