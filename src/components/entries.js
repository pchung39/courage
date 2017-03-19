import React, { PropTypes } from 'react';
import Entry from './entry';

const EntriesList = ({ entries }) => (
  <div className='col-xs-6'>
    <ul className='list-group'>
      {entries.map(entry =>
        <Entry
          key={entry._id}
          {...entry}
          />
        )}
    </ul>
  </div>
)

/*

EntriesList.propTypes = {
  Entries: PropTypes.arrayOf(PropTypes.shape({
    ask: PropTypes.string.isRequired,
    askee: PropTypes.string.isRequired
  }).isRequired).isRequired
}
*/

export default EntriesList
