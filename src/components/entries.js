import React, { PropTypes } from 'react';
import Entry from './Entry';

const EntriesList = ({ Entries }) => (
  <div className='col-xs-6'>
    <ul className='list-group'>
      {Entries.map(entry =>
        <Entry
          key={entry._id}
          {entry.ask}
          {entry.askee}
          />
        )}
    </ul>
  </div>
)

EntriesList.propTypes = {
  Entries: PropTypes.arrayof(PropTypes.shape({
    ask = PropTypes.string.isRequired,
    askee = PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default EntriesList
