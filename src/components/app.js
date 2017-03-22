import React, { Component } from 'react'
import EntriesIndex from './entries_index';
import EntriesMetadata from './entries_metadata';
//import ChartData from './chart';
import AppBarHeader from './header_bar';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBarHeader />
        <EntriesMetadata />
        <EntriesIndex />
      </div>
    );
  }
}
