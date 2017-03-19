import React, { Component } from 'react'
import EntriesList from './entries';
import Entry from './entry';
import VisibleEntries from '../containers/visible_entries';
import NewEntry from './new_entry';


export default class App extends Component {
  render() {
    return (
      <div>
        <NewEntry />
        <VisibleEntries  />
      </div>
    );
  }
}
