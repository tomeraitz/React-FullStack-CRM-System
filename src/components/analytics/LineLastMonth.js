import React, { Component } from 'react';
import {XAxis, YAxis, CartesianGrid,LineChart,Line,ResponsiveContainer} from 'recharts';

class LineLastMonth extends Component {
  render() {
      let salesOfLast30Days = this.props.salesOfLast30Days
    return (
      <div className="LineLastMonth">
      <div className="chaertTitle">Sales from last 30 days</div>
      <ResponsiveContainer> 
            <LineChart data={salesOfLast30Days}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="dateForChart"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Line type="monotone" dataKey="counter" stroke="#fa8d7a" />
            </LineChart>
    </ResponsiveContainer>
      </div>
    );
  }
}

export default LineLastMonth
