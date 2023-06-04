// ------------------------------------------------------------ //
// ------------------------- Packages ------------------------- //
// ------------------------------------------------------------ //
import { createElement } from "react";

// ------------------------------------------------------------ //
// ------------------------- Utilities ------------------------ //
// ------------------------------------------------------------ //
import * as Screens from "./screens";

// ------------------------------------------------------------ //
// ------------------------- Component ------------------------ //
// ------------------------------------------------------------ //


const Reports = (props) => {
  const {
    match: {
      params: { detail = "list" },
    },
    history,
  } = props;

  let _detail = String(detail).toLocaleLowerCase();
  let Component = Screens[_detail]
    ? createElement(Screens[_detail], { history })
    : null;

  return Component;
};

export default Reports;
