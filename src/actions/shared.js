import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from "../util/_DATA";
import { setUsers } from "../actions/users";
import { setQuestions } from "../actions/questions";

export function handleInitializeData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(setUsers(users));
      dispatch(setQuestions(questions));
    });
  };
}

function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}
