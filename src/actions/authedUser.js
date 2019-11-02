import { SET_AUTHED_USER, LOGOUT } from "../util/constants";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}

export function logout() {
  return { type: LOGOUT };
}
