import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography ,Button} from '@mui/material';
import AuthLayout from '../../layouts/AuthLayout';
import Page from '../../components/Page';
import { OtpVerification } from '../../sections/authentication/otp-verification';
import React from 'react'

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));


export default function Register() {
  return (
    <RootStyle title="OTP Verification | NEARVOTE">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img alt="register" src="/static/illustrations/illustration_register.png" />
      </SectionStyle>
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Verify your account.
            </Typography>
          </Box>
          <OtpVerification />
          <Typography
            variant="subtitle2"
            sx={{
              mt: 3,
              textAlign: 'center',
              display: { sm: 'none' }
            }}
          >
            Already have an account?&nbsp;
            <Link underline="hover" to="/login" component={RouterLink}>
              Login
            </Link>
          </Typography>
           
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
