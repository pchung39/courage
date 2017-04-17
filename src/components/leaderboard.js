import React from 'react';

const Leaderboard = ({ users }) => {
  let count = 0;

  let userPhotoGallery = {
    1 : <img className="userPhoto" src="http://pm1.narvii.com/6337/6f7cf6153494916fb8788431c81ce9938c453cc2_128.jpg" alt="k2-s0" />,
    2 : <img className="userPhoto" src="https://pbs.twimg.com/profile_images/718849712720384000/3Qo35wtx_400x400.jpg" alt="c3-p0" />,
    3 : <img className="userPhoto" src="http://pm1.narvii.com/6075/98142859c9a90737b4f970b77e738114798b3053_128.jpg" alt="ig-88"/>,
    4 : <img className="userPhoto" src="http://static.anakinworld.com/uploads/entries/square_large/stormtrooper-17715.jpg" alt="stormtrooper" />,
    5 : <img className="userPhoto" src="http://static.wixstatic.com/media/04985d_9c797d6b86be481193ef48756291e371.jpg_256" alt="r2-d2"/>,
  };

  const selectUserPhoto = () => {
    let randomChoice = Math.floor(Math.random() * 5) + 1;
    return userPhotoGallery[randomChoice];
  };

  const renderList = (count) => {
    return users.map((user) => {
      return (
          <div>
            <li className="singleUser" key={user._id}>
              {selectUserPhoto()}
              <div className="leaderboardInfo">
                <p id="userName">{user.name}</p>
                <p id="userEntriesLength">{user.points}</p>
              </div>
            </li>
          </div>
        );
      });
  }

  return (
      <div className="leaderboardContainer">
        <p id="leaderboardTitle"> Leaderboard </p>
        <hr id="leaderboardUnderline" />
        <ul className="leaderboardList">
          {renderList()}
        </ul>
      </div>
      );
  }


export default Leaderboard;
