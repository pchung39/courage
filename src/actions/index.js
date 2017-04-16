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


export function fetchSortedUsers() {
  return (dispatch, getState) => {
      return fetch(`${USERS_ROOT_URL}`)
          .then((response) => response.json())
          .then((response) => {
              var sortedList = quickSort(response);
              dispatch({
                type: FETCH_USERS,
                payload: sortedList.reverse().slice(0,5)
              });
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
          })
          .then(() => {
              dispatch(longestStreak());
          });
      };
};



export function signinUser({ email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${AUTH_ROOT_URL}/signin`, { email, password })
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

export function signupUser({ name, email, password }) {
  return function(dispatch) {
    // submit email/password to the server
    axios.post(`${AUTH_ROOT_URL}/signup`, { name, email, password })
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
