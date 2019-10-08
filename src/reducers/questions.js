import { SET_QUESTIONS, SET_ANSWER } from "../util/constants";
import { strictEqual } from "assert";

export default function questions(state = {}, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return state.concat(...state, action.questions);
    case SET_ANSWER:
      return state;
    case ADD_QUESTION:
      return state;
    default:
      return state;
  }
}
