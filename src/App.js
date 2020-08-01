import React from 'react';
import './App.css';
import Logout from './components/Logout';
import MyTrips from './components/Trips/TripsList';
import SampleTrip from './components/Trips/TripPageNew';
import Display from './components/Display';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import history from './history';
import SavedDisplay from './components/SavedDisplay';


function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <NavBar />
        <Route path="/profile" component={Profile} />
        <Route path="/favourites" component={SavedDisplay} />
        <Route path="/trips" component={MyTrips} />
        <Route path="/logout" component={Logout} />
      </UserProvider>
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/results" component={Display} />
        <Route path="/sampleTrip" component={SampleTrip} />
      </Switch>
    </Router>


  );
}

export default App;
