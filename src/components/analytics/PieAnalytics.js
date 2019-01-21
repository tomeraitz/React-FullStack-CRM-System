import React, { Component } from 'react';
import {PieChart, Pie,ResponsiveContainer} from 'recharts';

class PieAnalytics extends Component {
  render() {
      let pieUsers = this.props.pieUsers.data
    return (
      <div className="pie">
      <div className="pieTitle">Client Acquisition</div>
      <ResponsiveContainer> 
        <PieChart>
            <Pie data={pieUsers} fill="#8884d8" label/>
        </PieChart>
    </ResponsiveContainer>
      </div>
    );
  }
}

export default PieAnalytics
