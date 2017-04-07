import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries, deleteEntry } from '../actions/index';
import getVisibleEntries from '../containers/visible_entries';


const style = {
  maxWidth: 600,
};


class EntriesIndex extends Component {

  constructor(props) {
    super(props)
    this.props.deleteEntry.bind(this);
  };

  componentWillMount() {
    this.props.fetchEntries();
  }

  deleteEntry(entry_id) {
    console.log(entry_id);
    this.props.deleteEntry(entry_id);
  }

  convertDate(timestamp) {
    let date = new Date(timestamp);
    return date.toDateString();
  }

  entryCard = (entries) => (
    <div className="cardContent">
      <div className="deleteButton">
        <button id="deleteEntry" onClick={() => {this.props.deleteEntry(entries._id)}}>X</button>
      </div>
      <p id="timestamp">{this.convertDate(entries.timestamp)}</p>
      <h3 id="ask">{entries.ask}</h3>
      <p id="askee">{entries.askee}</p>
      <p id="category">{entries.category}</p>
    </div>
  );

  renderApprovedEntries() {
    var entries = this.props.entries

    return entries.map((post) => {
      return (
        <li className="singleCard" key={post._id}>
          {this.entryCard(post)}
        </li>
      );
    });
  }


  render() {
    return (
      <div className="topContainer">
        <div className="cardContainer">
          <ul className="cardList">
            {this.renderApprovedEntries()}
          </ul>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    entries: getVisibleEntries(state.entries.all, state.filter)
  }
}

/*
function mapStateToProps(state) {
  return {
    entries: state.entries.all  };
}
*/

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteEntry: (id) => {dispatch(deleteEntry(id))},
    fetchEntries: () => {dispatch(fetchEntries())}
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndex);
