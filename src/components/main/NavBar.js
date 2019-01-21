import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './navbar.css'

class NavBar extends Component {
  constructor(){
    super()
    this.state ={
      active : window.location.href.replace('http://localhost:3000/','') || "clients"
      
    }
  }

  renderActiveTab(value){
      let activeTab = this.state.active
      if(activeTab === value){
        return "tab active"
      }
      else{
        return "tab"
      }
  }

  handelActive = (event) =>{
    let tab = event.currentTarget.textContent.toLowerCase()
    this.setState({active : tab})
  }

  

  render() {
    return (
      <div className="navBar">
        <div className={this.renderActiveTab("clients")}><Link to="/clients" onClick={this.handelActive}>Clients</Link></div>
        <div className={this.renderActiveTab("actions")}><Link to="/actions" onClick={this.handelActive}>Actions</Link></div>
        <div className={this.renderActiveTab("analytics")}><Link to="/analytics" onClick={this.handelActive}>Analytics</Link></div>
      </div>
    );
  }
}

export default NavBar
