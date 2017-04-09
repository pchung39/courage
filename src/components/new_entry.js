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
      <div className="formContainer">
      <form className="entryForm" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3 className="formTitle">Add to Your Courage</h3>
        <hr className="underline" />

        <div className="inputDiv">
          <label className="askLabel"><p>Ask</p></label>
          <div>
            <Field className="ask" name="ask" component="input" type="text" placeholder="What did you ask?"/>
          </div>
        </div>

        <div className="inputDiv">
          <label className="askeeLabel"><p>Askee</p></label>
          <div>
            <Field className="askee" name="askee" component="input" type="text" placeholder="Who did you ask?"/>
          </div>
        </div>

        <div>
        <label className="outcomeLabel"><p>Outcome</p></label>
        <div>
          <Field className="outcome" name="outcome" component="select">
            <option></option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Field>
        </div>
      </div>

      <div>
      <label className="categoryLabel"><p>Category</p></label>
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

        <button type="submit" className="submitButton">Submit</button>
        <button className="cancelButton"><Link to="/me">Cancel</Link></button>
      </form>
    </div>
    );
  };

}


let EntryForm = reduxForm(
  { form: "newEntryForm" }
)(NewEntry);


export default EntryForm;
