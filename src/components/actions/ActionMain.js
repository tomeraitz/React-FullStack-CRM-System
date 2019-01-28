import React, { Component } from 'react';
import Update from './update/Update';
import Add from './add/Add';
import axios from 'axios'


class ActionMain extends Component {
  constructor(){
    super()
    this.state = {
        data : [],
        clientData : [],
        userID : ""
    }
  }

  filterUsers = async (value)=>{
    //// filter the users
    let users = this.state.data
    let newUser = []
      users.map(i => {
        if(i.name.toLowerCase().includes(value.toLowerCase())){
            newUser.push(i)
          }
        })
        return newUser
    }

    updateUserProprty = async (proprty) =>{
      if(this.state.userID){
        await axios.put(`/user/${this.state.userID}`, proprty)
        alert("The updte was saved")
      }
      else{
        alert("Please choose a client")
      }
    }


  getUsers = async () =>{
    let users = await axios.get('/users')
    await this.setState({data : users.data})
  }

  createUser = async (newUser) =>{
    newUser["email"] = ""
    newUser["firstContact"] = new Date()
    await axios.post('/user' , newUser)
    alert(newUser.name + " was saved")
  } 

  getUserDetails = (id) =>{
       this.setState({userID : id})
  }

  async componentDidMount(){
    await this.getUsers()
  }

  render() {
    return (
      <div className="actionMain updateHeader">
        <Update data={this.state.data}
                filterUsers={this.filterUsers}
                updateUser={this.updateUser}
                getUserDetails={this.getUserDetails}
                updateUserProprty={this.updateUserProprty}
        />
        <div className="hr"></div>
        <Add createUser={this.createUser}/>
      </div>
    );
  }
}

export default ActionMain
