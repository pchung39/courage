import React from 'react';
import VisibilityFilter from "./visibility_filters";
import { Link } from 'react-router-dom';

const EntriesIndex = ({ entries, deleteEntry }) => {

  const convertDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toDateString();
  };

  const outcomeColor = (outcome) => {
    if (outcome === "accepted") {
      return <p id="outcome-accepted">ACCEPTED</p>
    }
    else {
      return <p id="outcome-rejected">REJECTED</p>
    }
  };

  const categoryColor = (category) => {
    if (category === "romance") {
      return <p id="category-romance">{category}</p>
    }
    if (category === "family") {
       return <p id="category-family">{category}</p>
    }
    if (category === "friends") {
       return <p id="category-friends">{category}</p>
    }
    if (category === "career") {
      return <p id="category-career">{category}</p>
    }
  }

  const entryCard = (entry) => (
    <div className="cardContent">
      <div className="cardMetadata">
        {outcomeColor(entry.outcome)}
        <p id="timestamp">{convertDate(entry.timestamp)}</p>
        <h3 id="ask">{entry.ask}</h3>
        <p id="askee">{entry.askee}</p>
        {categoryColor(entry.category)}
      </div>
      <div className="deleteButton">
        <i className="fa fa-trash" aria-hidden="true" onClick={() => deleteEntry(entry._id)}></i>
      </div>
    </div>
  );

  const renderApprovedEntries = () => {

    return entries.map((entry) => {
      return (
        <li className="singleCard" key={entry._id}>
          {entryCard(entry)}
        </li>
      );
    });
  }

    return (
        <div className="topContainer">
          <VisibilityFilter />
          { entries.length ?
          <div className="cardContainer">
            <ul className="cardList">
              {renderApprovedEntries()}
            </ul>
        </div> :
          <div>
            <h1 id="noEntries">No Entries Found</h1>
            <h1 id="newEntryLink"><Link to="/new">Create one!</Link></h1>
          </div>
            }
      </div>

    );
}

export default EntriesIndex;
