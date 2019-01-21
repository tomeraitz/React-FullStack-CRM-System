import React, { Component } from 'react';
import './operation.css'
import {faChevronLeft, faChevronRight} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faChevronLeft, faChevronRight);

class Operation extends Component {
    constructor(){
        super()
        this.state = {
        input : "",
        select : "name"
        }
    }
forward =() => this.props.forwardPage()
preview =() => this.props.previewPage()

handleChangeSelect =async (event) =>{
    await this.setState({select : event.target.value})
    this.props.filterUsersByOperation(this.state.input, this.state.select )
}
handleChange = async (event) =>{
    await this.setState({input : event.target.value})
    if(this.state.input  !== ""){
        this.props.filterUsersByOperation( this.state.input, this.state.select )
    }
    else{
       await this.props.getUsers()
       await this.props.filter20Users()
    }
}

  render() {
    const data = this.props.data || [];
    return (
      <div className="operation">
            <input type="text" 
                    placeholder="Search" 
                    name="Search"
                    onChange={this.handleChange}></input>
            
            <select onChange={this.handleChangeSelect}>
                <option value="name" >name</option>
                <option value="country" >country</option>
                <option value="email" >Email</option>
                <option value="owner" >Owner</option>
                <option value="sold" >Sold</option>
            </select>
            <div className="control">
                <FontAwesomeIcon icon="chevron-left"  onClick={this.preview} className="chevron"/>
                <span>{this.props.range.firstNumber} - {this.props.range.lastNumber}</span>
                <FontAwesomeIcon icon="chevron-right" onClick={this.forward} className="chevron"/>
            </div>
      </div>
    );
  }
}

export default Operation
