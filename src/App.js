import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import NavBar from './components/main/NavBar'
import Client from './components/clients/Client';
import ActionMain from './components/actions/ActionMain'
import Analytics from './components/analytics/Analytics';


function App(){
    return (
      <Router> 
        <div className="App">
        <NavBar />
          <Switch>
            <Redirect exact from="/" to="/clients" />
            <Route path="/clients" exact  render={({ match }) => <Client  />}/> 
            <Route path="/actions" exact  render={({ match }) => <ActionMain />}/> 
            <Route path="/analytics" exact  render={({ match }) => <Analytics />}/> 
          </Switch>
       </div>
    </Router>
    );
}

export default App;
