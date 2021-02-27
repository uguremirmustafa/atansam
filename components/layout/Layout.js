import Modal from '@components/modal/Modal';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-16">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
