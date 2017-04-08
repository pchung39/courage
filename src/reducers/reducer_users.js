import { FETCH_USERS } from '../actions/index';

const INITIAL_STATE = { all: [] };

export default function UsersReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_USERS:
      return {...state, all: action.payload.data };
    default:
      return state;
  }
}
