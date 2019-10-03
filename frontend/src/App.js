import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './components/static/Header';
import Footer from './components/static/Footer';
import Landing from './components/body/Landing';
import Tournaments from './components/body/tournaments/Tournaments';
import Login from './components/body/users/Login';
import Admin from './components/admin/Admin';
import AddUser from './components/admin/AddUser';
import NoMatch from './components/NoMatch';

import { Provider, Consumer } from './context'; 

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Header/>
          <div className="body-container">
            <Consumer>
              {value => {
                const { getTournaments } = value
                return(
                  <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/tournaments" render={(props) => 
                      <Tournaments {...props} getTournaments={getTournaments}/>
                    }/>
                    <Route exact path="/tournaments/:id" render
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/admin" component={Admin}/>
                    <Route exact path="/admin/adduser" component={AddUser}/>
                    <Route component={NoMatch}/>
                  </Switch>
                )
              }}
            </Consumer>
          </div>
          <Footer/>
        </div>
      </Router>
     </Provider>
  );
}

export default App;
