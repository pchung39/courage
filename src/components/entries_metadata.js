import React, { Component } from 'react';
import { connect } from 'react-redux';
import { longestStreak } from '../actions/index';
import { bindActionCreators } from 'redux';


class EntriesMetadata extends Component {
  componentWillMount() {
    this.props.fetchLongest();
  }

  render() {
    return (
        <div>
          <h1>Longest Streak: {this.props.streak}</h1>
          <h1>Total Points: {this.props.points}</h1>
      </div>
    );
    }
  }

function mapStateToProps(state) {
  return {
    streak: state.streak.streak,
    points: state.points.points
  };
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
