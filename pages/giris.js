import Welcome from '@components/Welcome';
import { providers, signIn, useSession } from 'next-auth/client';

export default function SignIn({ providers }) {
  const [session, loading] = useSession();
  if (loading) return <div>loading</div>;
  // const callbackUrl =
  //   process.env.NODE_ENV === 'production'
  //     ? process.env.PRODUCTIONURL
  //     : `${process.env.BASE_URL}/profile`;

  return (
    <>
      {session ? (
        <div>welcome {session.user.name}</div>
      ) : (
        <>
          <div className="font-bold text-center mt-8 ">Heyecanla seni bekliyoruz...</div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name} className="flex flex-col justify-center items-center h-40">
              <button
                className="mx-auto py-2 px-4 bg-blue-400 font-bold text-white rounded-full"
                onClick={
                  () =>
                    signIn(provider.id, {
                      callbackUrl: 'https://atansam-okuloncesi.vercel.app/profile',
                    })
                  // signIn(provider.id, { callbackUrl: 'http://localhost:3000/profile' })
                }
              >
                {provider.name} hesabınla oturum aç
              </button>
            </div>
          ))}
          <Welcome />
          <span className="text-xs fixed bottom-10 text-center flex justify-center items-center">
            üye olarak google kullanıcı kimlik bilgilerinin(email, kullanıcı adı) ve profil
            güncellemelerinin üçüncü kişilerle paylaşılmasını onaylamış oluyorsunuz.
          </span>
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
