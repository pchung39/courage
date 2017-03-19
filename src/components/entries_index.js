import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEntries, fetchUserInfo } from '../actions/index';
import { Link } from 'react-router';

class EntriesIndex extends Component {
  componentWillMount() {
    //this.props.fetchEntries();
    this.props.fetchUserInfo();
    console.log(this.props.users.userinfo);
  }

  renderApprovedEntries() {
    var entries = this.props.entries
    var approved = this.returnApproved(entries);

    return approved.map((post) => {
      return (
        <li className="list-group-item approved-list" key={post._id}>
          <strong className="approved-ask">{post.ask}</strong>
          <p className="entry-askee">{post.askee}</p>
        </li>
      );
    });
  }

  renderRejectedEntries() {
    var entries = this.props.entries
    var rejected = this.returnRejected(entries);

    return rejected.map((post) => {
      return (
        <li className="list-group-item rejected-list" key={post._id}>
          <strong className="rejected-ask">{post.ask}</strong>
          <p className="entry-askee">{post.askee}</p>
        </li>
      );
    });
  }

  returnApproved(entries) {
    var approvedList = [];
    for(var x = 0; x < entries.length; x++) {
      if (entries[x].status === "Accepted") {
        approvedList.push(entries[x]);
      }
    }
    return approvedList;
  };

  returnRejected(entries) {
    var rejectedList = [];
    for(var x = 0; x < entries.length; x++) {
      if (entries[x].status == "Rejected") {
        rejectedList.push(entries[x]);
      }
    }
    return rejectedList;
  };

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
          New Entry
          </Link>
        </div>

        <div className="approved col-xs-6">
          <h3>Accepted</h3>
          <ul className="list-group">
            {this.renderApprovedEntries()}
          </ul>
      </div>

      <div className="rejected col-xs-6">
        <h3>Rejected</h3>
        <ul className="list-group">
          {this.renderRejectedEntries()}
        </ul>
    </div>

    </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchEntries: () => {dispatch(fetchEntries())},
    fetchUserInfo: () => {dispatch(fetchUserInfo())}
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesIndex);
