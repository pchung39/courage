import React, { Component } from 'react';
import { connect } from "react-redux";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { signoutUser } from "../actions/index";


class AppBarHeader extends Component {
  constructor(props) {
    super(props)
  };

  signOut() {
    console.log("User signed out");
    this.props.signoutUser();
  };

  render() {
    return (
        <header className="headerBar">
          <div className="head">
            <h1 className="titleLetter1">C</h1>
            <h1 className="titleLetter2">O</h1>
            <h1 className="titleLetter3">U</h1>
            <h1 className="titleLetter4">R</h1>
            <h1 className="titleLetter5">A</h1>
            <h1 className="titleLetter6">G</h1>
            <h1 className="titleLetter7">E</h1>
          </div>
          <br />
          <div className="signout">
            <button onClick={ this.signOut.bind(this) } >Sign Out</button>
          </div>
        </header>

    );
    }
  }

export default connect(null, { signoutUser })(AppBarHeader);
