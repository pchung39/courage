import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
