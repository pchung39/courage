import React, { Component } from 'react';
import { connect } from 'react-redux';
import { longestStreak } from '../actions/index';


class EntriesMetadata extends Component {
  componentWillMount() {
    this.props.longestStreak();
  }

  render() {
    return (
        <div>
      </div>
    );
    }
  }

function mapStateToProps(state) {
  return { streak: state.streak.streakInfo };
}

export default connect(mapStateToProps, { longestStreak })(EntriesMetadata);
