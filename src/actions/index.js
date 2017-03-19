import axios from 'axios';


export const CREATE_ENTRY = 'CREATE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_LONGEST = 'FETCH_LONGEST';
export const FETCH_USERINFO = 'FETCH_USERINFO';

const ROOT_URL = 'http://localhost:3000/entries';


export function longestStreak() {
  return (dispatch, getState) => {
      return fetch(`${ROOT_URL}`)
          .then((response) => response.json())
          .then((response) => {
              dispatch(findLongestStreak(response));
          });
      };
};

function findLongestStreak(entries) {
  var longestStreakLength = 0;
  var currentStreakLength = 0;
  for (var pos = 0; pos <= entries.length - 1; pos++) {
    if (pos == entries.length - 1) {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
    }
    else if (entries[pos].status == "Accepted") {
      if (currentStreakLength > longestStreakLength) {
        longestStreakLength = currentStreakLength;
      };
      currentStreakLength = 0;
    }
    else if (entries[pos].status == "Rejected") {
      currentStreakLength++;
      //console.log("Current streak length", currentStreakLength);
      }
    };

  return {
    type: FETCH_LONGEST,
    payload: longestStreakLength
  };
}

export function fetchUserInfo() {
  return (dispatch, getState) => {
      return fetch("https://graph.facebook.com/me?access_token=EAACW5Fg5N2IBAGBJrMv6stzZBZAPjWCMG78HP2QYPh4uCIwSdekmQN2jsJKpZAZBsWKT0XA9h3FHeP8jsHPhAAc7sCL6HWzasZB8ZCDsYAuz4blFdiu4VvJjAaVNh4xtOiahsxFiDKRSw5a5ZCMVBRa2U1JmAQmmx7z3Blh7ZCbBdf7n4FIENAVH")
          .then((response) => response.json())
          .then((response) => {
              dispatch({type: FETCH_USERINFO, payload: response});
          });
      };
};


export function fetchEntries() {
  const request = axios.get(`${ROOT_URL}`);
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}



/*
export function fetchUserInfo() {
  const request = axios.get('https://graph.facebook.com/me?access_token=EAACW5Fg5N2IBAGBJrMv6stzZBZAPjWCMG78HP2QYPh4uCIwSdekmQN2jsJKpZAZBsWKT0XA9h3FHeP8jsHPhAAc7sCL6HWzasZB8ZCDsYAuz4blFdiu4VvJjAaVNh4xtOiahsxFiDKRSw5a5ZCMVBRa2U1JmAQmmx7z3Blh7ZCbBdf7n4FIENAVH');
  return {
    type: FETCH_USERINFO,
    payload: request
  }
}
*/

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
