import React, { useContext, useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { IoPersonCircle } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { user, signOut } = useAuth();
  const [isCollpased, setIsCollpased] = useState(true);

  const toggleCollapseClass = !isCollpased
    ? 'uncollapse'
    : 'bg-white bg-opacity-10 backdrop-blur-2xl';

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
      className={`grid gap-8 sm-px-10 px-5 lg:px-28 shadow-sm text-gray-900 grid-cols-1 grid-flow-col items-center justify-items-stretch ${toggleCollapseClass} z-10`}
      onClick={clickHandler}
    >
      <Link className='brand-name py-3 font-semibold text-xl' to='/'>
        Home
      </Link>
      {user?.r > 0 && (
        <NavLink className={getNavLinkClass} to='/admin'>
          Admin Dashboard
        </NavLink>
      )}
      {user ? (
        <>
          <NavLink className={getNavLinkClass} to='/recipe/addRecipe'>
            Add Recipe
          </NavLink>
          {/* <NavLink className={getNavLinkClass} to='/recipe/saved'>
            Saved Recipe
          </NavLink>
          <Link
            to='/'
            // onClick={signOutHandler}
            className={`signout ${!isCollpased && 'show'} navlinkClassDefault`}
          >
            Sign Out
          </Link> */}
          <span
            className={`profile flex flex-col relative px-4 py-2 rounded-t-md ${
              !isCollpased ? 'uncollapse show' : 'group hover:bg-fuchsia-50'
            }`}
          >
            <span className='flex items-center gap-6 group-hover:text-fuchsia-600'>
              <p className=''>{user.fullName}</p>
              <IoPersonCircle className='profile-icon text-2xl' />
            </span>

            <ul
              className={`profile-tooltip flex-col gap-2 py-2 bg-fuchsia-50 absolute z-20 top-9 right-0 w-full rounded-b-lg hidden group-hover:flex text-sm transition-transform duration-100 ease-in-out`}
            >
              <li className='text-center'></li>
              <NavLink className='nav-dropdown' to='/profile'>
                Profile
              </NavLink>
              <NavLink className='nav-dropdown' to='/myrecipe'>
                My Recipes
              </NavLink>
              <NavLink className='nav-dropdown' to='/recipe/saved'>
                Saved Recipes
              </NavLink>
              <NavLink className='nav-dropdown' to='/'>
                Sign Out
              </NavLink>
            </ul>
          </span>
        </>
      ) : (
        <>
          <NavLink className={getNavLinkClass} to='/signin'>
            Sign In
          </NavLink>
          <NavLink className={getNavLinkClass} to='/signup'>
            Sign Up
          </NavLink>
        </>
      )}
      {(() => {
        let btnLabel = isCollpased ? (
          <FaBars className='ham-btn' />
        ) : (
          <MdClose className='text-2xl fill-red-600' />
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
