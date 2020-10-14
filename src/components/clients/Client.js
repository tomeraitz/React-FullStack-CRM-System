import React, { Component } from 'react';
import Operation from './Operation'
import Table from './Table'
import axios from 'axios'
import Popup from './Popup';
import dataJson from '../../data.json'

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
        userUpdate : {}
    }
}

  async componentDidMount(){
    await this.getUsers()
    this.filter20Users()
  }

  findValueOperation = (element , value , operation) => element[operation].toLowerCase().includes(value.toLowerCase())
  filterSoldArray = (arr , data) => data.map(i => i.sold ? arr.push(i) : null)
  filterByValue = (arr , data , value , operation) => data.map(element => this.findValueOperation(element , value , operation) ? arr.push(element) : null);
  orderRangeOfPag = (pageRange , operator) =>{  for(let key in pageRange) if(operator) pageRange[key] = eval(`${pageRange[key]} ${operator} 20`)};
  setStateAndRender = async (newStateVale) =>{await this.setState(newStateVale); await this.filter20Users();}
  movePage = async (operator) => (this.state.pageRange.lastNumber < this.state.data.length) ? (this.orderRangeOfPag(this.state.pageRange, operator), this.setStateAndRender({pageRange : this.state.pageRange})) : null;
  openPopUp = () => this.state.isOpen ? "popup" : "popupNone";

  filterUsersByOperation = async (value, operation)=>{
    await this.getUsers()
    const pageRange = this.state.pageRange
    const users = this.state.data
    const newUser = [];
    operation !== "sold" ? this.filterByValue(newUser , users, value , operation) : this.filterSoldArray(newUser , users)
    const newData =  newUser.length > 0 ? {data : newUser } : {};
    if(newUser.length < pageRange.lastNumber) newData.pageRange = pageRange;
    this.setStateAndRender(newData)
  }

  filter20Users = (clientData = []) =>{
      const {pageRange} = this.state;
      for(let i = pageRange.firstNumber; i < pageRange.lastNumber; i++) clientData.push(this.state.data[i]);
      this.setState({clientData : clientData})
  }

  getUsers = async ()=>{
    let users = {}
    !window.location.href.includes('localhost') ? users = await axios.get('.netlify/functions/server/users', {withCredentials: 'include'}) 
    :users.data = JSON.parse(JSON.stringify(dataJson));
    await this.setState({data : users.data})
  }

  updateUser = async (user) =>{
    const newUser = await axios.put(`.netlify/functions/server/user/${user.id}`, user, {withCredentials: 'include'})
    const clientData = [...this.state.clientData].filter(i => i !=undefined).map(user=>user = user._id == newUser.data._id ? newUser.data : user)  
    this.setState({clientData})
  }

  changeOpenStatus = (bool , firstName , lastName , country , id) =>{
    const changeState = {isOpen : bool};
    const userUpdate ={id, name : firstName, surname : lastName, country }
    bool ? this.setState({...changeState, ...userUpdate}) : this.setState({...changeState})
  } 

  render() {
      return (
        <div className="client">
          <Popup nameOfClass={this.openPopUp()} 
                  changeOpenStatus={this.changeOpenStatus}
                  uesrUpdate={this.state.userUpdate}
                  updateUser={this.updateUser}
            />
            <Operation  range={this.state.pageRange} 
                        forwardPage={()=>this.movePage("+")}
                        previewPage={()=>this.movePage("-")}
                        data={this.state.clientData}
                        filterUsersByOperation={this.filterUsersByOperation}
                        filter20Users={this.filter20Users}
                        getUsers={this.getUsers}
            />
            <Table data={this.state.clientData} changeOpenStatus={this.changeOpenStatus}/>
        </div>
      );
  }
}

export default Client
