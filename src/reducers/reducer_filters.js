import { SET_VISIBILITY_FILTER } from '../actions/types';


const VisibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state
  }
}

export default VisibilityFilter
