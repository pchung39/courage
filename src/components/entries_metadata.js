import React, { Component } from 'react';
import { connect } from 'react-redux';
import { longestStreak } from '../actions/index';


class EntriesMetadata extends Component {
  componentWillMount() {
    console.log("About to fetch more metadata")
    this.props.fetchLongest();
  }

  render() {
    return (
        <div className="metadataMain">
          <div className="statsTitle">
            <p id="userStatsTitle">Your Stats</p>
            <hr />
          </div>
          <div className="streakText">
            <i className="fa fa-bolt" aria-hidden="true"></i>
            <p className="metadataTitle">Longest Streak</p>
            <p className="metadataValue">{this.props.streak}</p>
          </div>
            <div className="pointsText">
            <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
            <p className="metadataTitle">Total Points</p>
            <p className="metadataValue">{this.props.points}</p>
          </div>
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
