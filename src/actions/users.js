import { SET_USERS } from "../util/constants";

export function setUsers(users) {
  return {
    type: SET_USERS,
    users
  };
}
