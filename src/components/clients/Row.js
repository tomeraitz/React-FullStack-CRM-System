import React, { Component } from 'react';
import Moment from 'react-moment';
import './table.css'
import {faCheck} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCheck);

class Row extends Component {
  findFirstName =()=> this.props.name.replace(/ .*/,'');
  findLastName =()=> this.props.name.split(" ").pop()
  ifSold = () => this.props.sold ? <FontAwesomeIcon icon={faCheck} /> : ""
  openPop = () => this.props.changeOpenStatus(true , this.findFirstName() ,this.findLastName() ,  this.props.country, this.props.id)
  render() {
    return (
      <div className="row" onClick={this.openPop}>
            <div>{this.findFirstName()}</div>
            <div>{this.findLastName()}</div>
            <div>{this.props.country}</div>
            <div><Moment format="YYYY/MM/DD">{this.props.firstContact}</Moment></div>
            <div>{this.props.emailType}</div>
            <div>{this.ifSold()}</div>
            <div>{this.props.owner}</div>
      </div>
    );
  }
}

export default Row
