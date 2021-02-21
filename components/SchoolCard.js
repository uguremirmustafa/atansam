import { AppContext } from 'context/GlobalState';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import { useSession } from 'next-auth/client';
function SchoolCard({ school }) {
  const { state, dispatch } = useContext(AppContext);
  const { name, il, ilce, _id } = school;
  return (
    <div className="p-4 rounded w-36 h-60 flex flex-col justify-between text-center bg-gradient-to-br from-blue-600  shadow-lg">
      <div>
        <h3 className="text-white font-bold">{name}</h3>
        <div className="text-xs">{il}</div>
        <div className="text-xs">{ilce}</div>
      </div>
      <NextLink href={`/schools/${_id}`}>gooo</NextLink>
      <div className="h-12">
        <button
          className="p-2 m-2 bg-white w-10 rounded"
          onClick={() => dispatch({ type: 'ADD_TERCIH', payload: school })}
        >
          +
        </button>
        <button className="p-2 m-2 bg-white w-10 rounded">-</button>
      </div>
    </div>
  );
}

export default SchoolCard;
