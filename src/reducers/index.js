import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import StreakReducer from './reducer_streak';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  entries: PostsReducer,
  form: formReducer,
  streak: StreakReducer,
});

export default rootReducer;
