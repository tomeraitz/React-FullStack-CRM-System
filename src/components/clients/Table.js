import React, { Component } from 'react';
import './table.css'
import Row from './Row';

class Table extends Component {
    
  render() {
    const data = this.props.data
    return (
      <div className="table">
        <div className="header">
            <div>Name</div>
            <div>Surname</div>
            <div>country</div>
            <div>First Contact</div>
            <div>Email</div>
            <div>Sold</div>
            <div>Owner</div>
        </div>
        {data.map(i => {
            if(i){
            return <Row id={i._id} 
                        name={i.name} 
                        country={i.country} 
                        email={i.email}
                        firstContact={i.firstContact}
                        emailType={i.emailType}
                        sold={i.sold}
                        owner={i.owner}
                        key={i._id}
                        changeOpenStatus={this.props.changeOpenStatus}
                    />}
        })}
      </div>
    );
  }
}

export default Table
