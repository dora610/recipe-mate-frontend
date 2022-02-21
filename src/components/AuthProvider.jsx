import React, { useEffect, useState } from 'react';
import AuthContext from '../context/authContext';
import {
  userSignIn,
  userSignUp,
  userSignOut,
  authenticate,
  removeAuthentication,
  isAuthenticated,
} from '../controllers/authController';

function AuthProvider({ children }) {
  const [user, setUser] = useState(isAuthenticated);

  const signIn = (userCreds) => {
    return userSignIn(userCreds).then((data) => {
      let { userId, jwt, expiresAt, fullName, r } = data;
      authenticate({ userId, jwt, expiresAt, fullName, r });
      setUser({ userId, jwt, expiresAt, fullName, r });
      return data.status;
    });
  };

  const signUp = (userDetails) => {
    return userSignUp(userDetails).then((data) => {
      let { userId, jwt, expiresAt, fullName, r } = data;
      authenticate({ userId, jwt, expiresAt, fullName, r });
      setUser({ userId, jwt, expiresAt, fullName, r });
      return data.status;
    });
  };

  const signOut = () => {
    return userSignOut().then((data) => {
      removeAuthentication();
      setUser(null);
      return data;
    });
  };

  const isUserAuthenticated = () => {
    let auth = isAuthenticated();
    if (!auth) {
      removeAuthentication();
      setUser(null);
      return false;
    }
    setUser(auth);
    return true;
  };

  const isAdminAuthenticated = () => {
    let auth = isAuthenticated();
    if (!(auth && auth.r > 0)) {
      removeAuthentication();
      setUser(null);
      return false;
    }
    setUser(auth);
    return true;
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    isUserAuthenticated,
    isAdminAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
