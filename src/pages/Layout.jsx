import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ModalProvider } from '../context/modalContext';

function Layout() {
  return (
    <ModalProvider>
      <div className="grid grid-rows-[auto_1fr_auto] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default Layout;
