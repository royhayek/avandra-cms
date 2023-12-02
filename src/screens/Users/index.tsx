// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { RouteComponentProps } from 'react-router-dom';
import { createElement } from 'react';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import * as Screens from './screens';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface MatchParams {
  detail?: string;
}

type UserProps = RouteComponentProps<MatchParams>;

const Users = (props: UserProps) => {
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

export default Users;
