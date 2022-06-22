import React ,{ useEffect, useState } from 'react';
import {  filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupVoterFromExcel } from '../../_actions_/voter/actions/voterAction';
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { MotionContainer, varBounceIn } from '../../components/animate';
import authHeader from '../../_actions_/organization/auth/auth-header';
import readXlsxFile from 'read-excel-file'

import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { VoterListHead, VoterListToolbar, VoterMoreMenu } from '../../sections/@dashboard/voter';
import { useLocation } from 'react-router-dom';


const Input = styled('input')({
  display: 'none',
});
const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'firstName', label: 'First Name', alignRight: false },
  { id: 'lastName', label: 'Last Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: '' }
];

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
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
    return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Voter = ({signupVoterFromExcel}) => {
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
      fetchData('http://localhost:5000/voter/voterlist')
  },[location.key])
  //MUI Table
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('username');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);

  };
  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
      setSelected(newSelected)
}


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

  const handleFile = (e)=>{
    const schema = {
      'username': {
        prop : 'username',
        type: String,
        required: true,
      },
      'firstName': {
        prop : 'firstName',
        type: String, 
        required: true,
      },
      'lastName': {
        prop : 'lastName',
        type: String,
        required: true,
      },
      'email': {
        prop : 'email',
        type: String,
        required: true
      },
      'phone': {
        prop : 'phone',
        type: Number,
        required: true,
      
      }
    }
    readXlsxFile(e.target.files[0], { schema }).then(( {rows,errors} ) => {
        signupVoterFromExcel(rows)
    })
    

  }
  if(data === "no data"){
    return(
      <MotionContainer key={makeid(5)} initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                No data has been found !
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the data you’re looking for. Perhaps you haven't add voters?
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
                    to="/dashboard/create-voter"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    New Voter
                  </Button>
              
                  <label htmlFor="contained-button-file">
                  <Input onChange={handleFile } accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="contained-button-file" multiple type="file" />
                  <Button variant="contained" component="span">
                    Upload Excel/Csv File
                  </Button>
                  </label>
          </Box>
        </MotionContainer>
    )
  }else{
  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;
  return (
    <div >
        <Page title="Voters | NEARVOTE">
          <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Voter List
              </Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <label htmlFor="contained-button-file">
                  <Input onChange={handleFile } accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="contained-button-file" multiple type="file" />
                  <Button component="span"  startIcon={<Iconify icon="eva:plus-fill" />}>
                    Upload Excel/Csv File
                  </Button>
                </label>
                  <Button
                    style={{marginLeft : 20}}
                    component={RouterLink}
                    to="/dashboard/create-voter"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    New Voter
                  </Button>
              </Stack>
            </Stack>
            <Card>
              <VoterListToolbar
                data={selected}
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table >
                    <VoterListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={data.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { _id, username, firstName, lastName, email,phone, role } = row;
                          const isItemSelected = selected.indexOf(_id) !== -1;

                          return (
                            <TableRow
                              hover
                              key={makeid(5)}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  value={_id}
                                  defaultChecked={isItemSelected}
                                  onChange={(event) => handleClick(event, _id)}
                                />
                              </TableCell>
                              <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="subtitle2" noWrap>
                                    {username}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{firstName}</TableCell>
                              <TableCell align="left">{lastName}</TableCell>
                              <TableCell align="left"> {email}  </TableCell>
                              <TableCell align="left"> {phone}  </TableCell>
                              <TableCell align="left"> {role}  </TableCell>
                              <TableCell align="right">
                                <VoterMoreMenu data={_id}/>
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

export default connect(null,{signupVoterFromExcel})(Voter)