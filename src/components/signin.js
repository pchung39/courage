import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field, Form, reset } from "redux-form";
import { Link } from 'react-router-dom';
import { checkUser } from "../actions/index";


class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {}
    }

    }

  onSubmit = (props) => {
    // dispatch to find user, if success route to /me, else display error
    this.props.dispatch(checkUser(props));
  }

  render() {
    const { handleSubmit, reset } = this.props;

    return(
      <div>
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Sign In!</h3>

        <div>
          <label><h3>Username</h3></label>
          <div>
            <Field name="username" component="input" type="text" />
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


let signInForm = reduxForm(
  { form: "signInForm" })(SignIn);


export default signInForm;
