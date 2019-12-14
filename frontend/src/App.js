import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';

import Header from './components/static/Header';
import Footer from './components/static/Footer';
import Landing from './components/body/Landing';

import Tournaments from './components/body/tournaments/Tournaments';
import Tournament from './components/body/tournaments/Tournament';
import AddNew from './components/body/tournaments/AddNewForm/AddNew';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="body-container">
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/turnaukset" component={Tournaments}/>
            <Route exact path="/turnaukset/uusi" component={AddNew}/>
            <Route exact path="/turnaukset/:name" component={Tournament}/>
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
