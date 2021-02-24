import React, { useContext, useState } from 'react';
import NextLink from 'next/link';
function SchoolCard({ school, email }) {
  const { name, il, ilce, _id } = school;

  return (
    <div className="rounded w-36 h-56 flex flex-col justify-between text-center bg-white  shadow-lg overflow-hidden bg-blue-100">
      <div>
        <h3 className="text-gray-800 font-bold bg-blue-200 px-3 h-32 flex justify-center items-center ">
          {name}
        </h3>
        <div className="text-xs mx-3 mt-3 truncate ">
          {il}-{ilce}
        </div>
      </div>
      <NextLink href={`/schools/${_id}`}>
        <div className="bg-blue-400 p-1 m-4 rounded shadow-md cursor-pointer hover:shadow-lg font-bold text-white">
          okula git
        </div>
      </NextLink>
    </div>
  );
}

export default SchoolCard;
