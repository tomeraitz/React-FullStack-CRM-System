import React, { Component } from 'react';
import {ResponsiveContainer} from 'recharts';
import BestSeller from './BestSeller';
import Countries from './Countries';
import LineLastMonth from './LineLastMonth';
import PieAnalytics from './PieAnalytics';

class Charts extends Component {
    
  render() {

    let bestSeller = this.props.bestSeller
    let countries = this.props.countries
    let salesOfLast30Days = this.props.salesOfLast30Days
    let pieUsers = this.props.pieUsers
    return (
      <div className="charts">
        <BestSeller  bestSeller={bestSeller}/>
        <Countries  countries={countries} />
        <LineLastMonth salesOfLast30Days={salesOfLast30Days}/>
        <PieAnalytics pieUsers={pieUsers} />
      </div>
    );
  }
}

export default Charts
