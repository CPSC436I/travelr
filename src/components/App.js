import React from 'react';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import MainCalendar from './Calendar/MainCalendar';
import CPopper from './Calendar/CPopper';
import MyTrips from './Trips/TripsList';
import SampleTrip from './Trips/TripPageNew';
import Display from './Display';
import NavBar from './NavBar/NavBar';
import LandingPage from './LandingPage';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SavedDisplay from './SavedDisplay';


function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} />
        <Route path="/results" component={Display} />
        <Route path="/saved" component={SavedDisplay} />
        <Route path="/calendar" component={MainCalendar} />
        <Route path="/trips" component={MyTrips} />
        <Route path="/sampleTrip" component={SampleTrip} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </Router>


  );
}

export default App;
