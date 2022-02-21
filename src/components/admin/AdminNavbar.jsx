import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import authContext from '../../context/authContext';

function AdminNavbar({ className }) {
  const { user, signOut } = useContext(authContext);

  const signOutHandler = () => {
    signOut()
      .then((res) => console.log(res))
      .catch((err) => toast.error(err.message));
  };

  return (
    <nav className={`navbar ${className}`}>
      <Link className="navbar-brand navlinkClassDefault" to="/admin">
        Welcome Back! {user.fullName}
      </Link>
      {user ? (
        <>
          <NavLink to="/" className="navlinkClassDefault">
            Home page
          </NavLink>
          <NavLink
            to="/"
            onClick={signOutHandler}
            className="navlinkClassDefault"
          >
            Sign Out
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navlinkClassActive' : 'navlinkClassDefault'
            }
            to="/signin"
          >
            Sign In
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'navlinkClassActive' : 'navlinkClassDefault'
            }
            to="/signup"
          >
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default AdminNavbar;
