import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchEntries } from "../actions/index";
import { Sparklines, SparklinesCurve } from 'react-sparklines';

class StreakChart extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount() {
    this.props.fetchEntries();
  };

  streakData() {
    var entries = this.props.entries;
    var newData = [];

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].outcome === "accepted") {
        newData.push( 0);
      } else {
        newData.push(1);
      }
    }

    return newData;
  }

  render() {
    return (
      <Sparklines data={this.streakData()}>
          <SparklinesCurve color="#253e56" />
      </Sparklines>
    );
    }
  }

const mapStateToProps = (state) => {
  return {
    entries: state.entries.all
  }
}

export default connect(mapStateToProps, { fetchEntries })(StreakChart);
