import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions/index';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
  maxWidth: 600,
};


class EntriesIndex extends Component {
  componentWillMount() {
    this.props.fetchEntries();
  }

  CardExampleExpandable = (entries) => (
    <Card style={style}>
      <CardHeader
        title={entries.ask}
        subtitle={entries.askee}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardActions>
        <FlatButton label="Delete" />
      </CardActions>
      <CardText expandable={true}>
        This an ask. Ask some more!
      </CardText>
    </Card>
  );

  renderApprovedEntries() {
    var entries = this.props.entries

    return entries.map((post) => {
      return (
        <li className="list-group-item approved-list" key={post._id}>
          {this.CardExampleExpandable(post)}
        </li>
      );
    });
  }


  render() {
    return (
      <div>
        <div className="entries_list">
          <h3>Entries</h3>
          <ul className="list-group">
            {this.renderApprovedEntries()}
          </ul>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { entries: state.entries.all };
}

export default connect(mapStateToProps, { fetchEntries })(EntriesIndex);
