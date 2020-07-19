import React from 'react';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Reservation from './components/Reservation';




//import logo from './logo.svg';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path='/login' component={Login}/>
      <PrivateRoute path='/reservation' component={Reservation}/>
    </Router>
  );
}

export default App;
