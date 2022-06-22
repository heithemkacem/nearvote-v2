import React from 'react'
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import Iconify from '../../../components/Iconify';


const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));



export default function AppVoteRooms({data}) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="fluent:breakout-room-20-regular" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{data}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Vote Rooms
      </Typography>
    </RootStyle>
  );
}
