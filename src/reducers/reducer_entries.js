import { FETCH_ENTRIES, CREATE_ENTRY, DELETE_ENTRY } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function EntriesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CREATE_ENTRY:
      return {...state, success: action.payload.data.success };
    case FETCH_ENTRIES:
      return { ...state, all: action.payload.data };
    case DELETE_ENTRY:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}
