import React, { Component } from 'react';
import './popup.css'

class Popup extends Component {
    constructor(){
        super()
        this.state = {
            name : "",
            surname : "",
            country : ""
        }
    }
closePop = () => this.props.changeOpenStatus(false)
handleChangeName = (event) => this.setState({name : event.target.value})
handleChangeSurName = (event) => this.setState({surname : event.target.value})
handleChangeCountry = (event) => this.setState({country : event.target.value})

updateUser = () =>{
    let updatedUserPop = {
        name : "",
        surname : "",
        country : ""
    }
    let firstName = this.state.name
    let lastName = this.state.surname
    let country = this.state.country
    firstName ? updatedUserPop.name = firstName : updatedUserPop.name = this.props.uesrUpdate.name
    lastName ? updatedUserPop.surname = lastName : updatedUserPop.surname = this.props.uesrUpdate.surname
    country ? updatedUserPop.country = country : updatedUserPop.country = this.props.uesrUpdate.country
    let user = {
        id : this.props.uesrUpdate.id,
        name : `${updatedUserPop.name} ${updatedUserPop.surname}`,
        country : updatedUserPop.country
    }
    this.props.updateUser(user)
    this.closePop()
}
  render() {
    return (
    <div className={this.props.nameOfClass}>
        <div className="box">
        <div className="close" onClick={this.closePop}>X</div>
        <div></div>
            <div>Name :</div>
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
            <div className="update" onClick={this.updateUser}>Update</div>
        </div>
     </div>
    );
  }
}

export default Popup
