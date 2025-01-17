import React, {createContext, useState, useEffect} from 'react'

import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //to display "loading" until fetching is done
  const [isLoaded, setIsLoaded] = useState(false);

  //only runs first time because of empty array, checks if user has jwt token in cookies(is authenticated) and sets states accordingly
  useEffect(() => {
    AuthService.isAuthenticated().then(data => {
      setUser(data.username);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    })
  }, []);

  return (
    //return loading until loading is done at beginning
    <div>
      {!isLoaded ? 
      <h1>
        Loading...
      </h1> 
      
      :

      <AuthContext.Provider value = {{user, setUser, isAuthenticated, setIsAuthenticated}}>
        {props.children}
      </AuthContext.Provider>
      }
    </div>
  )
}