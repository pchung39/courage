import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import ReactDOM from "react-dom";
import { bindActionCreators } from 'redux';
import { reduxForm, Field, Form, reset } from "redux-form";
import { createEntry } from "../actions/index";
import { Link } from 'react-router-dom';

class NewEntry extends Component {
  constructor(props) {
    super(props)
  };

  onSubmit(props) {
    console.log(props);
    this.props.dispatch(createEntry(props));
  }

  render() {
    const { handleSubmit, reset } = this.props;
    return(
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Create a New Post</h3>

        <div>
          <label><h3>Ask</h3></label>
          <div>
            <Field name="ask" component="input" type="text" placeholder="What did you ask?"/>
          </div>
        </div>

        <div>
          <label><h3>Askee</h3></label>
          <div>
            <Field name="askee" component="input" type="text" placeholder="Who did you ask?"/>
          </div>
        </div>

        <div>
        <label><h3>Outcome</h3></label>
        <div>
          <Field name="outcome" component="select">
            <option></option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Field>
        </div>
      </div>

      <div>
      <label><h3>Category</h3></label>
      <div>
        <Field name="category" component="select">
          <option></option>
          <option value="romance">Romance</option>
          <option value="family">Family</option>
          <option value="friends">Friends</option>
          <option value="career">Career</option>
        </Field>
      </div>
    </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <button><Link to="/" className="btn btn-danger">Cancel</Link></button>
      </form>
    );
  };

}


let EntryForm = reduxForm(
  { form: "newEntryForm" }
)(NewEntry);


export default EntryForm;
