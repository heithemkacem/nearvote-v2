import React from 'react';

import Iconify from '../../components/Iconify';
import { getCurrentVoter } from '../../_actions_/voter/actions/voterAction';
const getIcon = (name) => {<Iconify icon={name} width={22} height={22} />};

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/voter-dashboard/app',
    icon: getIcon('eva:pie-chart-outline')
  },
  {
    title: 'vote rooms',
    path: `/voter-dashboard/vote-rooms/${getCurrentVoter()}`,
    icon: getIcon('eva:cube-outline')
  },
  {
    title: 'profile',
    path: `/voter-dashboard/voter/${getCurrentVoter()}`,
    icon: getIcon('eva:person-outline')
  },
  
  
];

export default sidebarConfig;
