// Packages
import { createElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Utilities
import * as Screens from './components';

// Interfaces
interface MatchParams {
  detail?: string;
}

type WalkthroughProps = RouteComponentProps<MatchParams>;

// Component

const Walkthrough = (props: WalkthroughProps) => {
  const {
    match: {
      params: { detail = 'table' }
    },
    history
  } = props;

  const _detail = String(detail).toLocaleLowerCase();
  const Component = (Screens as any)[_detail] ? createElement((Screens as any)[_detail], { history }) : null;

  return Component;
};

export default Walkthrough;
