import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchEntries } from "../actions/index";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

class StreakChart extends Component {
  constructor(props) {
    super(props)
  };

  componentWillMount() {
    this.props.fetchEntries();
  };

  streakData() {
    var entries = this.props.entries;
    var newData = []

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].outcome === "accepted") {
        newData.push({ outcome: 0 });
      } else {
        newData.push({ outcome: 1 });
      }
    }

    console.log(newData);
    return newData;
  }

  render() {
    return (
      <div className="graphContainer">
        <div id="yaxis">
          <p id="yaxis-accepted">Accepted</p>
          <p id="yaxis-rejected">Rejected</p>
        </div>
        <div id="xaxis">
          <LineChart width={1000} height={300} data={this.streakData()}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis />
           <YAxis />
           <CartesianGrid strokeDasharray="3 3"/>
           <Line type="monotone" dataKey="outcome" stroke="#8884d8" activeDot={{r: 8}}/>
          </LineChart>
          <div id="xaxisLabel">
            <p>Entries</p>
          </div>
        </div>
      </div>
    );
    }
  }

const mapStateToProps = (state) => {
  return {
    entries: state.entries.all
  }
}

export default connect(mapStateToProps, { fetchEntries })(StreakChart);
