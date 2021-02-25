import React from 'react';

function Footer() {
  return (
    <footer className="h-10 bg-white w-full fixed bottom-0 flex justify-center items-center">
      <p className="font-bold">
        Developed and designed by{' '}
        <a href="https://devugur.com" className="text-blue-400" target="_blank">
          devugur
        </a>
      </p>
    </footer>
  );
}

export default Footer;
