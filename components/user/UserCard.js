import Link from 'next/link';
import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';

function UserCard({ user }) {
  console.log(user);
  return (
    <div className="h-66 w-40 bg-red-50 rounded overflow-hidden">
      <div className="h-20 bg-gray-100 flex justify-center items-center">
        <img src={user.image} alt="avatar" className="h-16 w-16 rounded-full" />
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <Link href={`/users/${user._id}`}>
          <p className="h-16 bg-white w-full flex justify-center items-center cursor-pointer">
            {user.name}
          </p>
        </Link>
        <p className="h-8 bg-white w-full flex justify-center items-center text-center">
          <a href={`mailto:${user.email}`} className="text-center">
            <FaRegEnvelope />
          </a>
        </p>
        <p className="py-1">{user.sinavSiralamasi && user.sinavSiralamasi}</p>
      </div>
    </div>
  );
}

export default UserCard;
