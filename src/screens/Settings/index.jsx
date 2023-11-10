// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { createElement } from "react";
// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import * as Screens from "./components";
// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //
const Settings = props => {
  const {
    match: {
      params: { detail = "general" },
    },
    history,
  } = props;

  let _detail = String(detail).toLocaleLowerCase();
  let Component = Screens[_detail] ? createElement(Screens[_detail], { history }) : null;

  return Component;
};

export default Settings;
