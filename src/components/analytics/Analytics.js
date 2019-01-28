import React, { Component } from 'react';
import axios from 'axios'
import './analytics.css'

import Badges from './Badges';
import Charts from './Charts';

class Analytics extends Component {
    constructor(){
        super()
        this.state = {
            data : []
        }
    }

getDataAnalyticts = async () =>{
        let dataAnalyticts =await axios.get('/analytics')
        await this.setState({data : dataAnalyticts.data})
}

async componentDidMount(){
await this.getDataAnalyticts()

}
  render() {
    if(this.state.data.bestSeller){

    let bestSeller = this.state.data.bestSeller
    let newClients = this.state.data.newClients
    let emails = this.state.data.emails
    let outstandingClients = this.state.data.outstandingClients
    let bestCountries = this.state.data.bestCountries[0]
    let countries = Object.values(this.state.data.bestCountriesObj)
    let date = this.state.data.date
    let salesOfLast30Days = this.state.data.salesOfLast30Days
    let pieUsers = this.state.data.pieUsers

    return (
      <div className="analytics">
        <Badges newClients={newClients}
                emails={emails}
                outstandingClients={outstandingClients}
                bestCountries={bestCountries}
                date={date}/>

        <Charts bestSeller={bestSeller}
                countries={countries}
                salesOfLast30Days={salesOfLast30Days}
                pieUsers={pieUsers}/>
        
      </div>
    );
    }
    else{
      return <div></div>
    }
  }
}

export default Analytics
