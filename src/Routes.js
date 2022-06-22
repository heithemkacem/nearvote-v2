import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import VoterDashboardLayout from './layouts/voter_dashboard'
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

//!Organization
import DashboardApp from './pages/organization_dashboard/DashboardApp';
import Voter from './pages/organization_dashboard/Voter';
import CreateVoter from './pages/organization_dashboard/CreateVoter'
import UpdateVoter from './pages/organization_dashboard/UpdateVoter'
import VoteRooms from './pages/organization_dashboard/VoteRooms'
import CreateVoteRoom from './pages/organization_dashboard/CreateVoteRoom'
import UpdateVoteRoom from './pages/organization_dashboard/UpdateVoteRoom'
import VoteParty from './pages/organization_dashboard/VoteParty'
import Results from './pages/organization_dashboard/Results'
import PartysResults from './pages/organization_dashboard/PartysResult'
import FinalResult from './pages/organization_dashboard/FinalResult'
import Profile from './pages/organization_dashboard/Profile'



//!Voter
import VoterVoteRooms from './pages/voter_dashboard/VoterVoteRooms'
import VoterVotePartys from './pages/voter_dashboard/VoterVotePartys'
import VoterVoteParty from './pages/voter_dashboard/VoterVoteParty'
import VoterDashboardApp from './pages/voter_dashboard/VoterDashboardApp';
import UpdateVoterAlpha from './pages/voter_dashboard/UpdateVoter'
//!Main Routes
import Home from './pages/home/Home';
import Login from './pages/organization_auth/Login';
import Register from './pages/organization_auth/Register';
import ResetPassword from './pages/organization_auth/ResetPassword';
import ForgetPassword from './pages/organization_auth/ForgetPassword'
import OtpVerification from './pages/organization_auth/OTPverification'
import ResendOTPPage from './pages/organization_auth/ResendOTP'
import NotFound from './pages/home/Page404';
import VoterLogin from './pages/voter_auth/VoterLogin';
import VoterForgetPassword from './pages/voter_auth/VoterForgetPassword'
import VoterResetPassword from './pages/voter_auth/VoterResetPassword';
import VoterProtectedRoute from './VoterProtectedRoute'
import ProtectedRoute from './ProtectedRoute';
import { connect } from 'react-redux';


const Routes = () => {
  return useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedRoute component = {DashboardLayout}/> ,
      children: [
        { path: 'app', element: <ProtectedRoute component = {DashboardApp}/>},
        { path: 'voters-list', element: <ProtectedRoute component = {Voter}/>,},
        { path: 'create-voter', element:<ProtectedRoute component = {CreateVoter}/> },
        { path: 'update-voter/:voterid', element: <ProtectedRoute component = {UpdateVoter}/>},
        { path: 'vote-rooms', element:<ProtectedRoute component = {VoteRooms}/> },
        { path: 'create-vote-room', element:<ProtectedRoute component = {CreateVoteRoom}/> },
        { path: 'update-vote-room/:voteroomid', element:<ProtectedRoute component = {UpdateVoteRoom}/> },
        { path: 'vote-party/:voteroomid', element: <ProtectedRoute component = {VoteParty}/>},
        { path: 'results', element: <ProtectedRoute component = {Results}/>},
        { path: 'results/:roomid', element: <ProtectedRoute component = {PartysResults}/>},
        { path: 'results/:roomid/:partyid', element: <ProtectedRoute component = {FinalResult}/>},
        { path: 'profile/:organizationid', element: <ProtectedRoute component = {Profile}/>},


      ]
    }, 
    {
          path: '/voter-dashboard',
          element: <VoterProtectedRoute component = {VoterDashboardLayout}/> ,
          children: [
            { path: 'app', element:<VoterProtectedRoute component = {VoterDashboardApp}/> },
            { path: 'vote-rooms/:voterid', element:<VoterProtectedRoute component = {VoterVoteRooms}/> },
            { path: 'vote-partys/:voterid/:roomid', element:<VoterProtectedRoute component = {VoterVotePartys}/> },
            { path: 'vote-party/:voterid/:roomid/:partyid', element:<VoterProtectedRoute component = {VoterVoteParty}/> },
            { path: 'voter/:voterid', element:<VoterProtectedRoute component = {UpdateVoterAlpha}/> },

          ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/home" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
        { path: '/home', element: <Home /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'register', element: <Register /> },
        { path: `verify/:orgID`, element: <OtpVerification /> },
        { path: `resendOTP/:orgID`, element: <ResendOTPPage /> },
        { path: 'login', element: <Login /> },
        { path: 'passwordreset/:uniqueId/:resetString', element: <ResetPassword /> },
        { path: 'voter-forget-password', element: <VoterForgetPassword /> },
        { path: 'voter-login', element: <VoterLogin /> },
        { path: 'voter-passwordreset/:uniqueId/:resetString', element: <VoterResetPassword /> },
        { path: '*', element: <Navigate to="/404" replace /> }
  ]);

}

export default connect()(Routes) ;
