import React, { Component } from 'react';
import { connect } from 'react-redux';
import { longestStreak } from '../actions/index';


class EntriesMetadata extends Component {
  componentWillMount() {
    this.props.fetchLongest();
  }

  render() {
    return (
        <div className="metadataMain">
          <h4 className="streakText">Longest Streak: {this.props.streak}</h4>
          <h1 className="pointsText">Total Points: {this.props.points}</h1>
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
