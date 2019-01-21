import React, { Component } from 'react';

class Transfer extends Component {
  constructor(){
    super()
    this.state = {
      owner : ""
    }
  }

  handleChangeSelect =async (event) =>{
    await this.setState({owner : event.target.value})
    
}

transfer = () =>{
  if(this.state.owner == ""){
    alert("Please choose a owner")
  }
  else{
    this.props.updateOwner({owner : this.state.owner})
  }
 
}


  render() {
    let ownerName = this.props.data
    let userObjTemp = {}

    return (
      <div className="transfer genralGrid">
          <div>Transfer ownership to : </div>
          <select className="SelctTransfer genralSelect" onChange={this.handleChangeSelect}>
          <option value="" disabled selected hidden>Owner Name</option>
              {ownerName.map(user =>{
                if(!userObjTemp[user.owner]){
                  userObjTemp[user.owner] = user.owner
                return <option value={user.owner} key={user._id}>{user.owner}</option>
              }
              })}
            </select>
          <div className="clickTransfer genralButton" onClick={this.transfer}>TRANSFER</div>
      </div>
    );
  }
}

export default Transfer
