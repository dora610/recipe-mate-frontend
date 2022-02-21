import React from 'react';
import { Outlet } from 'react-router-dom';
import UserTable from '../../components/admin/UserTable';

function UserDetails() {
  return (
    <div>
      <UserTable />
      <Outlet />
    </div>
  );
}

export default UserDetails;
