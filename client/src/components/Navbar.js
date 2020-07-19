import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/AuthService';
import {AuthContext} from '../context/AuthContext';

//import '../styles/css/navbar.min.css';

const Navbar = props => {

  const {isAuthenticated,setIsAuthenticated,setUser} = useContext(AuthContext);

  //logout function for logout button
  const onClickLogoutHandler = () => {
    AuthService.logout().then(data => {
      if(!data.message.error){
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
      }
    });

  }

  const unauthenticatedNavbar = () =>{
    return(
      <ul className="navbar-elements">
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/login"> Login </Link></li>
      </ul>
    )
  }

  const authenticatedNavbar = () => {
    return(
      <ul className="navbar-elements">
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/facilities"> Facilities </Link></li>
        <button onClick={onClickLogoutHandler}>
          Logout
        </button>
      </ul>
    )
  }


  return (
    <nav>
      {/* <Link to="/">
        <div className="navbar-logo"><img src={logo} alt="logo"></img></div>
      </Link> */}
      <div className="navbar-elements-container">
        {/*Display navbar depending on isAuthenticated state of authContenxt*/}
        {isAuthenticated ? authenticatedNavbar() : unauthenticatedNavbar()}
      </div>
    </nav>
  )
}

export default Navbar;