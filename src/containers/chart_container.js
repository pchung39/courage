import React, { Component } from 'react';
import { connect } from 'react-redux';
import StreakChart from "../components/charts";
import { fetchEntries } from "../actions/index";


class ChartContainer extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount() {
    this.props.fetchEntries();
  };

  render() {
    const { entries } = this.props;
    return <StreakChart entries={entries} />
    }
  }

const mapStateToProps = (state) => {
  return {
    entries: state.entries.all
  }
}

export default connect(mapStateToProps, { fetchEntries })(ChartContainer);
