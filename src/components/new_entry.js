import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm } from 'redux-form';
import { createEntry } from '../actions/index';


class NewEntry extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log(props);
    this.props.createEntry(props);
    this.context.router.push('/');
  }

  render () {
    const { fields: {askee, ask, status}, handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Add a New Entry</h2>
          <div className="row">
          <div className="form-group col-md-6">
              <label>Askee</label>
              <input type="text" className="form-control" {...askee} />
          </div>
        </div>
          <div className="row">
          <div className="form-group col-md-6">
              <label>Ask</label>
              <textarea className="form-control" {...ask} rows="3"></textarea>
          </div>
        </div>

          <div className="row">
          <div className="form-group col-md-3">
            <label>Outcome</label>
            <select className="form-control" {...status}>
              <option>Accepted</option>
              <option>Rejected</option>
            </select>
          </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewEntry',
  fields: ['askee', 'ask', 'status'],
}, null, { createEntry })(NewEntry);
