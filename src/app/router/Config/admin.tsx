// Packages
import React from 'react';

// Components
import * as Screens from 'screens';
import PlaceIcon from '@mui/icons-material/Place';
import GroupsIcon from '@mui/icons-material/Groups2';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export const routes = [
  {
    key: 'dashboard',
    path: '/',
    component: Screens.Dashboard,
    hasSub: false,
    exact: true
  },
  {
    key: 'users',
    path: '/users/:detail?',
    component: Screens.Users,
    hasSub: true
  },
  {
    key: 'user',
    path: '/user/:detail?',
    component: Screens.User,
    hasSub: true
  },
  {
    key: 'destinations',
    path: '/destinations/:detail?',
    component: Screens.Destinations,
    hasSub: true
  },
  {
    key: 'travelers',
    path: '/travelers/:detail?',
    component: Screens.Travelers,
    hasSub: true
  },
  {
    key: 'trips',
    path: '/trips/:detail?',
    component: Screens.Trips,
    hasSub: true
  },
  {
    key: 'reports',
    path: '/reports/:detail?',
    component: Screens.Reports,
    hasSub: true
  },
  {
    key: 'notifications',
    path: '/notifications/:detail?',
    component: Screens.Notifications,
    hasSub: true
  },
  {
    key: 'settings',
    path: '/settings/:detail?',
    component: Screens.Settings,
    hasSub: true
  },
  {
    key: 'login',
    path: '/login/:detail?',
    component: Screens.Login,
    hasSub: true
  }
];

export const subRoutes = () => [
  {
    key: 'users',
    list: [
      {
        key: 'users-edit',
        path: 'user-edit/:userId',
        title: 'Edit User',
        hasNew: true,
        external: false
      }
    ]
  },
  {
    key: 'categories',
    list: [
      {
        key: 'form',
        path: '/categories/form',
        title: 'Add Category',
        hasNew: false,
        external: false
      }
    ]
  }
];

export const drawerItems = [
  {
    path: '/',
    key: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon color="inherit" />
  },
  {
    path: '/users',
    key: 'users',
    title: 'Users',
    icon: <PeopleIcon color="inherit" />
  },
  {
    path: '/destinations',
    key: 'destinations',
    title: 'Destinations',
    icon: <PlaceIcon color="inherit" />
  },
  {
    path: '/travelers',
    key: 'travelers',
    title: 'Travelers',
    icon: <GroupsIcon color="inherit" />
  },
  {
    path: '/trips',
    key: 'trips',
    title: 'Trips',
    icon: <FlightTakeoffIcon color="inherit" />
  },
  {
    path: '/reports',
    key: 'reports',
    title: 'Reports',
    icon: <AssessmentIcon color="inherit" />
  },
  {
    path: '/notifications',
    key: 'notifications',
    title: 'Notifications',
    icon: <NotificationsIcon color="inherit" />
  },
  {
    path: '/settings',
    key: 'settings',
    title: 'Settings',
    icon: <SettingsIcon color="inherit" />
  }
];
