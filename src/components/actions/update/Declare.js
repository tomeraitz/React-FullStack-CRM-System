import React, { Component } from 'react';
class Declare extends Component {

  declare = () =>{
    this.props.updateUserProprty({sold : true})
  }
  
  render() {
    return (
      <div className="sendMail genralGrid">
          <div>Declare Sale!</div>
          <div></div>
          <div className="genralButton" onClick={this.declare}>DECLARE</div>
      </div>
    );
  }
}

export default Declare
