import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import Loading from '@components/loaders/Loading';

function Navbar() {
  const [session, loading] = useSession();

  return (
    <nav className="bg-white shadow-sm p-4 font-bold fixed w-full">
      <div className="max-w-4xl mx-auto flex justify-between flex-row">
        <Link href="/">
          <div className="logo cursor-pointer py-2 flex items-center">
            <img src="logo.png" alt="logo" className="h-6 rounded mr-2" />
            <p className="hidden md:flex">| Atansam</p>
          </div>
        </Link>
        <div className="flex">
          {session && (
            <Link scroll={false} href="/schools">
              <div className="py-2 px-4 hover:bg-gray-900 hover:text-white rounded-full cursor-pointer">
                Okullar
              </div>
            </Link>
          )}
          {session && (
            <Link scroll={false} href="/profile">
              <div className="py-2 px-4 hover:bg-gray-900 hover:text-white rounded-full cursor-pointer">
                Profile
              </div>
            </Link>
          )}
          {loading ? (
            <div className="inline py-2 px-4 hover:bg-gray-900 hover:text-white rounded-full">
              ...
            </div>
          ) : (
            <div className="inline">
              {!session && (
                <Link href="/giris">
                  <div className="py-2 px-4 hover:bg-green-500 hover:text-white rounded-full cursor-pointer">
                    Giriş
                  </div>
                </Link>
              )}
              {session && (
                <button
                  className="py-2 px-4 bg-pink-500 font-bold text-white rounded-full "
                  onClick={() => signOut()}
                >
                  Çıkış
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
