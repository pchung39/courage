import React, { Component } from 'react';
//import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions/index';
import Trend from 'react-trend';

class ChartData extends Component {

  componentWillMount() {
    this.props.getEntries();
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
      <div>
      <Trend
        smooth
        autoDraw
        autoDrawDuration={3000}
        autoDrawEasing="ease-out"
        data={this.determineChartData()}
        gradient={['#00c6ff', '#F0F', '#FF0']}
        radius={18.3}
        strokeWidth={1.3}
        strokeLinecap={'butt'}
      />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { entries: state.entries.all };
}

const mapDispatchToProps = (dispatch) => {
  return ({
    getEntries: () => {dispatch(fetchEntries())}
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartData);
