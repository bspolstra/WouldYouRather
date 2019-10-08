import authedUser from "../reducers/authedUser";
import users from "../reducers/users";
import questions from "../reducers/questions";
import { combineReducer } from "react-redux";

export default combineReducer({
  users,
  questions,
  authedUser
});
