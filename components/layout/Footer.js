import React from 'react';

function Footer() {
  var today = new Date();
  var year = today.getFullYear();

  return (
    <footer className="h-6 bg-white w-full fixed bottom-0 flex justify-center items-center">
      <p className="font-bold text-gray-800 text-sm">
        Keşke Atansam by{' '}
        <a href="https://devugur.com" className="text-blue-400" target="_blank">
          devugur
        </a>{' '}
        &#169; {year}
      </p>
    </footer>
  );
}

export default Footer;
