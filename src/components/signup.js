import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactDOM from "react-dom";
import { reduxForm, Field, Form, reset } from "redux-form";
import { Link, Redirect } from 'react-router-dom';
import * as actions from "../actions";


class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  onSubmit = ({ email, password }) => {
    this.props.signupUser({ email, password });
  }

  render() {
    const { handleSubmit, reset } = this.props;

    if(this.props.authStatus == true) {
          return (
            <Redirect to="/me"/>
          )
        };

    return(
      <div>
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Sign Up!</h3>

        <div>
          <label><h3>Username</h3></label>
          <div>
            <Field name="email" component="input" type="text" />
          </div>
        </div>

        <div>
          <label><h3>Password</h3></label>
          <div>
            <Field name="password" component="input" type="password" />
          </div>
        </div>


        <button type="submit" className="btn btn-primary">Submit</button>
        <button><Link to="/me" className="btn btn-danger">Cancel</Link></button>
      </form>
    </div>
    )
  }
};

function validate(formProps) {
  const errors = {};
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = "Passwords must match";
  }

  return errors;
}

let signUpForm = reduxForm(
  { form: "signUpForm" }
)(SignUp);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
           authStatus: state.auth.authenticated }
}


export default connect(mapStateToProps, actions)(signUpForm);
