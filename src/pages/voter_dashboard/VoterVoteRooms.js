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
const VoterVoteRooms = () => {
  const navigate = useNavigate()
  const [data,setData]=useState([])
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
      fetchData(`http://localhost:5000/voteroom/voteroomslist/${getCurrentVoter()}`)
  },[])
  const handleEnter = (roomid)=>{
    navigate(`/voter-dashboard/vote-partys/${getCurrentVoter()}/${roomid}`)
  }
    return(
      <Page title="Vote Rooms | NEARVOTE">
      <div>
        {
          data.map((room)=>{
          return(
            <Accordion key={room._id} style={{backgroundColor : '#FFFAFA'}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{room.roomName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {room.roomDescription}
                </Typography>
                <Button style={{marginTop:'25px'}} variant='contained' onClick={()=> handleEnter(room._id)} >Enter</Button>
              </AccordionDetails>
            </Accordion>
          )
        })
        }
      </div>
      </Page>
    )}

export default VoterVoteRooms

