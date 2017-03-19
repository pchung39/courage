import React, { PropTypes } from 'react';

const Entry = ({ ask, askee }) => (
  <li className="list-group-item">
    <strong>{ask}</strong>
    <p>{askee}</p>
  </li>
)

Entry.propTypes = {
  ask = PropTypes.string.isRequired,
  askee = PropTypes.string.isRequired
}

export default Entry
