import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import EntriesIndex from './components/entries_index';
import NewEntry from './components/new_entry';


export default(
  <Route path='/' component={App}>
    <IndexRoute component={NewEntry} />
    <IndexRoute component={EntriesIndex} />
  </Route>

)

// ":id" is replaced by this.props.params.id
