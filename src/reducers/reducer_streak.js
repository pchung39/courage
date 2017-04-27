import { FETCH_LONGEST } from '../actions/types';

const INITIAL_STATE = { streak: 0 };

export default function StreakReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_LONGEST:
      return { ...state, streak: action.payload};
    default:
      return state;
  }
}
