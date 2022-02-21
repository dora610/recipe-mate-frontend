import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import SidebarLeft from '../../components/admin/SidebarLeft';
import SidebarRight from '../../components/admin/SidebarRight';
import Footer from '../../components/Footer';
import { AdminContentProvider } from '../../context/adminContentContext';

function AdminLayout() {
  return (
    <AdminContentProvider>
      <div className="grid gap-x-3 grid-cols-admin-page grid-rows-admin-page">
        <AdminNavbar className="col-span-full" />
        <SidebarLeft />
        <Outlet />
        <SidebarRight />
        <Footer className="col-span-full" />
      </div>
    </AdminContentProvider>
  );
}

export default AdminLayout;
