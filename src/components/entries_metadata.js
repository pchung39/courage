import React from 'react';


const EntriesMetadata = ({ points, streak }) => {

    return (
        <div className="metadataMain">
          <div className="statsTitle">
            <p id="userStatsTitle">Your Stats</p>
            <hr />
          </div>
          { points === 0 ? ( <div className="noMetadata">No Data to Show</div> ) : (
            <div>
              <div className="streakText">
                <i className="fa fa-bolt" aria-hidden="true"></i>
                <p className="metadataTitle">Longest Streak</p>
                <p className="metadataValue">{streak}</p>
              </div>
                <div className="pointsText">
                <i className="fa fa-hand-peace-o" aria-hidden="true"></i>
                <p className="metadataTitle">Total Points</p>
                <p className="metadataValue">{points}</p>
              </div>
            </div>
          ) }

        </div>
    );

}


export default EntriesMetadata;
