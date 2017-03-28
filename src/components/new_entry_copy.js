import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { reduxForm, Field, Form } from "redux-form";
import { createEntry } from "../actions/index";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import injectTapEventPlugin from "react-tap-event-plugin";
import RaisedButton from "material-ui/RaisedButton";


injectTapEventPlugin();

const renderTextField = ({ input,label }) => (
    <TextField
      { ...input }
      hintText="Who did you ask?"
      floatingLabelText={ label }
      floatingLabelFixed={ true }
    />

);


class MaterialUiForm extends Component {

  constructor(props) {
      super(props)

      this.state = {
        outcome: "Select One",
        category: "Select One"
      };

  };

  componentWillMount() {
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({outcome: event.target.value});
  }

  test() {
    console.log(this.state.outcome);
  }

  renderSelectField = ({ input,label,children }) => (
      <SelectField
        { ...input }
        floatingLabelText={ label }
        floatingLabelFixed={ true }
        value={this.state.outcome}
        onChange={this.handleChange}>
        children={children}>
      </SelectField>

    )

  onSubmit(props) {
    console.log(props);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div className="ask">
          <Field name="ask" component={renderTextField} label="Ask" />
        </div>

        <div className="askee">
          <Field name="askee" component={renderTextField} label="Askee" />
        </div>

        <div className="outcome">
          <Field name="favoriteColor" component={this.renderSelectField} label="Favorite Color">
          <MenuItem value="RED" primaryText="Red"/>
          <MenuItem value="GREEN" primaryText="Green"/>
          <MenuItem value="BLUE" primaryText="Blue"/>
        </Field>
        </div>

        <RaisedButton label="Submit" type="submit" primary={true} />
      </form>
    )
  }
}

export default reduxForm({
  form: 'MaterialUiForm'  // a unique identifier for this form
})(MaterialUiForm)

/*
export default reduxForm({
  form: "PostsNewEntry"
}, null, { createEntry })(NewEntry);
*/
