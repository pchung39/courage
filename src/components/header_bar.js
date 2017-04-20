import React, { Component } from 'react';
import { connect } from "react-redux";
import { signoutUser, fetchCurrentUser } from "../actions/index";


class AppBarHeader extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount() {
    this.props.fetchCurrentUser();
  }

  signOut() {
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

          { this.props.authStatus === true &&
            <div className="headerActions">
              <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              <p className="userName">{this.props.currentUser}</p>
              <a href="/new"><i className="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a>
              <a href="#"><i className="fa fa-sign-out fa-1x" aria-hidden="true" onClick={ this.signOut.bind(this) }></i></a>
            </div> }
        </header>

    );
    }
  }

function mapStateToProps(state) {
  return {
    authStatus: state.auth.authenticated,
    currentUser: state.users.current
  };
}

export default connect(mapStateToProps, { signoutUser, fetchCurrentUser })(AppBarHeader);
