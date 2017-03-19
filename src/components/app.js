import React, { Component } from 'react'
import EntriesList from './entries';
import Entry from './entry';
import VisibleEntries from '../containers/index';


export default class App extends Component {
  render() {
    return (
      <div>
        <VisibleEntries  />
      </div>
    );
  }
}
