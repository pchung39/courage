import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactDOM from "react-dom";
import { reduxForm, Field, Form, reset } from "redux-form";
import { Link } from 'react-router-dom';
import { createUser } from "../actions/index";


class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  onSubmit = (props) => {
    this.props.dispatch(createUser(props)).then(
      console.log(this.state)
    );
  }

  render() {
    const { handleSubmit, reset } = this.props;

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

let signUpForm = reduxForm(
  { form: "signUpForm" }
)(SignUp);


export default signUpForm;
