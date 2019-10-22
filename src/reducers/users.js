import { SET_USERS, SET_ANSWER, ADD_QUESTION } from "../util/constants";

export default function users(state = {}, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, ...action.users };
    case SET_ANSWER:
      return state;
    case ADD_QUESTION:
      return state;
    default:
      return state;
  }
}
