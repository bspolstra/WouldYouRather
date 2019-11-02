import { SET_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from "../util/constants";
import { _saveQuestion, _saveQuestionAnswer } from "../util/_DATA";

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

function saveAnswer(question) {
  const { qid, answer, authedUser } = question;
  return {
    type: SAVE_ANSWER,
    qid,
    answer,
    authedUser
  };
}

export function handleCreateQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    _saveQuestion({ optionOneText, optionTwoText, author }).then(question =>
      dispatch(addQuestion(question))
    );
  };
}

export function handleSaveAnswer(authedUser, qid, answer) {
  return dispatch => {
    _saveQuestionAnswer({ authedUser, qid, answer }).then(() =>
      dispatch(saveAnswer({ authedUser, qid, answer }))
    );
  };
}
