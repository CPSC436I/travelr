import React from 'react';
import './App.css';
import Logout from './components/Logout';
import TripsHome from './components/Trips/TripsHome';
import TripsBoard from './components/Trips/TripsBoard';
import Display from './components/Display';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import history from './history';
import Favourites from './components/Favourites';


function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <NavBar />
        <Route path="/profile" component={Profile} />
        <Route path="/saved" component={Favourites} />
        <Route exact path="/trips" component={TripsHome} />
        <Route exact path="/trips/:tripID" component={TripsBoard} />
        <Route path="/logout" component={Logout} />
      </UserProvider>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/results" component={Display} />
      </Switch>
    </Router>


  );
}

export default App;
