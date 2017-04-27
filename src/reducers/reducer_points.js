import { FETCH_TOTAL_POINTS, SET_TOTAL_POINTS } from '../actions/types';

const INITIAL_STATE = { points: 0 , success: false };

export default function PointsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_TOTAL_POINTS:
      return { ...state, points: action.payload};
    case SET_TOTAL_POINTS:
      return { ...state, success: action.payload.data.success }
    default:
      return state;
  }
}
