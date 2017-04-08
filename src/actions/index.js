import axios from 'axios';
import { browserHistory } from "react-router";
import { AUTH_USER,
        AUTH_ERROR,
        UNAUTH_USER
      } from "./types";

export const CREATE_ENTRY = 'CREATE_ENTRY';
export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRY = 'FETCH_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const FETCH_LONGEST = 'FETCH_LONGEST';
export const FETCH_TOTAL_POINTS = 'FETCH_TOTAL_POINTS';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const FETCH_USERS = "FETCH_USERS";

const ROOT_URL = 'http://localhost:3090/entries';
const AUTH_ROOT_URL = "http://localhost:3090";
const USERS_ROOT_URL = "http://localhost:3090/users";


export function longestStreak() {
  return (dispatch, getState) => {
      return fetch(`${ROOT_URL}`, { headers: { authorization: localStorage.getItem("token") } })
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
  const request = axios.get(`${ROOT_URL}`,
    {
      headers: { authorization: localStorage.getItem("token") }
    });
  return {
    type: FETCH_ENTRIES,
    payload: request
  };
}

export function fetchUsers() {
  const request = axios.get(`${USERS_ROOT_URL}`);
  return {
    type: FETCH_USERS,
    payload: request
  };
}

/*  THUNK FUNCTION: SORT USERS FOR LEADERBOARD */

function sortList (users) {
  //console.log("sorted list users: ", users);
    for (var first = 0; first < users.length; first++) {
      for (var second = 1; second < users.length; second++) {
        if (users[second].entries.length < users[first].entries.length) {
          var temp = users[second];
          users[second] = users[first];
          users[first] = temp;
        }
      };
    };
    console.log(users)
    return {
      type: FETCH_USERS,
      payload: users
    };

}



export function fetchSortedUsers() {
  return (dispatch, getState) => {
      return fetch(`${USERS_ROOT_URL}`)
          .then((response) => response.json())
          .then((response) => {
              dispatch(sortList(response));
          });
      };
};


export function createEntry(props) {
  const request = axios.post(`${ROOT_URL}`, props,
    {
      headers: { authorization: localStorage.getItem("token") }
    });
  console.log(props);
  return {
    type: CREATE_ENTRY,
    payload: request
  };
}


export function deleteEntry(id) {
  return (dispatch, getState) => {
      return axios.delete(`${ROOT_URL}/${id}`,
        {
          headers: { authorization: localStorage.getItem("token") }
        })
          .then(() => {
              dispatch(fetchEntries());
          });
      };
};



export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${AUTH_ROOT_URL}/signin`, { email, password })
      .then(response => {

          dispatch({ type: AUTH_USER })

          localStorage.setItem("token", response.data.token);

      })
      .catch(() => {
        // if request is bad
        // show error to the user
        dispatch(authError("Bad Login Info"));
      });
  }

}

export function signupUser({ name, email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${AUTH_ROOT_URL}/signup`, { name, email, password })
      .then(response => {

          dispatch({ type: AUTH_USER })

          localStorage.setItem("token", response.data.token);

      })
      .catch((response) => {
        // if request is bad
        // show error to the user
        dispatch(authError(response.data.error));
      });
  }

}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem("token");
  return { type: UNAUTH_USER };
}

// using JWT token for authenticated calls
export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${AUTH_ROOT_URL}/entries/test`, {
      headers: { authorization: localStorage.getItem("token") }
    })
    .then(response => console.log(response));
  }
}
