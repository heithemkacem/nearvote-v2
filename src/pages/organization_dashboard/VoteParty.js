import React ,{useState,useEffect} from 'react'
import { CreateVoteParty } from '../../sections/@dashboard/vote-party'
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import Iconify from './../../components/Iconify';
import { Stack,Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import authHeader from '../../_actions_/organization/auth/auth-header';
import { useLocation } from 'react-router-dom';
const ContentStyle = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  margin:'30px'
  
}));
const VotePartyStyle = styled('div')(() => ({
  marginBottom:'50px',
  
}));
const VoteParty = () => {
  const roomid = window.location.pathname.replace("/dashboard/vote-party/","")  
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
    fetchData(`http://localhost:5000/voteparty/roompartys/${roomid}`)},[location.key])
  const [voteParty, setVoteParty] = useState([{ voteparty: "" }]);
    const handleServiceChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...voteParty];
      list[index][name] = value;
      setVoteParty(list);
    };
  
    const handleServiceRemove = (index) => {
      const list = [...voteParty];
      list.splice(index, 1);
      setVoteParty(list);
    };
  
    const handleServiceAdd = () => {
      setVoteParty([...voteParty, { voteparty: "" }]);
    };
    const VoteRoomId = window.location.pathname.replace("/dashboard/vote-party/","")
  return (
    <ContentStyle>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Vote Partys
              </Typography>
      </Stack>
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
   
            </AccordionDetails>
          </Accordion>
          )
        })
        }
    </div>
      {voteParty.map((singleoption, index) => (
    <div key={index} >
        <div style={{display : "flex"}} >
        <div style={{marginTop : "15px"}}>
        <VotePartyStyle>
        <CreateVoteParty
            VoteRoomId={VoteRoomId}
            name="voteparty"
            type="text"
            id="voteparty"
            value={singleoption.voteparty}
            onChange={(e) => handleServiceChange(e, index)}
            required
        />
        </VotePartyStyle>
        </div>
       
        <div style={{marginTop : "15px"}}>
        {voteParty.length !== 1 && (
            <Button
            onClick={() => handleServiceRemove(index)}
            startIcon={<Iconify icon="eva:trash-2-fill" />}
            color="error"
            fontSize="large"
            >Delete Party</Button>
        )}
        </div>
         </div>
        
        {voteParty.length - 1 === index  && (
            <Button
            onClick={handleServiceAdd}
            startIcon={<Iconify icon="eva:plus-fill" />}
            color="error"
            fontSize='large'
            >Add Vote Party</Button>
        )}
    </div>
    ))}
        
    </ContentStyle>
  )
}

export default VoteParty