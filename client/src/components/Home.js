import React, { useContext } from 'react';
import {AuthContext} from '../context/AuthContext';
import {Link} from 'react-router-dom';

import '../styles/css/home.min.css'

const Home = props => {
  const {isAuthenticated, user } = useContext(AuthContext);

  return(
    <div className="home">
      {isAuthenticated ? <><h2>Hello, {user}</h2><hr/></> : null}
      <p>
        This is a sample site.
        <br/>
        <br/>
        Users first have to log in through the <Link to='/login'>login-page</Link> (link also in navbar)
        <br/>
        <br/>
        3 sample users have been created and added to the database for testing purposes.
        <br/>
        <span>
          Username: yash
          <br/>
          Password: yash
        </span>
        <span>
          Username: test
          <br/>
          Password: test
        </span>
        <span>
          Username: test2
          <br/>
          Password: test2
        </span>
        <br/>
        Once the user has logged in, the navbar will show additional links and a logout button.
        <br/>
        <br/>
        User can go to the <Link to='/facilities'>facilities-page</Link> to check the non-expired bookings that have already been made by all users (in a tabular form).
        <br/>
        There are 4 facilities that the apartment provides: Swimming Pool, Tennis Court, Gym, and Club House.
        <br/>
        <br/>
        Users can also go to the <Link to='/booking'>booking-page</Link> to book any facility for any period of time, with the following constraints:
        <br/>
        <br/>
        1 - Booking cannot be in the past.
        <br/>
        2 - End date/time cannot be before starting date/time.
        <br/>
        3 - Booking cannot conflict with any other booking already made for that facility.
        <br/>
        <br/>
        If any constraint is broken, the page will show appropriate error for it.
        <br/>
        If booking does not break any constraint, the booking will be saved in the database and page will display success message.
        <br/>
        <br/>
        Finally, the logout button will log the user out.
        <br/>
        <br/>
        The <Link to='/facilities'>facilities-page</Link> and the <Link to='/booking'>booking-page</Link> cannot be accessed without logging in first. (redirects to login page)
        <br/>
        The <Link to='/login'>login-page</Link> cannot be accessed if user is already logged in. (redirects to home page)
      </p>
    </div>
  
  )
}

export default Home;