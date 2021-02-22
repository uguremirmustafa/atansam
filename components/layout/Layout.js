import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto pt-20">{children}</main>
    </div>
  );
}

export default Layout;
