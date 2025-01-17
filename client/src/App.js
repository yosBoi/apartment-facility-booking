import React from 'react';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Booking from './components/Booking';
import Facilities from './components/Facilities';

import './styles/css/global.min.css'


function App() {
  return (
    <Router>
      <Navbar/>
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path='/login' component={Login}/>
      <PrivateRoute path='/booking' component={Booking}/>
      <PrivateRoute path='/facilities' component={Facilities}/>
    </Router>
  );
}

export default App;
