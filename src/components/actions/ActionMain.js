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
        uesrUpdate : {}
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
        if(newUser.length == 1){
          return newUser[0]
        }
    }

    updateOwner = async (owner) =>{
      if(this.state.uesrUpdate._id){
        await axios.put(`http://localhost:8000/user/${this.state.uesrUpdate._id}`, owner)
      }
      else{
        alert("Please choose a client")
      }
    }

    updateEmailType = async (emailTaype) =>{
      if(this.state.uesrUpdate._id){
        await axios.put(`http://localhost:8000/user/${this.state.uesrUpdate._id}`, emailTaype)
      }
      else{
        alert("Please choose a client")
      }
    }

    updateSold =  async (sold) =>{
      if(this.state.uesrUpdate._id){
        await axios.put(`http://localhost:8000/user/${this.state.uesrUpdate._id}`, sold)
      }
      else{
        alert("Please choose a client")
      }
    }

  getUsers = async () =>{
    let users = await axios.get('http://localhost:8000/users')
    await this.setState({data : users.data})
  }

  createUser = async (newUser) =>{
    newUser["email"] = ""
    newUser["firstContact"] = new Date()
    await axios.post('http://localhost:8000/user' , newUser)
    alert(newUser.name + " was saved")
  } 

  getUserDetails = (uesrUpdate) =>{
    console.log(uesrUpdate)
      this.setState({uesrUpdate : uesrUpdate})
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
                updateOwner={this.updateOwner}
                updateEmailType={this.updateEmailType}
                updateSold={this.updateSold}/>
        <div className="hr"></div>
        <Add createUser={this.createUser}/>
      </div>
    );
  }
}

export default ActionMain
