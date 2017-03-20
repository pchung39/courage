import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import StreakReducer from './reducer_streak';
import PointsReducer from './reducer_points';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entries: PostsReducer,
  form: formReducer,
  streak: StreakReducer,
  points: PointsReducer
});

export default rootReducer;
