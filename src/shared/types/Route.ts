import { ReactNode } from 'react';

export interface RouteProps {
  key: string;
  path: string;
  component: ReactNode;
  hasSub: boolean;
  exact: boolean;
}
