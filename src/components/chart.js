import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions/index';

class ChartData extends Component {

  componentWillMount() {
    this.props.fetchEntries();
  }

  determineChartData() {
    var entries = this.props.entries;
    var chartList = [];

    for (var pos = 0; pos <= entries.length - 1; pos++) {
      if (entries[pos].status == "Accepted") {
        chartList.push(0);
      }
      else {
        chartList.push(1);
      }
    };

    return chartList;
  }

  render() {
    return (
      <div className="well">
        <h2> Courage Metrics </h2>
        <Sparklines height={100} width={800} data={this.determineChartData()}>
          <SparklinesLine color="#253e56" />
        </Sparklines>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { entries: state.entries.all };
}

export default connect(mapStateToProps, { fetchEntries })(ChartData);
