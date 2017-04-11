import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSortedUsers } from '../actions/index';


class Leaderboard extends Component {
  constructor(props) {
    super(props)
  }

  count = 0;

  componentWillMount() {
    this.props.fetchSortedUsers();
  }

  userPhotoGallery = {
    1 : <img className="userPhoto" src="http://pm1.narvii.com/6337/6f7cf6153494916fb8788431c81ce9938c453cc2_128.jpg" />,
    2 : <img className="userPhoto" src="https://pbs.twimg.com/profile_images/718849712720384000/3Qo35wtx_400x400.jpg" />,
    3 : <img className="userPhoto" src="http://pm1.narvii.com/6075/98142859c9a90737b4f970b77e738114798b3053_128.jpg" />,
    4 : <img className="userPhoto" src="http://static.anakinworld.com/uploads/entries/square_large/stormtrooper-17715.jpg" />,
    5 : <img className="userPhoto" src="http://static.wixstatic.com/media/04985d_9c797d6b86be481193ef48756291e371.jpg_256" />,
  }

  selectUserPhoto() {
    let randomChoice = Math.floor(Math.random() * 5) + 1;
    return this.userPhotoGallery[randomChoice];
  }

  renderList(count) {
  var users = this.props.users
  return users.map((user) => {
  return (
      <div>
      <li className="singleUser" key={user._id}>
        {this.selectUserPhoto()}
        <div className="leaderboardInfo">
          <p id="userName">{user.name}</p>
          <p id="userEntriesLength">{user.entries.length}</p>
        </div>
      </li>
      </div>
      );
    });
  }

  render() {
  return (
      <div className="leaderboardContainer">
        <p id="leaderboardTitle"> Leaderboard </p>
        <hr id="leaderboardUnderline" />
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
