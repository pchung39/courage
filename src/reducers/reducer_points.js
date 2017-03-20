import { FETCH_TOTAL_POINTS } from '../actions/index';

const INITIAL_STATE = { points: 0 };

export default function PointsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_TOTAL_POINTS:
      console.log("I am the points payload",action.payload);
      return { ...state, points: action.payload};
    default:
      return state;
  }
}
