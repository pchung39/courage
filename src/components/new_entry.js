import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { reduxForm, Field } from 'redux-form';
import { createEntry } from '../actions/index';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';


injectTapEventPlugin();

const style = {
  margin: 12,
};

class NewEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categories: null,
      outcome: null
    }

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };

  };

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    console.log(props);
    this.props.createEntry(props);
  }



  handleCategory = (event, index, value) => {
    this.setState({ categories: value });
  };

  handleRequestDelete = (key_id) => {
    var categoriesList = this.state.categories;
    const indexItem = categoriesList.indexOf(key_id);
    categoriesList.splice(indexItem, 1);
    this.setState({categories: [ ...categoriesList ]});
  }

  handleChange = (event, index, value) => this.setState({outcome: value });

  render () {
    const { fields: {askee, ask, status, category }, handleSubmit } = this.props;
    return (
        <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <div className="askee">
            <TextField
              {...askee}
              hintText="Who did you ask?"
              floatingLabelText="Askee"
              floatingLabelFixed={true} />
          </div>


          <div className="ask">
          <TextField
            {...ask}
            hintText="What did you ask?"
            floatingLabelText="Ask"
            multiLine={true}
            rows={1}
            floatingLabelFixed={true} />
        </div>

          <div className="status">
          <SelectField
            {...status}
            floatingLabelText="Outcome"
            floatingLabelFixed={true}
            value={this.state.outcome}
            onChange={this.handleChange}>
            <MenuItem value="Accepted" primaryText="Accepted" />
            <MenuItem value="Rejected" primaryText="Rejected" />
          </SelectField>
          </div>

          <div className="categories">
          <SelectField
            {...category}
            floatingLabelText="Choose Categories"
            floatingLabelFixed={true}
            value={this.state.categories}
            onChange={this.handleCategory}>
            <MenuItem value="Romance" primaryText="Romance" />
            <MenuItem value="Family" primaryText="Family" />
            <MenuItem value="Friends" primaryText="Friends" />
            <MenuItem value="Career" primaryText="Career" />
          </SelectField>
          </div>


          <RaisedButton label="Submit" type="submit" primary={true} style={style} />
        </form>
        </div>
    );
  }
}

export default reduxForm({
  form: 'PostsNewEntry',
  fields: ['askee', 'ask', 'status', 'category'],
}, null, { createEntry })(NewEntry);
