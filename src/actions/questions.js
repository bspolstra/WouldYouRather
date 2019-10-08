import { SET_QUESTIONS } from "../util/constants";

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    questions
  };
}
