import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions/index';
import EntriesList from '../components/entries';


class VisibleEntries extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchEntries();
  }

  render() {
    return (
      <div>
        <p>{this.props.entries[0].ask}</p>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    entries: state.entries.entries
  };
}

/*
const mapDispatchToProps = (dispatch) => {
  return ({
    getEntries: () => {dispatch(fetchEntries())}
  });
}
*/

export default connect(mapStateToProps, { fetchEntries })(VisibleEntries);
