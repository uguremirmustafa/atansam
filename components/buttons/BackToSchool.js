import NextLink from 'next/link';
import React from 'react';

function BackToSchool() {
  return (
    <button className="bg-blue-400 py-2 px-4 my-4 rounded shadow-md cursor-pointer hover:shadow-lg font-bold text-white overflow-hidden">
      <NextLink href="/schools">okullara geri don</NextLink>
    </button>
  );
}

export default BackToSchool;
