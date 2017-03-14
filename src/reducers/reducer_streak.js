import { FETCH_LONGEST } from '../actions/index';

const INITIAL_STATE = { streak: 0 };

export default function StreakReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_LONGEST:
      console.log("I am the action payload",action.payload.streak);
      return { ...state, streak: action.payload.streak};
    default:
      return state;
  }
}
