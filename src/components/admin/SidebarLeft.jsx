import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarLeft() {
  return (
    <div className="grid grid-rows-side-left items-center bg-purple-700 text-stone-200">
      <div className="hover:bg-purple-900 navlinkSidebarDeafult">Profile</div>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'navlinkSidebarActive'
            : 'hover:bg-purple-900 navlinkSidebarDeafult'
        }
        to="/admin/"
      >
        Dashboard
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'navlinkSidebarActive'
            : 'hover:bg-purple-900 navlinkSidebarDeafult'
        }
        to="/admin/user"
      >
        Users
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? 'navlinkSidebarActive'
            : 'hover:bg-purple-900 navlinkSidebarDeafult'
        }
        to="/admin/recipe"
      >
        Recipes
      </NavLink>
    </div>
  );
}

export default SidebarLeft;
