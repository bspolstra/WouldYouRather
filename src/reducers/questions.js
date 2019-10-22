import { SET_QUESTIONS, SET_ANSWER, ADD_QUESTION } from "../util/constants";

export default function questions(state = {}, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return { ...state, ...action.questions };
    case SET_ANSWER:
      return state;
    case ADD_QUESTION:
      return state;
    default:
      return state;
  }
}
