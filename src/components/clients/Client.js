import React, { Component } from 'react';
import Operation from './Operation'
import Table from './Table'
import axios from 'axios'
import Popup from './Popup';

class Client extends Component {
  constructor(){
    super()
    this.state = {
        data : [],
        clientData : [],
        pageRange : {
          firstNumber : 0,
          lastNumber : 20
        },
        isOpen : false,
        uesrUpdate : {}
    }
}

filterSoldArray = (arr , data) =>{
  data.map(i => {
    if(i.sold){
      arr.push(i)
      }
    })
}

filterByValue = (arr , data , value , operation) => {
  data.map(i => {
    if(i[operation].toLowerCase().includes(value.toLowerCase())){
      arr.push(i)
      }
    })
}

orderRangeOfPag = (pageRange , opertor) =>{
    if(opertor === "+"){
      pageRange.firstNumber += 20
      pageRange.lastNumber += 20
    }
    else if(opertor === "-"){
      pageRange.firstNumber -= 20
      pageRange.lastNumber -= 20
    }
    else{
      pageRange.firstNumber = 0
      pageRange.lastNumber = 20
    }
}

setStateAndRende = async (newStateVale) =>{
   await this.setState(newStateVale)
   await this.filter20Users()
}

filterUsersByOperation = async (value, operation)=>{

  await this.getUsers()
  let pageRange = this.state.pageRange
  let users = this.state.data
  let newUser = []

  operation !== "sold" ?
  this.filterByValue(newUser , users, value , operation) : this.filterSoldArray(newUser , users)

  if(newUser.length < pageRange.lastNumber){
    this.orderRangeOfPag(pageRange , "")
    this.setStateAndRende({data : newUser ,pageRange })
  }
  else{
    this.setStateAndRende({data : newUser })
  }
   
}
  
filter20Users = () =>{
          let users = this.state.data
          let firstNumber = this.state.pageRange.firstNumber 
          let lasttNumber = this.state.pageRange.lastNumber 
          let clientData = []
          
          for(let i = firstNumber; i < lasttNumber; i++){
            clientData.push(users[i])
   
          }
            this.setState({clientData : clientData})
  }

 forwardPage = async () =>{
  let pageRange = this.state.pageRange
  if(pageRange.lastNumber < this.state.data.length){
    this.orderRangeOfPag(pageRange, "+")
    this.setStateAndRende({pageRange})
  }
}

previewPage =async () =>{
  let pageRange = this.state.pageRange
  if(pageRange.firstNumber > 0){
    this.orderRangeOfPag(pageRange, "-")
    this.setStateAndRende({pageRange})
  }
}

async getUsers(){
  let users =await axios.get('https://crm-tomer.herokuapp.com/users', {withCredentials: 'include'})
  await this.setState({data : users.data})
}

updateUser = async (user) =>{
  let newUser = await axios.put(`https://crm-tomer.herokuapp.com/user/${user.id}`, user, {withCredentials: 'include'})
  let clientData = [...this.state.clientData]
  let arr = []
  clientData = clientData.filter(i => i !=undefined)
  clientData.forEach(user =>{
          if(user._id == newUser.data._id){
              arr.push(newUser.data)
          }
          else{
            arr.push(user)
          }
      })
      
      this.setState({clientData : arr})
}

async componentDidMount(){
  await this.getUsers()
  this.filter20Users()
}

changeOpenStatus = (bool , firstName , lastName , country , id) =>{
  if(bool == false){
    this.setState({isOpen : bool})
  }
  else{
    let uesrUpdate ={
      id : id,
      name : firstName,
      surname : lastName,
      country : country
    }
    this.setState({isOpen : bool , uesrUpdate})
  }
} 

openPopUp = () =>{
    if(this.state.isOpen){
      return "popup"
    }
    else{
     return "popupNone"
    }
}


  render() {
    return (
      <div className="client">

       <Popup nameOfClass={this.openPopUp()} 
              changeOpenStatus={this.changeOpenStatus}
              uesrUpdate={this.state.uesrUpdate}
              updateUser={this.updateUser}
        />

        <Operation  range={this.state.pageRange} 
                    forwardPage={this.forwardPage}
                    previewPage={this.previewPage}
                    data={this.state.clientData}
                    filterUsersByOperation={this.filterUsersByOperation}
                    filter20Users={this.filter20Users}
                    getUsers={this.getUsers}
        />
        
        <Table data={this.state.clientData}
                changeOpenStatus={this.changeOpenStatus}/>
       
      </div>
    );
  }
}

export default Client
