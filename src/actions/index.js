import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export const CREATE_ENTRY = 'CREATE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_LONGEST = 'FETCH_LONGEST';

const ROOT_URL = 'http://localhost:3000/entries';

export function fetchEntries() {
  const request = axios.get(`${ROOT_URL}`);
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}


export function createEntry(props) {
  const request = axios.post(`${ROOT_URL}`, props);
  return {
    type: CREATE_ENTRY,
    payload: request
  };
}

export function fetchEntry(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_ENTRY,
    payload: request
  };
}

export function deleteEntry(id) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: DELETE_ENTRY,
    payload: request
  };
}


// action creator for returning the longest streak of rejections
export function longestStreak() {
  return function(dispatch) {
    return fetchEntries().then(
      entries => dispatch(findLongestStreak(entries))
    );
  };
}


function findLongestStreak(entries) {
  var longestStreakLength = 0;
  var currentStreakLength = 0;
  for (var pos = 0; pos <= entries.length; pos++) {
    if (entries[pos].status == "Accepted") {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
      currentStreakLength = 0;
    }
    else if (entries[pos].status == "Rejected") {
      currentStreakLength++;
      }
    };
  return {
    type: FETCH_LONGEST,
    payload: longestStreakLength
  };
}
