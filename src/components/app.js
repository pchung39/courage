import React, { Component } from 'react'
import EntriesIndex from '../components/entries_index';
import NewEntry from '../components/new_entry';
import EntriesMetadata from '../components/entries_metadata';

export default class App extends Component {
  render() {
    return (
      <div>
        <NewEntry />
        <EntriesMetadata />
        <EntriesIndex />
      </div>
    );
  }
}
