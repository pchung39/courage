import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DialogModal from './entry_modal';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewEntry from './new_entry';

const style = {
  margin: 12,
};

class AppBarHeader extends Component {

  render() {
    return (
      <div>
        <AppBar
          title="Courage"
          iconElementRight={<RaisedButton label="New Entry" style={style} containerElement={<Link to="/new"/>} />}
          zDepth={3}
        />
      </div>
    );
    }
  }

export default AppBarHeader;
