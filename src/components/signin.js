import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field, Form, reset } from "redux-form";
import { Link, Redirect } from 'react-router-dom';
import * as actions from "../actions";


class SignIn extends Component {
  constructor(props) {
    super(props)

  }


  onSubmit = ({ email,password }) => {
    this.props.signinUser({ email, password });
  }


  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="signin-alert">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, reset } = this.props;

    if(this.props.authStatus == true) {
          return (
            <Redirect to="/me"/>
          )
        };


    return(
      <div className="formContainer">
      <form className="signinForm" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3 className="formTitle">Sign In</h3>
        <hr className="underline" />
        <div>
        {this.renderAlert()}
        </div>

        <div className="inputDiv">
          <label className="emailLabel"><p>Email</p></label>
          <div>
            <Field className="email" name="email" component="input" type="text" />
          </div>
        </div>

        <div className="inputDiv">
          <label className="passwordLabel"><p>Password</p></label>
          <div>
            <Field className="password" name="password" component="input" type="password" />
          </div>
        </div>

        <button type="submit" className="submitButton">Submit</button>
        <button className="cancelButton"><Link to="/me">Cancel</Link></button>
      </form>

    </div>
    )
  }
};



let signInForm = reduxForm(
  { form: "signInForm" })(SignIn);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
           authStatus: state.auth.authenticated }
}

export default connect( mapStateToProps, actions )(signInForm);
