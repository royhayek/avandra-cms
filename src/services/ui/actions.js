import * as actionTypes from "./actionTypes";

export const init = () => ({
  type: actionTypes.INIT,
});

export const update = (payload) => ({
  type: actionTypes.UPDATE,
  payload,
});

export const merge = (payload) => ({
  type: actionTypes.MERGE,
  payload,
});

export const omit = (payload) => ({
  type: actionTypes.OMIT,
  payload,
});

export const reset = () => ({
  type: actionTypes.RESET,
});

export const updateLayout = (payload) => ({
  type: actionTypes.UPDATELAYOUT,
  payload,
});

export const setLayout = (payload) => ({
  type: actionTypes.SETLAYOUT,
  payload,
});

export const resetLayout = () => ({
  type: actionTypes.RESETLAYOUT,
});
