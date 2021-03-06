import React, { Component } from 'react';
import ClientName from './ClientName';
import Transfer from './Transfer';
import Send from './Send';
import './update.css';
import Declare from './Declare';


class Update extends Component {
  constructor(){
    super()
    this.state ={
      id : "",
      owner : "",
      emailtype : "",
      sold : false
    }
  }
  render() {
    return (
      <div className="updateAction">
          <h1 className="updateHeader">UPDATE</h1>
         <ClientName data={this.props.data}
                     filterUsers={this.props.filterUsers}
                     getUserDetails={this.props.getUserDetails}
          />
         <Transfer data={this.props.data} updateUserProprty={this.props.updateUserProprty} />
         <Send data={this.props.data} updateUserProprty={this.props.updateUserProprty}/>
         <Declare updateUserProprty={this.props.updateUserProprty}/>
      </div>
    );
  }
}

export default Update
