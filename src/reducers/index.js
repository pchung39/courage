import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import StreakReducer from './reducer_streak';
import PointsReducer from './reducer_points';
import { reducer as formReducer } from 'redux-form';
import VisibilityFilter from './reducer_filters';
import AuthReducer from "./reducer_auth";
import UsersReducer from "./reducer_users";

const rootReducer = combineReducers({
  entries: PostsReducer,
  form: formReducer,
  streak: StreakReducer,
  points: PointsReducer,
  filter: VisibilityFilter,
  auth: AuthReducer,
  users: UsersReducer
});

export default rootReducer;
