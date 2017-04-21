import axios from 'axios';

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const AUTH_ERROR = "AUTH_ERROR";
export const CREATE_ENTRY = 'CREATE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_LONGEST = 'FETCH_LONGEST';
export const FETCH_TOTAL_POINTS = 'FETCH_TOTAL_POINTS';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_CURRENT_USER = "FETCH_CURRENT_USER";
export const SET_TOTAL_POINTS = "SET_TOTAL_POINTS";

const ROOT_URL = 'https://courage-server.herokuapp.com';

/* ==== USER STATS ==== */

export function longestStreak() {
  return (dispatch, getState) => {
      return fetch(`${ROOT_URL}/entries`, { headers: { authorization: localStorage.getItem("token") } })
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



function calculateTotalPoints(entries){
  var totalPoints = 0;
  for (var pos = 0; pos <= entries.length - 1; pos++ ) {
    if (entries[pos].outcome === "rejected") {
      totalPoints = totalPoints + 10;
    }
    else {
      totalPoints = totalPoints + 1;
    }
  }

  return {
    type: FETCH_TOTAL_POINTS,
    payload: totalPoints
  };
}

function findLongestStreak(entries) {
  var longestStreakLength = 0;
  var currentStreakLength = 0;

  for (var pos = 0; pos <= entries.length - 1; pos++) {
    if (entries.length === 1) {
      if (entries[pos].outcome === "rejected") {
        longestStreakLength++;
      };
    }
    else if (pos === entries.length - 1) {
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
      }
    };

  return {
    type: FETCH_LONGEST,
    payload: longestStreakLength
  };
}

/* ==== FETCH ALL USERS'S ENTRIES ==== */

export function fetchEntries() {
  const request = axios.get(`${ROOT_URL}/entries`,
    {
      headers: { authorization: localStorage.getItem("token") }
    });
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}

/* ==== FETCH ALL USERS ==== */

export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}/users`);
  return {
    type: FETCH_USERS,
    payload: request
  };
}

/* ==== THUNK FUNCTION: SORT USERS FOR LEADERBOARD ==== */

function quickSort(users) {

  if (users.length <= 1) {
    return users;
  } else {

      var left = [];
      var right = [];
      var newArray = [];
      var pivot = users.pop();


      for (var i = 0; i < users.length; i++) {
          if (users[i].points < pivot.points) {
              left.push(users[i]);
          } else {
              right.push(users[i]);
          }
      }

      return newArray.concat(quickSort(left), pivot, quickSort(right));
    }
}

/* ==== FETCH USERS FOR LEADERBOARD ==== */

export function fetchSortedUsers() {
  return (dispatch, getState) => {
      return fetch(`${ROOT_URL}/users`)
          .then((response) => response.json())
          .then((response) => {
              var sortedList = quickSort(response.user);
              console.log("sortedList: ", sortedList);
              dispatch({
                type: FETCH_USERS,
                payload: sortedList.reverse().slice(0,5)
              });
          });
      };
};

/* ==== FETCH CURRENT USER ==== */

export function fetchCurrentUser() {
  const request = axios.get(`${ROOT_URL}/users/user`,
  {
    headers: { authorization: localStorage.getItem("token") }
  });
  return {
    type: FETCH_CURRENT_USER,
    payload: request
  };
}


/* ==== CREATE ENTRY ==== */


function determineTotalPoints(response) {
  var totalPoints = 0;
  var entries = response.data;

  for (var pos = 0; pos <= entries.length - 1; pos++ ) {
    if (entries[pos].outcome === "rejected") {
      totalPoints = totalPoints + 10;
    }
    else {
      totalPoints = totalPoints + 1;
    }
  }

  return totalPoints;
}

// this unique action creator makes both creates the post as well as recalculates the user's points
export function createEntry(props) {
  return (dispatch, getState) => {
      return axios.post(`${ROOT_URL}/entries`, props,
        {
          headers: { authorization: localStorage.getItem("token") }
        })
        .then((response) => { dispatch({ type: CREATE_ENTRY, payload: response }); })
          .then(() => axios.get(`${ROOT_URL}/entries`, { headers: { authorization: localStorage.getItem("token") } }))
          .then((entries) => determineTotalPoints(entries))
          .then((points) => axios.post(`${ROOT_URL}/users/points`, { points : points }, { headers: { authorization: localStorage.getItem("token") } }) )
          .then((response) => { dispatch({ type: SET_TOTAL_POINTS, payload: response }) });
      };

}


/* ==== DELETE ENTRY ==== */

export function deleteEntry(id) {
  return (dispatch, getState) => {
      return axios.delete(`${ROOT_URL}/entries/${id}`,
        {
          headers: { authorization: localStorage.getItem("token") }
        })
          .then(() => {
              dispatch(fetchEntries());
          })
          .then(() => axios.get(`${ROOT_URL}/entries`, { headers: { authorization: localStorage.getItem("token") } }))
          .then((entries) => determineTotalPoints(entries))
          .then((points) => axios.post(`${ROOT_URL}/users/points`, { points : points }, { headers: { authorization: localStorage.getItem("token") } }) )
          .then(() => {
              dispatch(longestStreak());
          })
          .then(() => {
            dispatch(fetchSortedUsers());
          })
      };
};

/* ==== AUTHENTICATION SIGN IN  ==== */

export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
          localStorage.setItem("token", response.data.token);
          dispatch({ type: AUTH_USER })
      })
      .catch(() => {
        // if request is bad
        // show error to the user
        dispatch(authError("Bad Login Info"));
      });
  }

}

/* ==== AUTHENTICATION SIGN UP  ==== */

export function signupUser({ name, email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { name, email, password })
      .then(response => {
          localStorage.setItem("token", response.data.token);
          dispatch({ type: AUTH_USER })
      })
      .catch((response) => {
        // if request is bad
        // show error to the user
        dispatch(authError(response.data.error));
      });
  }

}

/* ==== IF AUTHENTICATION ERROR ==== */

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

/* ==== SIGN OUT USER  ==== */

export function signoutUser() {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
}
