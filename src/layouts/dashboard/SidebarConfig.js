import React from 'react';

import Iconify from '../../components/Iconify';
import { getCurrentOrganizationId } from '../../_actions_/organization/actions/organizationAction';
const getIcon = (name) => {<Iconify icon={name} width={22} height={22} />};
const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-outline')
  },
  {
    title: 'voters list',
    path: '/dashboard/voters-list',
    icon: getIcon('eva:people-outline')
  },
  {
    title: 'vote rooms',
    path: '/dashboard/vote-rooms',
    icon: getIcon('eva:cube-outline')
  },
  {
    title: 'results',
    path: '/dashboard/results',
    icon: getIcon('eva:activity-outline')
  },
  {
    title: 'profile',
    path: `/dashboard/profile/${ getCurrentOrganizationId()}`,
    icon: getIcon('eva:person-outline')
  },
  
  
];

export default sidebarConfig;
