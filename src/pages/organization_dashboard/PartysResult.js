import React ,{useEffect,useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import authHeader from '../../_actions_/organization/auth/auth-header';
import { useLocation } from 'react-router-dom';
const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const roomid = window.location.pathname.replace("/dashboard/results/","")  
  const [data,setData]=useState([{}])
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
      fetchData(`http://localhost:5000/voteparty/roompartys/${roomid}`)},[location.key])
  const handleEnter = (partyid)=>{
    navigate(`/dashboard/results/${roomid}/${partyid}`)
  }
  return (
    <div>
        {
          data.map((party)=>{
          return(
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
        })
        }
    </div>
  )
}

export default Results