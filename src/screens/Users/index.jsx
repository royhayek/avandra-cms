// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import  { createElement } from "react";

// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import * as Screens from "./screens";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const Users = (props) => {
  const {
    match: {
      params: { detail = "table" },
    },
    history,
  } = props;

  let _detail = String(detail).toLocaleLowerCase();
  let Component = Screens[_detail]
    ? createElement(Screens[_detail], { history })
    : null;

  return Component;
};

export default Users;
