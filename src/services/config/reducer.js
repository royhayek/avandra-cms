import * as actionTypes from "./actionTypes";

const initialState = {
  streamer_host: "",
  streamer_port: "",
  streamer_protocol: "",
  streamer_adabter: "",
  connected: false,
  interrupted: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.RESET:
      return initialState;

    default:
      return state;
  }
};

export default reducer;

