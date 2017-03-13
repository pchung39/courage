import { FETCH_LONGEST } from '../actions/index';

const INITIAL_STATE = { streak: 0 };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_LONGEST:
      return { ...state, streakInfo: action.payload.data};
    default:
      return state;
  }
}
