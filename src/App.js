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
import UserProvider from './contexts/UserProvider';
import history from './history';
import Login from './components/Login';
import Logout from './components/Logout';
import MainCalendar from './components/Calendar/MainCalendar';
import MyTrips from './components/Trips/TripsList';
import SampleTrip from './components/Trips/TripPageNew';
import Display from './components/Display';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import SavedDisplay from './components/SavedDisplay';

function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <NavBar />
        <Route path="/profile" component={Profile} />
        <Route path="/saved" component={SavedDisplay} />
        <Route path="/calendar" component={MainCalendar} />
        <Route path="/trips" component={MyTrips} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
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
