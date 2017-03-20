import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { createEntry } from '../actions/index';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class NewEntry extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log(props);
    this.props.createEntry(props);
  }

  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render () {
    const { fields: {askee, ask, status}, handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h2>Add a New Entry</h2>
          <div className="row">
          <TextField
            {...askee}
            hintText="Who did you ask?"
            floatingLabelText="Askee"
          />
        </div>
          <div className="row">
          <TextField
            {...ask}
            hintText="What did you ask?"
            floatingLabelText="Ask"
            multiLine={true}
            rows={2}
          />
        </div>
          <div className="row">
          <SelectField
            {...status}
            floatingLabelText="Outcome"
            value={this.state.value}
            onChange={this.handleChange}>

            <MenuItem value={1} primaryText="Accepted" />
            <MenuItem value={2} primaryText="Rejected" />
          </SelectField>
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
