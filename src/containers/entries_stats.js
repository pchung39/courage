import React, { Component } from 'react';
import { connect } from 'react-redux';
import { longestStreak } from '../actions/index';
import EntriesMetadata from "../components/entries_metadata";


class EntriesStatsContanier extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchLongest();
  }

  render() {
    const { points, streak } = this.props;
    return <EntriesMetadata points={points} streak={streak} />
  }
};



function mapStateToProps(state) {
  return {
    streak: state.streak.streak,
    points: state.points.points
  };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchLongest: () => {dispatch(longestStreak())}
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(EntriesStatsContanier);
