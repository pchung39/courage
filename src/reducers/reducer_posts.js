import { FETCH_ENTRIES, CREATE_ENTRY, DELETE_ENTRY } from '../actions/index';

const INITIAL_STATE = { all: [], entry: null };

export default function PostsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_ENTRY:
      return {...state, entry: action.payload.data };
    case FETCH_ENTRIES:
      return { ...state, all: action.payload.data };
    case DELETE_ENTRY:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
