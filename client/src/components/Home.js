import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

//import '../styles/css/home.min.css'

const Home = props => {
  const {isAuthenticated, user } = useContext(AuthContext);

  return(
    <div>
      {isAuthenticated ? <h2>Hello, {user}</h2> : null}
      <p>lorem ipsum</p>
    </div>
  
  )
}

export default Home;