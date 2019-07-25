import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/static/Header';
import Footer from './components/static/Footer';
import Landing from './components/body/Landing';
import TournamentManager from './components/body/tournaments/TournamentManager';

import { Provider } from './context'; 

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header/>
          <div className="body-container">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/turnaukset" component={TournamentManager}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
     </Provider>
  );
}

export default App;
