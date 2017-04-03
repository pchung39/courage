import axios from 'axios';

export const CREATE_ENTRY = 'CREATE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_LONGEST = 'FETCH_LONGEST';
export const FETCH_TOTAL_POINTS = 'FETCH_TOTAL_POINTS';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const CREATE_USER = 'CREATE USER';
export const CHECK_USER = 'CHECK USER';

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

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
};

export function fetchEntry(id) {
  const request = axios.get(`${ROOT_URL}/${id}`);

  return {
    type: FETCH_ENTRY,
    payload: request
  };
}


function findLongestStreak(entries) {
  var longestStreakLength = 0;
  var currentStreakLength = 0;
  for (var pos = 0; pos <= entries.length - 1; pos++) {
    if (pos === entries.length - 1) {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
    }
    else if (entries[pos].outcome === "accepted") {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
      currentStreakLength = 0;
    }
    else if (entries[pos].outcome === "rejected") {
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
    if (entries[pos].outcome === "rejected") {
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

export function checkUser(props) {
  const request = axios.post(`${ROOT_URL}/checkuser`, props);
  return {
    type: CHECK_USER,
    payload: request
  };
}

export function createUser(props) {
  const request = axios.post(`${ROOT_URL}/newuser`, props);
  console.log(props);
  return {
    type: CREATE_USER,
    payload: request
  };
}


export function deleteEntry(id) {
  return (dispatch, getState) => {
      return axios.delete(`${ROOT_URL}/${id}`)
          .then(() => {
              dispatch(fetchEntries());
          });
      };
};
