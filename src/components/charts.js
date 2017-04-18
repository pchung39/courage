import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const StreakChart = ({ entries }) => {

  let streakData = () => {
    let newData = []

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].outcome === "accepted") {
        newData.push({ outcome: 0 });
      } else {
        newData.push({ outcome: 1 });
      }
    }

    return newData;
  }

    return (
          <div className="graphContainer">
            <div id="yaxis">
              <p id="yaxis-accepted">Accepted</p>
              <p id="yaxis-rejected">Rejected</p>
            </div>
            <div id="xaxis">
              <LineChart width={1000} height={300} data={streakData()}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
               <XAxis hide="true" />
               <YAxis hide="true"/>
               <CartesianGrid strokeDasharray="3 3"/>
               <Line type="monotone" dataKey="outcome" stroke="#8884d8" activeDot={{r: 8}}/>
              </LineChart>
              <div id="xaxisLabel">
                <p>Entries</p>
              </div>
            </div>
          </div>
    );
  };


export default StreakChart;
