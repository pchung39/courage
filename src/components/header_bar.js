import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import DialogModal from './entry_modal';

class AppBarHeader extends Component {

  render() {
    return (
        <div>
        <AppBar
          title="Courage"
          iconElementRight={<DialogModal />}
          zDepth={3}
        />
      </div>
    );
    }
  }

export default AppBarHeader;
