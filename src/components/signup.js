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

  onSubmit = ({ name, email, password }) => {
    console.log({name,email,password});
    this.props.signupUser({ name, email, password });
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
      <form className="signupForm" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3 className="formTitle">Sign Up</h3>
        <hr className="underline"/>
        <div className="inputDiv">
          <label id="nameLabel"><p>Name</p></label>
          <div>
            <Field className="name" name="name" component="input" type="text" />
          </div>
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


let signUpForm = reduxForm(
  { form: "signUpForm" }
)(SignUp);

function mapStateToProps(state) {
  return { errorMessage: state.auth.error,
           authStatus: state.auth.authenticated }
}


export default connect(mapStateToProps, actions)(signUpForm);
