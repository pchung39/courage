import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createEntry } from '../actions/index';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {blue300, indigo900} from 'material-ui/styles/colors';

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

  appendCategory = (event, index, value) => {
    var categoriesList = this.state.categories;
    this.setState({ categories: [ ...categoriesList, {"id": ++this.state.categories.length, "value": {value}} ]});
  };

  handleRequestDelete = (key_id) => {
    var categoriesList = this.state.categories;
    const indexItem = categoriesList.indexOf(key_id);
    categoriesList.splice(indexItem, 1);
    this.setState({categories: [ ...categoriesList ]});
  }

  renderChip(data) {
    return (
      <Chip
        style={this.styles.chip}
        key={data.id}
        onRequestDelete={() => this.handleRequestDelete(data.id)} >
        <Avatar size={32} color={blue300} backgroundColor={indigo900} >A</Avatar>
        {data.value.value}
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

          <div className="categories">
          <SelectField
            {...status}
            floatingLabelText="Choose Categories"
            floatingLabelFixed={true}
            value={this.state.value}
            onChange={this.appendCategory}>
            <MenuItem value="Romance" primaryText="Romance" />
            <MenuItem value="Family" primaryText="Family" />
            <MenuItem value="Friends" primaryText="Friends" />
            <MenuItem value="Career" primaryText="Career" />
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
