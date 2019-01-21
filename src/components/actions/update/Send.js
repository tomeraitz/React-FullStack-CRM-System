import React, { Component } from 'react';

class Send extends Component {
  constructor(){
    super()
    this.state = {
      emailType : ""
    }
  }

  handleChangeSelect =async (event) =>{
    await this.setState({emailType : event.target.value})
    
}

send = () =>{
  if(this.state.emailType == ""){
    alert("Please choose a email type")
  }
  else{
    this.props.updateEmailType({emailType : this.state.emailType})
  }
 
}
  
  render() {

    return (
      <div className="sendMail genralGrid">
          <div>Send Mail to : </div>
          <select onChange={this.handleChangeSelect}
                    className="SelctTransfer genralSelect">
              <option value="" disabled selected hidden>Email Type</option>
              <option value="A" >A</option>
              <option value="B" >B</option>
              <option value="C" >C</option>
              <option value="D" >D</option>
              }
              })}

            </select>
          <div className="genralButton" onClick={this.send}>SEND</div>
      </div>
    );
  }
}

export default Send
