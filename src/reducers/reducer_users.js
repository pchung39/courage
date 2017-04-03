import { CHECK_USER } from '../actions/index';

const INITIAL_STATE = { validUser: null };

export default function UserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CHECK_USER:
    console.log("check user reducer: ", action.payload.data);
      return {...state, validUser:action.payload.data };
    default:
      return state;
  }
}
