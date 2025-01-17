import React, {useState,useContext} from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';
import {AuthContext} from '../context/AuthContext';

import '../styles/css/login.min.css';

const Login = props => {
  
  //to keep track of current user info being entered
  const [user, setUser] = useState({username: "", password: ""});

  //to keep track if error msg exists and what error msg is
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage({msgBody: "Loading...", error:false})
    AuthService.login(user).then(data => {
      //console.log(data);
      if(data.isAuthenticated){
        authContext.setIsAuthenticated(data.isAuthenticated);
        authContext.setUser(data.username);
        
        //redirect to home (if successful login)
        props.history.push('/');

      }
      else{
        //console.log("failed login");
        setMessage(data.message);
      }
    })
  }

  return(
    <div className="login-form">
      <form onSubmit={onSubmit}>
        <h3>Please enter credentials</h3>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" onChange={onChange} placeholder="Username" required/>
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" onChange={onChange} placeholder="Password" required/>
        <button type="submit">Log In</button>
      </form>
      {message ? <Message message = {message}/> : null}
    </div>
  )

}

export default Login;