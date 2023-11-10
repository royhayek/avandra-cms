import DnsIcon from "@mui/icons-material/Dns";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import * as Screens from "screens";

export const routes = [
  {
    key: "dashboard",
    path: "/",
    component: Screens.Dashboard,
    hasSub: false,
    exact: true,
  },
  {
    key: "users",
    path: "/users/:detail?",
    component: Screens.Users,
    hasSub: true,
  },
  {
    key: "user",
    path: "/user/:detail?",
    component: Screens.User,
    hasSub: true,
  },
  {
    key: "categories",
    path: "/categories/:detail?",
    component: Screens.Categories,
    hasSub: true,
  },
  {
    key: "posts",
    path: "/posts/:detail?",
    component: Screens.Posts,
    hasSub: true,
  },
  {
    key: "reports",
    path: "/reports/:detail?",
    component: Screens.Reports,
    hasSub: true,
  },
  {
    key: "notifications",
    path: "/notifications/:detail?",
    component: Screens.Notifications,
    hasSub: true,
  },
  {
    key: "settings",
    path: "/settings/:detail?",
    component: Screens.Settings,
    hasSub: true,
  },
  {
    key: "login",
    path: "/login/:detail?",
    component: Screens.Login,
    hasSub: true,
  },
];

export const subRoutes = (opts) => [
  {
    key: "users",
    list: [
      {
        key: "users-edit",
        path: "user-edit/:userId",
        title: "Edit User",
        hasNew: true,
        external: false,
      },
    ],
  },
  {
    key: "categories",
    list: [
      {
        key: "form",
        path: "/categories/form",
        title: "Add Category",
        hasNew: false,
        external: false,
      },
    ],
  },
];

export const drawerItems = [
  {
    path: "/",
    key: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon color="inherit" />,
  },
  {
    path: "/users",
    key: "users",
    title: "Users",
    icon: <PeopleIcon color="inherit" />,
  },
  {
    path: "/categories",
    key: "categories",
    title: "Categories",
    icon: <DnsIcon color="inherit" />,
  },
  {
    path: "/posts",
    key: "posts",
    title: "Posts",
    icon: <ListAltIcon color="inherit" />,
  },
  {
    path: "/reports",
    key: "reports",
    title: "Reports",
    icon: <AssessmentIcon color="inherit" />,
  },
  {
    path: "/notifications",
    key: "notifications",
    title: "Notifications",
    icon: <NotificationsIcon color="inherit" />,
  },
  {
    path: "/settings",
    key: "settings",
    title: "Settings",
    icon: <SettingsIcon color="inherit" />,
  },
];
