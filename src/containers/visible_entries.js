import { connect } from 'react-redux';
import { fetchEntries } from '../actions/index';
import EntriesList from '../components/entries';


const getEntries = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_ENTRIES':
      return Object.assign({}, state, {
        entries: action.entries
      });
  }
}


const mapStateToProps = (state) => {
  return {
    entries: state.entries
  }
}

const VisibleEntries = connect(mapStateToProps, null)(EntriesList);

export default VisibleEntries;
