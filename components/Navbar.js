import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

function Navbar() {
  const [session, loading] = useSession();

  return (
    <nav className="flex justify-between flex-row p-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
      <Link href="/">home</Link>
      {loading ? (
        <div className="inline pl-2">...</div>
      ) : (
        <div className="inline pl-2">
          {!session && <button onClick={() => signIn()}>giris</button>}
          {session && <button onClick={() => signOut()}>cikis</button>}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
