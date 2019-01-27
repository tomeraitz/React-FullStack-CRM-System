import React, { Component } from 'react';
import {XAxis, YAxis, CartesianGrid,ComposedChart,Bar,ResponsiveContainer} from 'recharts';

class BestSeller extends Component {
  render() {
      let bestSeller = this.props.bestSeller
    return (
      <div className="BestSeller">
      <div className="chaertTitle">Top Employees</div>
      <ResponsiveContainer> 
        <ComposedChart layout="vertical" 
                        data={bestSeller}
                        margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid stroke='#f5f5f5'/> 
              <XAxis type="number"/>
              <YAxis dataKey="name" type="category"/>
              <Bar dataKey="counter" barSize={20} fill='#413ea0'/>
        </ComposedChart> 
    </ResponsiveContainer>
      </div>
    );
  }
}

export default BestSeller
