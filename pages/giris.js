import { providers, signIn, useSession } from 'next-auth/client';

export default function SignIn({ providers }) {
  const [session, loading] = useSession();
  if (loading) return <div>loading</div>;
  return (
    <>
      {session ? (
        <div>welcome {session.user.name}</div>
      ) : (
        <>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="btn p-4" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
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
