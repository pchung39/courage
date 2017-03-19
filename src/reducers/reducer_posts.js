import { FETCH_ENTRIES, CREATE_ENTRY } from '../actions/index';

const INITIAL_STATE = { entries: [], entry: null };

export default function PostsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_ENTRY:
      return {...state, entry: action.payload.data };
    case FETCH_ENTRIES:
      return { ...state, entries: action.payload.data };
    default:
      return state;
  }
}
