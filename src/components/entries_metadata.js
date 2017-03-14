import React, { Component } from 'react';
import { connect } from 'react-redux';
import { longestStreak } from '../actions/index';
import { bindActionCreators } from 'redux';


class EntriesMetadata extends Component {
  componentWillMount() {
    console.log("Longest Streak Fired");
    this.props.fetchLongest();
  }

  render() {
    return (
        <div>
          <h1>{this.props.streak.streak}</h1>
      </div>
    );
    }
  }

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchLongest: () => {dispatch(longestStreak())}
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntriesMetadata);
