import { SET_USERS, SAVE_ANSWER } from "../util/constants";

export default function users(state = {}, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, ...action.users };
    case SAVE_ANSWER:
      const { qid, authedUser, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      };
    default:
      return state;
  }
}
