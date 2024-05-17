// Packages
import React from 'react';

// Components
import * as Screens from 'screens';
import ChatIcon from '@mui/icons-material/Chat';
import QuizIcon from '@mui/icons-material/Quiz';
import TuneIcon from '@mui/icons-material/Tune';
import PlaceIcon from '@mui/icons-material/Place';
import ImageIcon from '@mui/icons-material/Image';
import PeopleIcon from '@mui/icons-material/People';
import RowingIcon from '@mui/icons-material/Rowing';
import GroupsIcon from '@mui/icons-material/Groups2';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

const hasUnreadMessages = true; // Replace with actual unread messages boolean

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
    key: 'walkthrough',
    path: '/walkthrough/:detail?',
    component: Screens.Walkthrough,
    hasSub: true
  },
  {
    key: 'destinations',
    path: '/destinations/:detail?',
    component: Screens.Destinations,
    hasSub: true
  },
  {
    key: 'articles',
    path: '/articles/:detail?',
    component: Screens.Articles,
    hasSub: true
  },
  {
    key: 'travelOptions',
    path: '/travelOptions/:detail?',
    component: Screens.TravelOptions,
    hasSub: true
  },
  {
    key: 'interests',
    path: '/interests/:detail?',
    component: Screens.Interests,
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
    key: 'messages',
    path: '/messages/:detail?',
    component: Screens.Messages,
    hasSub: true
  },
  {
    key: 'faqs',
    path: '/faqs/:detail?',
    component: Screens.Faqs,
    hasSub: true
  },
  {
    key: 'faq',
    path: '/faq/:detail?',
    component: Screens.Faq,
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
  },
  {
    key: 'share',
    path: '/share/:path/:id',
    component: Screens.DeepLinkRedirect,
    hasSub: false
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
    path: '/content',
    key: 'content',
    title: 'Content',
    icon: <ImageIcon color="inherit" />,
    children: [
      {
        path: '/walkthrough',
        key: 'walkthrough',
        title: 'Walkthrough',
        icon: <ViewCarouselIcon color="inherit" />
      },
      {
        path: '/destinations',
        key: 'destinations',
        title: 'Destinations',
        icon: <PlaceIcon color="inherit" />
      },
      {
        path: '/articles',
        key: 'articles',
        title: 'Articles',
        icon: <ArticleIcon color="inherit" />
      },
      {
        path: '/travelOptions',
        key: 'travelOptions',
        title: 'Travel Options',
        icon: <GroupsIcon color="inherit" />
      },
      {
        path: '/interests',
        key: 'interests',
        title: 'Interests',
        icon: <RowingIcon color="inherit" />
      }
    ]
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
    path: '/app-settings',
    key: 'app-settings',
    title: 'App Settings',
    icon: <SmartphoneIcon color="inherit" />,
    children: [
      {
        path: '/messages',
        key: 'messages',
        title: 'Messages',
        icon: hasUnreadMessages ? <MarkUnreadChatAltIcon color="inherit" /> : <ChatIcon color="inherit" />
      },
      {
        path: '/faqs',
        key: 'faqs',
        title: 'FAQs',
        icon: <QuizIcon color="inherit" />
      },
      {
        path: '/config',
        key: 'config',
        title: 'Config',
        icon: <TuneIcon color="inherit" />
      },
      {
        path: '/help-and-support',
        key: 'support',
        title: 'Support',
        icon: <SettingsIcon color="inherit" />
      }
    ]
  },
  {
    path: '/settings',
    key: 'settings',
    title: 'General Settings',
    icon: <SettingsIcon color="inherit" />
  }
];
