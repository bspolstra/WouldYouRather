import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from "../util/_DATA";
import { setUsers } from "../actions/users";
import { setQuestions } from "../actions/questions";
import { setAuthedUser } from "../actions/authedUser";
export function initializeData(authedUser) {
  return dispatch => {
    return getInitialData().then(([users, questions]) => {
      dispatch(setUsers(users));
      dispatch(setQuestions(questions));
      dispatch(setAuthedUser(authedUser));
    });
  };
}

function getInitialData() {
  return new Promise.all([_getQuestions(), _getUsers()]).then(
    ([users, questions]) => {
      users, questions;
    }
  );
}
