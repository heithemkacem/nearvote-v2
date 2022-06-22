import React ,{useEffect,useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button,Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Iconify from '../../components/Iconify';
import authHeader from '../../_actions_/organization/auth/auth-header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../../components/animate';
import Page from '../../components/Page';
import { useLocation } from 'react-router-dom';
const Results = () => {
  const navigate = useNavigate()
  const [data,setData]=useState([{}])
  const location = useLocation()
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
      fetchData('http://localhost:5000/voteroom/voteroomslist')
  },[location.key])
  
  const handleEnter = (roomid)=>{
    navigate(`/dashboard/results/${roomid}`)
  }
  if(data === "no data"){
    return(
      <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                No data has been found !
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the data you’re looking for. Perhaps you haven't add a vote room?
              Be sure to add some.
            </Typography>
            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/No data-amico.png"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>
                  <Button
                    style={{marginRight : 20}}
                    variant='contained'
                    component={RouterLink}
                    to="/dashboard/create-vote-room"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Create Vote Room
                  </Button>
          </Box>
        </MotionContainer>
    )
  }else{
  return (
          <Page title="Results | NEARVOTE">
          {data.map((room)=>{
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
        })}
        </Page>
  )
}
}
export default Results