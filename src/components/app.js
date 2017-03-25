import React, { Component } from 'react'
import EntriesIndex from '../components/entries_index';
import EntriesMetadata from '../components/entries_metadata';
import AppBarHeader from './header_bar';
import NewEntry from './new_entry';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path='/' render={() => (
          <div>
            <AppBarHeader />
            <EntriesMetadata />
            <EntriesIndex />
          </div>
        )} />
        <Route path='/new' render={() => (
          <div>
            <AppBarHeader />
            <NewEntry />
          </div>
        )} />
        </div>
      </Router>
    );
  }
}
