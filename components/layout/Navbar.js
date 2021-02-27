import Link from 'next/link';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Logo from '@components/Logo';

function Navbar() {
  const [session, loading] = useSession();
  const router = useRouter();

  const isActive = (r) => {
    return r === router.pathname;
  };
  return (
    <nav className="bg-white shadow-sm h-16 font-bold fixed w-full flex z-index-20 px-4">
      <div className="max-w-4xl mx-auto flex justify-between flex-column items-center w-full">
        <Link href="/">
          <div className="logo cursor-pointer py-2 flex items-center">
            <Logo />
            <p className={`${isActive('/') ? 'underline' : ''} hidden md:flex`}>Atansam</p>
          </div>
        </Link>
        <div className="flex">
          {session && (
            <Link scroll={false} href="/schools">
              <div
                className={`${
                  isActive('/schools') ? 'underline' : ''
                } py-2 px-4 hover:bg-gray-900 hover:text-white rounded-full cursor-pointer`}
              >
                Okullar
              </div>
            </Link>
          )}
          {session && (
            <Link scroll={false} href="/profile">
              <div
                className={`${
                  isActive('/profile') ? 'underline' : ''
                } py-2 px-4 hover:bg-gray-900 hover:text-white rounded-full cursor-pointer`}
              >
                Profil
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
                  <div className="py-2 px-4 bg-yellow-500 text-white rounded-full cursor-pointer">
                    Giriş
                  </div>
                </Link>
              )}
              {session && (
                <button
                  className="py-2 px-4 hover:bg-red-400 font-bold hover:text-white rounded-full "
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
