import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';

import Header from './components/static/Header';
import Landing from './components/body/Landing';
import NoMatch from './components/static/NoMatch';

import Tournaments from './components/body/tournaments/Tournaments';
import Tournament from './components/body/tournaments/Tournament';
import AddNew from './components/body/tournaments/AddNewForm/AddNew';
import Standings from './components/body/tournaments/Standings/Standings';
import MatchSchedule from './components/body/tournaments/MatchSchedule/MatchSchedule';

import Menu from './components/body/tournaments/Modify/Menu';
import ModifyInfo from './components/body/tournaments/Modify/ModifyInfo';
import ModifyTeams from './components/body/tournaments/Modify/ModifyTeams';
import ModifyReferees from './components/body/tournaments/Modify/ModifyReferees';
import ModifyMatches from './components/body/tournaments/Modify/ModifyMatches';

import Login from './components/admin/Login/LoginForm';

import Provider from './components/utilities/Provider';
import AuthDataProvider from './components/utilities/AuthDataProvider';
import { useAuthDataContext } from './components/utilities/AuthDataProvider';

function PrivateRoute({ component, ...options }) {
  const { authData } = useAuthDataContext();
  const finalComponent = authData ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

function App() {
  return (
    <AuthDataProvider>
      <Router>
        <div className="App">
          <Header/>
          <div className="body-container">
              <Provider>
                <Switch>
                  <PrivateRoute exact path="/" component={Landing}/>
                  <PrivateRoute exact path="/koti" component={Landing}/>
                  <PrivateRoute exact path="/turnaukset" component={Tournaments}/>
                  <PrivateRoute exact path="/turnaukset/uusi" component={AddNew}/>
                  <PrivateRoute excat path="/turnaukset/:name/sarjataulukko" 
                    component={Standings}/>
                  <PrivateRoute excat path="/turnaukset/:name/otteluohjelma" 
                    component={MatchSchedule}/>
                  <PrivateRoute excat path="/turnaukset/:name/muokkaa/yleinen" 
                    component={ModifyInfo}/>
                  <PrivateRoute exact path="/turnaukset/:name" component={Tournament}/>
                  <PrivateRoute excat path="/turnaukset/:name/muokkaa/joukkueet"
                    component={ModifyTeams}/>
                  <PrivateRoute excat path="/turnaukset/:name/muokkaa/tuomarit" 
                    component={ModifyReferees}/>
                  <PrivateRoute excat path="/turnaukset/:name/muokkaa/ottelut" 
                    component={ModifyMatches}/>
                    <PrivateRoute excat path="/turnaukset/:name/muokkaa" component={Menu}/>
                  <PrivateRoute exact path="/kirjaudu" component={Login}/>
                  <PrivateRoute component={NoMatch}/>
                </Switch>
              </Provider>
          </div>
        </div>
      </Router>
    </AuthDataProvider>
  );
}

export default App;
