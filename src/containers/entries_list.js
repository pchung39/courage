import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries, deleteEntry } from '../actions/index';
import getVisibleEntries from './visible_entries';
import EntriesIndex from "../components/entries_index";


class EntriesContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchEntries();
  }

  render() {
    const { entries, deleteEntry } = this.props;
    return <EntriesIndex entries={entries} deleteEntry={deleteEntry} />
  }

}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    entries: getVisibleEntries(state.entries.all, state.filter),
    authStatus: state.auth.authenticated
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    deleteEntry: (id) => {dispatch(deleteEntry(id))},
    fetchEntries: () => {dispatch(fetchEntries())}
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesContainer);