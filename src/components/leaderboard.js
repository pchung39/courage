import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSortedUsers } from '../actions/index';


class Leaderboard extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchSortedUsers();
  }

  renderList() {
  var users = this.props.users

  return users.map((user) => {
  return (
      <li className="singleUser" key={user._id}>
        <p id="userName">{user.name}</p>
        <p id="userEntriesLength">{user.entries.length}</p>
      </li>
      );
    });
  }

  render() {
  return (
      <div className="leaderboardContainer">
        <p id="leaderboardTitle"> Leaderboard </p>
        <ul className="leaderboardList">
          {this.renderList()}
        </ul>
      </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    users: state.users.all
    };
  }


export default connect(mapStateToProps,{ fetchSortedUsers })(Leaderboard);
