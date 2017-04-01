import React, { Component } from "react"
import EntriesIndex from "../components/entries_index";
import EntriesMetadata from "../components/entries_metadata";
import AppBarHeader from "./header_bar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewEntry from "../components/new_entry";
import Landing from "../components/landing_page";
import VisibilityFilter from "../components/visibility_filters";

export default class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" render={ () => (
          <div>
            <Landing />
          </div>
        )} />
        <Route exact path="/me" render={() => (
          <div className="mainContainer">
            <AppBarHeader />
            <VisibilityFilter />
            <div className="combinedData">
              <EntriesMetadata />
              <EntriesIndex />
            </div>
          </div>
        )} />
        <Route exact path="/new" render={() => (
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
