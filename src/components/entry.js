import React, { PropTypes } from 'react';

const Entry = ({ entry_data }) => (
  <li className="list-group-item">
    <strong>{entry_data.ask}</strong>
    <p>{entry_data.askee}</p>
  </li>
)

/*
Entry.propTypes = {
  ask: PropTypes.string.isRequired,
  askee: PropTypes.string.isRequired
}
*/

export default Entry
