import NextLink from 'next/link';
import React from 'react';
import { FaArrowLeft, FaBackward } from 'react-icons/fa';

function BackToSchool() {
  return (
    <NextLink href="/schools">
      <button className="bg-blue-400 py-2 px-4 w-50 rounded shadow-xl cursor-pointer hover:shadow-lg font-bold text-white overflow-hidden flex items-center justify-center ">
        <FaArrowLeft style={{ marginRight: '5px' }} /> okullara geri dön
      </button>
    </NextLink>
  );
}

export default BackToSchool;
