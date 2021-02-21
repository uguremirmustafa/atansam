import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

function Navbar() {
  const [session, loading] = useSession();

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-6 font-bold">
      <div className="max-w-4xl mx-auto flex justify-between flex-row ">
        <Link href="/">anasayfa</Link>
        <Link href="/schools">okullar</Link>
        <Link href="/profile">profile</Link>
        {loading ? (
          <div className="inline pl-2">...</div>
        ) : (
          <div className="inline pl-2">
            {!session && <button onClick={() => signIn()}>giris</button>}
            {session && <button onClick={() => signOut()}>cikis</button>}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
