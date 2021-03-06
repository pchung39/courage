import React, { Component } from "react";
import { connect } from "react-redux";
import EntriesContainer from "../containers/entries_list";
import EntriesStatsContanier from "../containers/entries_stats";
import AppBarHeader from "./header_bar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NewEntry from "./new_entry";
import Landing from "./landing_page";
import SignUp from "./signup";
import SignIn from "./signin";
import LeaderboardContainer from "../containers/leaderboard_container";
import ChartContainer from "../containers/chart_container";

class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" render={ () => (
          <div>
            <Landing />
          </div>
        )} />

        <Route exact path="/me" render={(props) => (
          this.props.authStatus ?
          (<div className="mainContainer">
            <AppBarHeader />
              <LeaderboardContainer />
                <div className="metadataContainer">
                  <EntriesStatsContanier />
                    { this.props.entries.length > 0 &&
                      <ChartContainer />
                    }
                </div>
              <EntriesContainer />
            </div>) :
          ( <Redirect to="/signin" /> )
        )} />

        <Route exact path="/new" render={(props) => (
          this.props.authStatus ?
          (<div>
            <AppBarHeader />
            <NewEntry />
          </div>) :
          ( <Redirect to="/signin"/> )
        )} />

        <Route exact path="/signup" render={() => (
          <div>
            <AppBarHeader />
            <SignUp />
          </div>
        )} />

        <Route exact path="/signin" render={() => (
          <div>
            <AppBarHeader />
            <SignIn />
          </div>
        )} />

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    authStatus: state.auth.authenticated,
    entries: state.entries.all
  }
}

export default connect(mapStateToProps, null)(App);
