import React, { Component } from 'react';
import { FaChartLine,FaUserAlt,FaGlobeAmericas } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";


class Badges extends Component {
  render() {

    return (

      <div className="badges">
          <div className="badget">
            <div className="badget-round-grenn">
                <FaChartLine className="bicon" />
            </div>
            <div className="proprty">{this.props.newClients}</div>
            <div className="title">New {this.props.date.month} Clients </div>
          </div>

          <div className="badget">
            <div className="badget-round-blue">
              <IoMdMail className="bicon"/>
            </div>
            <div className="proprty">{this.props.emails}</div>
            <div className="title">Emails sent</div>
          </div>

          <div className="badget">
            <div className="badget-round-red">
              <FaUserAlt className="bicon"/>
            </div>
            <div className="proprty">{this.props.outstandingClients}</div>
            <div className="title">Outstanding Clients</div>
          </div>
          
          <div className="badget">
            <div className="badget-round-yellow">
              <FaGlobeAmericas className="bicon"/>
            </div>
            <div className="proprty">{this.props.bestCountries.name}</div>
            <div className="title">Hottest Country</div>
          </div>
      </div>
    );
  }
}

export default Badges

