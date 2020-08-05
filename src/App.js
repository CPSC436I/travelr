import React from 'react';
import './App.css';
import Logout from './components/pages/Logout';
import MyTrips from './components/Trips/TripsList';
import SampleTrip from './components/Trips/TripPageNew';
import Display from './components/pages/Display';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/pages/LandingPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';
import history from './history';
import Favourites from './components/pages/Favourites';


function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <NavBar />
        <Route path="/saved" component={Favourites} />
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
