import { FETCH_USERS, FETCH_CURRENT_USER } from '../actions/index';

const INITIAL_STATE = { all: [], current: null };

export default function UsersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USERS:
      return {...state, all: action.payload };
    case FETCH_CURRENT_USER:
      return {...state, current: action.payload.data }
    default:
      return state;
  }
}
