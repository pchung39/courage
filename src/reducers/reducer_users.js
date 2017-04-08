import { FETCH_USERS } from '../actions/index';

const INITIAL_STATE = { all: [] };

export default function UsersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USERS:
      console.log("users reducer: ", action.payload);
      return {...state, all: action.payload };
    default:
      return state;
  }
}
