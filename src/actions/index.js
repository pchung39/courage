import axios from 'axios';


export const CREATE_ENTRY = 'CREATE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_LONGEST = 'FETCH_LONGEST';
export const FETCH_TOTAL_POINTS = 'FETCH_TOTAL_POINTS';

const ROOT_URL = 'http://localhost:3000/entries';

export function longestStreak() {
  return (dispatch, getState) => {
      return fetch(`${ROOT_URL}`)
          .then((response) => response.json())
          .then((response) => {
              dispatch(findLongestStreak(response));
              dispatch(calculateTotalPoints(response));
          });
      };
};

function findLongestStreak(entries) {
  var longestStreakLength = 0;
  var currentStreakLength = 0;
  for (var pos = 0; pos <= entries.length - 1; pos++) {
    if (pos === entries.length - 1) {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
    }
    else if (entries[pos].status === "Accepted") {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
      currentStreakLength = 0;
    }
    else if (entries[pos].status === "Rejected") {
      currentStreakLength++;
      //console.log("Current streak length", currentStreakLength);
    }
    };

  return {
    type: FETCH_LONGEST,
    payload: longestStreakLength
  };
}

function calculateTotalPoints(entries){
  var totalPoints = 0;

  for (var pos = 0; pos <= entries.length - 1; pos++ ) {
    if (entries[pos].status === "Rejected") {
      totalPoints += 10;
    }
    else {
      totalPoints += 1;
    }
  }

  return {
    type: FETCH_TOTAL_POINTS,
    payload: totalPoints
  };
}


export function fetchEntries() {
  const request = axios.get(`${ROOT_URL}`);
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}


export function createEntry(props) {
  const request = axios.post(`${ROOT_URL}`, props);
  console.log(props);
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
  const request = axios.delete(`${ROOT_URL}/posts/${id}`);

  return {
    type: DELETE_ENTRY,
    payload: request
  };
}
