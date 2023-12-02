// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { createElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import * as Screens from './components';
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
interface MatchParams {
  detail?: string;
}

type CategoriesProps = RouteComponentProps<MatchParams>;

const Categories = (props: CategoriesProps) => {
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

export default Categories;
