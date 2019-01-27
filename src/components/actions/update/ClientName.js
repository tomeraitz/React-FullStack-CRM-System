import React, { Component } from 'react';

class ClientName extends Component {
  constructor(){
    super()
    this.state = {
      input : "",
      users : []
    }
  }

  changeSatus =async (input) =>{
    await this.setState({input})
  }

  handleChange =async (event) =>{
    await this.changeSatus(event.target.value)
    let user =await this.props.filterUsers(this.state.input)

    if(this.state.input === "" ) {
      let users = []
      return await this.setState({users : users})
    }
    else{
      await this.setState({users : user})
    }
 
  }
  updatUser =async (id ,name) =>{
    let users = []
    await this.setState({input :name })
    await this.setState({users})
    await this.props.getUserDetails(id)
  }
  

  render() {
    return (
      <div className="clientName">
          <div className="clientNameHeader" >Client : </div>
          <input type="text" 
                    placeholder="Client Name" 
                    name="ClientName"
                    className="inputClietName"
                    value={this.state.input}
                    onChange={this.handleChange}>
          </input>
          <div className="searchUsers">
            {this.state.users.map(user =>{
              return <div onClick={()=>this.updatUser(user._id , user.name)}
                          key={user._id}>{user.name}</div>
            })}
          </div>
      </div>
    );
  }
}

export default ClientName
