import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSortedUsers } from '../actions/index';
import Leaderboard from "../components/leaderboard";


class LeaderboardContainer extends Component {

  componentWillMount() {
    this.props.fetchSortedUsers();
  }

  render() {
    const { users } = this.props;
    return <Leaderboard users={users} />
  };
}

function mapStateToProps(state) {
  return {
    users: state.users.all
    };
  }


export default connect(mapStateToProps,{ fetchSortedUsers })(LeaderboardContainer);
