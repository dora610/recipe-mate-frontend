import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
