import { SET_QUESTIONS, SAVE_ANSWER, ADD_QUESTION } from "../util/constants";

export default function questions(state = {}, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return { ...state, ...action.questions };
    case SAVE_ANSWER:
      const { qid, answer, authedUser } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };
    case ADD_QUESTION:
      return { ...state, [action.question.id]: action.question };
    default:
      return state;
  }
}
