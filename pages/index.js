import { getData } from '@utils/fetchData';
import { signIn, useSession } from 'next-auth/client';
import Link from 'next/link';

const Index = () => {
  const callbackUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTIONURL
      : `${process.env.BASE_URL}/profile`;
  const [session, loading] = useSession();
  return (
    <div className="py-20 flex flex-col justify-center">
      <div className="text-5xl font-extrabold text-center mb-20">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
          Keske atansam
        </span>
      </div>
      {loading && <div>loading...</div>}
      {!loading && !session && (
        <button
          className="mx-auto py-2 px-4 bg-green-500 text-white rounded-full w-20 "
          onClick={() => signIn()}
        >
          giris
        </button>
      )}
    </div>
  );
};

export default Index;
