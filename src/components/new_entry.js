import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
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
      categories: []
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
    this.props.dispatch(createEntry(props));
  }

  state = {
    value: 1,
  };

  handleChange = (event, index, value) => {
    console.log(value);
    var categoriesList = this.state.categories;
    this.setState({ categories: [ ...categoriesList, {value} ] });
    this.handleCategories();
  };

  handleCategories = () => {
    console.log(this.state.categories);
  };

  renderChip(data) {
    return (
      <Chip
        style={this.styles.chip}
        key={this.state.categories.indexOf(data)}
      >
        {data.value}
      </Chip>
    );
  }

  render () {
    const { fields: {askee, ask, status }, handleSubmit } = this.props;
    return (
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
            value={this.state.value}
            onChange={this.handleChange}>
            <MenuItem value="Accepted" primaryText="Accepted" />
            <MenuItem value="Rejected" primaryText="Rejected" />
          </SelectField>
          </div>


          <div className="categories" style={this.styles.wrapper}>
            {this.state.categories.map(this.renderChip, this)}
          </div>

          <RaisedButton label="Submit" type="submit" primary={true} style={style} />
        </form>
    );
  }
}

export default reduxForm({
  form: 'PostsNewEntry',
  fields: ['askee', 'ask', 'status'],
}, null, { createEntry })(NewEntry);
