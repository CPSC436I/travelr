import React from 'react';
import './App.css';
import Logout from './components/Logout';
import TripsHome from './components/Trips/TripsHome';
import TripsBoard from './components/Trips/TripsBoard';
import Display from './components/Display';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage';
import { Router, Route, Switch } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import history from './history';
import Favourites from './components/Favourites';


function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <NavBar />
        <Route path="/saved" component={Favourites} />
        <Route path="/trips" component={TripsHome} exact />
        <Route path="/trips/:tripID" component={TripsBoard} exact />
        <Route path="/logout" component={Logout} />
        <Route path="/results" component={Display} />
      </UserProvider>
      <Switch>
        <Route path="/" component={LandingPage} exact />
      </Switch>
    </Router>


  );
}

export default App;
