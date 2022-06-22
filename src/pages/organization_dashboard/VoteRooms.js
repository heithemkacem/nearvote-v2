import React ,{ useState ,useEffect} from 'react';
import {  filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { sendEmails } from '../../_actions_/voter/actions/voterAction';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../../components/animate';
import authHeader from '../../_actions_/organization/auth/auth-header';

import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { VoteRoomListHead, VoteRoomListToolbar, VoteRoomMoreMenu } from '../../sections/@dashboard/vote-room';

const TABLE_HEAD = [
  { id: 'roomName', label: 'Room Name', alignRight: false },
  { id: 'roomDescription', label: 'Room Description', alignRight: false },
  { id: 'creationDate', label: 'Creation Date', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.roomName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const VoteRooms = ({sendEmails}) => {
  const location = useLocation()
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
      fetchData('http://localhost:5000/voteroom/voteroomslist')},[location.key])
 

 
  //MUI Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('roomName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

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
  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;
  return (
    <div>
        <Page title="VoteRooms | NEARVOTE">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Vote Rooms
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                  <Button
                    style={{marginLeft : 20}}
                    component={RouterLink}
                    to="/dashboard/create-vote-room"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Create Vote Room
                  </Button>
              </Stack>
            </Stack>
            
            <Card>
              <VoteRoomListToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <VoteRoomListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={data.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { _id, roomName, roomDescription, date } = row;
                          return (
                            <TableRow
                              hover
                              key={ makeid(5)}
                              tabIndex={-1}
                            >
                              <TableCell align="left"> {roomName}</TableCell>
                              <TableCell align="left">{roomDescription}</TableCell>
                              <TableCell align="left">{date}</TableCell>
                              <TableCell align="left"> <Button onClick={()=>sendEmails(_id)} >Send Emails</Button> </TableCell>
                              <TableCell align="right">
                                <VoteRoomMoreMenu data={_id}/>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Container>
        </Page>
    </div>
  )
  }
  
}

export default connect(null,{sendEmails})(VoteRooms)