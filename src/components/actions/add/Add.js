import React, { Component } from 'react';
import './add.css';

class Add extends Component {
  
    constructor(){
      super()
      this.state = {
         inputFirstName : "",
         inputLastName : "",
         country : "",
         owner : ""
      }
    }

    handleChangeName =(event) => this.setState({inputFirstName : event.target.value})
    handleChangeSurName =(event) => this.setState({inputLastName : event.target.value})
    handleChangeCountry =(event) => this.setState({country : event.target.value})
    handleChangeOwner =(event) => this.setState({owner : event.target.value})

    addUser = () => {
        let fName = this.state.inputFirstName
        let lName = this.state.inputLastName
        let country = this.state.country
        let owner = this.state.owner

        let newUser = {
          name : `${fName} ${lName}`,
          country,
          owner
        }

        this.props.createUser(newUser)
    }
    
    render() {
    return (
      <div className="add">
      <h1 className="addHeader">ADD</h1>
      <div className="insideGrid">
          <div>First Name :</div>

                <input type="text" 
                            placeholder="Name" 
                            name="name"
                            className="grey"
                            onChange={this.handleChangeName}>
                </input>

                <div>Surname :</div>
                <input type="text" 
                            placeholder="Surname" 
                            name="surname"
                            className="grey"
                            onChange={this.handleChangeSurName}>
                </input>

                <div>country :</div>
                <input type="text" 
                            placeholder="country" 
                            name="country"
                            className="grey"
                            onChange={this.handleChangeCountry}>
                </input>

                <div>Owner :</div>
                <input type="text" 
                            placeholder="Owner" 
                            name="owner"
                            className="grey"
                            onChange={this.handleChangeOwner}>
                </input>

            </div>
            <div className="addButton" onClick={this.addUser}>Add new Client</div>
      </div>
    );
  }
}

export default Add
