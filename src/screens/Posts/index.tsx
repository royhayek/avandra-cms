// Packages
import { createElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

// Components
import * as Screens from './components';

// Interfaces
interface MatchParams {
  detail?: string;
}

type PostsProps = RouteComponentProps<MatchParams>;

// Component
const Posts = (props: PostsProps) => {
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

export default Posts;
