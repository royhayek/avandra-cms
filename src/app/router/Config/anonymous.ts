// Components
import * as Screens from 'screens';

export const routes = [
  {
    key: 'login',
    path: '/',
    component: Screens.Login,
    hasSub: false,
    exact: true
  },
  {
    key: 'share',
    path: '/share/:path/:id',
    component: Screens.DeepLinkRedirect,
    hasSub: false
  }
];
