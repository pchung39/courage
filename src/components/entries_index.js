import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries, deleteEntry } from '../actions/index';


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

  entryCard = (entries) => (
    <div className="cardContent">
      <h3>{entries.ask}</h3>
      <p>{entries.askee}</p>
      <p>{entries._id}</p>
      <p>{entries.category}</p>
      <button onClick={() => {this.props.deleteEntry(entries._id)}}>Delete</button>
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
      <div>
        <div className="cardContainer">
          <h3>Entries</h3>
          <ul className="cardList">
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

const mapDispatchToProps = (dispatch) => {
  return ({
    deleteEntry: (id) => {dispatch(deleteEntry(id))},
    fetchEntries: () => {dispatch(fetchEntries())}
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndex);
