import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Button } from '@mui/material';
import Iconify from '../../components/Iconify';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutVoter } from '../../_actions_/voter/actions/voterAction';
import React from 'react'
import { login, logout } from './../../utils'
const DashboardNavbar = ({ onOpenSidebar ,logoutVoter}) => {

  const DRAWER_WIDTH = 280;
  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;
  const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
  }));

  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
    }
  }));

  DashboardNavbar.propTypes = {
    onOpenSidebar: PropTypes.func
  };
  const navigate = useNavigate();

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

       
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
        <Button onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Connect Wallet" : window.accountId}
        </Button>
        <Button variant='contained' onClick={()=>{logoutVoter(navigate)}}>
          logout
        </Button>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

export default connect(null,{logoutVoter}) (DashboardNavbar)
