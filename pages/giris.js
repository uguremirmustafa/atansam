import { providers, signIn, useSession } from 'next-auth/client';

export default function SignIn({ providers }) {
  const [session, loading] = useSession();
  if (loading) return <div>loading</div>;
  const callbackUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTIONURL
      : `${process.env.BASE_URL}/profile`;

  return (
    <>
      {session ? (
        <div>welcome {session.user.name}</div>
      ) : (
        <>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="flex flex-col justify-center items-center h-96">
              <button
                className="mx-auto py-2 px-4 bg-green-500 text-white rounded-full"
                onClick={() =>
                  // signIn(provider.id, { callbackUrl: 'http://localhost:3000/profile' })
                  signIn(provider.id, { callbackUrl: 'https://atansam.vercel.app/profile' })
                }
              >
                {provider.name} hesabınla oturum aç
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};
