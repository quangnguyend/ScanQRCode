import * as types from "./typesActions";

export const insertRoleInfo = (info) => ({
  type: types.INSERT_ROLE_INFO,
  info
})

export const setActionScanner = (action) => ({
  type: types.SET_ACTION_SCANNER,
  action
})