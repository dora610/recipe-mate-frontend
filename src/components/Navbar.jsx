import React, { useContext, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import authContext from '../context/authContext';

function Navbar() {
  const { user, signOut } = useContext(authContext);
  const [isCollpased, setIsCollpased] = useState(true);

  const toggleCollapseClass = !isCollpased
    ? 'uncollapse bg-opacity-70'
    : 'bg-opacity-10';

  const signOutHandler = () => {
    signOut()
      .then((res) => console.log(res))
      .catch((err) => toast.error(err.message));
  };

  const getNavLinkClass = ({ isActive }) =>
    `${!isCollpased && 'show'} ${
      isActive ? 'navlinkClassActive' : 'navlinkClassDefault'
    }`;

  const clickHandler = (e) => {
    if (e.target.classList.contains('signout')) {
      signOut()
        .then((res) => {
          setIsCollpased(true);
        })
        .catch((err) => toast.error(err.message));
    } else {
      setIsCollpased(true);
    }
  };

  return (
    <nav
      className={`grid gap-8 sm-px-10 px-4 shadow-sm text-gray-900 grid-cols-1 grid-flow-col items-center justify-items-stretch bg-white bg-opacity-10 backdrop-blur-2xl ${toggleCollapseClass}`}
      onClick={clickHandler}
    >
      <Link
        className="brand-name py-3 font-semibold text-xl navlinkClassDefault"
        to="/"
      >
        Home
      </Link>
      {user?.r > 0 && (
        <NavLink className={getNavLinkClass} to="/admin">
          Admin Dashboard
        </NavLink>
      )}
      {user ? (
        <>
          <NavLink className={getNavLinkClass} to="/recipe/addRecipe">
            Add Recipe
          </NavLink>
          <NavLink className={getNavLinkClass} to="/recipe/saved">
            Saved Recipe
          </NavLink>
          <Link
            to="/"
            // onClick={signOutHandler}
            className={`signout ${!isCollpased && 'show'} navlinkClassDefault`}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <NavLink className={getNavLinkClass} to="/signin">
            Sign In
          </NavLink>
          <NavLink className={getNavLinkClass} to="/signup">
            Sign Up
          </NavLink>
        </>
      )}
      {(() => {
        let btnLabel = isCollpased ? (
          <FaBars className="ham-btn" />
        ) : (
          <MdClose className="text-2xl fill-red-600" />
        );
        return (
          <button
            onClick={(e) => {
              setIsCollpased(!isCollpased);
              e.stopPropagation();
            }}
          >
            {btnLabel}
          </button>
        );
      })()}
    </nav>
  );
}

export default Navbar;
