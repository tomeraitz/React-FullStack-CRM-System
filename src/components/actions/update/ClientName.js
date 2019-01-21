import React, { Component } from 'react';

class ClientName extends Component {
  constructor(){
    super()
    this.state = {
      input : ""
    }
  }

  changeSatus = (input) =>{
    this.setState({input})
  }

  handleChange =async (event) =>{
    await this.changeSatus(event.target.value)
    let user =await this.props.filterUsers(this.state.input)
    this.props.getUserDetails(user)
  }

  render() {
    return (
      <div className="clientName">
          <div className="clientNameHeader" >Client : </div>
          <input type="text" 
                    placeholder="Client Name" 
                    name="ClientName"
                    className="inputClietName"
                    onChange={this.handleChange}>
          </input>
            
      </div>
    );
  }
}

export default ClientName
