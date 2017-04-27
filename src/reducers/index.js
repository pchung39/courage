import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EntriesReducer from './reducer_entries';
import StreakReducer from './reducer_streak';
import PointsReducer from './reducer_points';
import VisibilityFilter from './reducer_filters';
import AuthReducer from "./reducer_auth";
import UsersReducer from "./reducer_users";

const rootReducer = combineReducers({
  entries: EntriesReducer,
  form: formReducer,
  streak: StreakReducer,
  points: PointsReducer,
  filter: VisibilityFilter,
  auth: AuthReducer,
  users: UsersReducer
});

export default rootReducer;
