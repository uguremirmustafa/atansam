import Loading from '@components/loaders/Loading';
import Profil from '@components/ProfileForm';
import useSchools from '@utils/useSchools';
import { useUser } from '@utils/useUser';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { useQuery } from 'react-query';

function profile() {
  const [session, loading] = useSession();
  const email = session?.user.email;
  const name = session?.user.name;
  const image = session?.user.image;

  const { isLoading, error, data, isFetching } = useUser(email);

  //rendering
  if (error) return <div>{error}</div>;
  return (
    <div>
      {loading || (isLoading && <Loading />)}
      {session && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-center font-bold my-2 text-xl">Profil Bilgilerim</h3>
            <div className="flex flex-col mb-2">
              <div className="flex flex-col md:flex-row md:justify-between bg-gray-100 py-2 px-4 mb-2  rounded">
                <p className="mr-2">Ad:</p>
                <p>{name}</p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between bg-gray-100 py-2 px-4  mb-2 rounded">
                <p className="mr-2">E-posta:</p>
                <p>{email}</p>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between bg-gray-100 py-2 px-4  mb-2 rounded">
                <p className="mr-2">Siralama:</p>
                <p>{data?.data.sinavSiralamasi}</p>
              </div>
            </div>
            {!data?.data.sinavSiralamasi && (
              <Profil email={email} derece={data?.data.sinavSiralamasi} />
            )}
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-center font-bold my-2 text-xl">Tercih Listem</h3>
            {data?.data.tercihler
              .sort((a, b) => a.tercihSirasi - b.tercihSirasi)
              .map((i, ind) => (
                <div
                  key={ind}
                  className="text-center flex justify-between cursor-pointer py-1 px-2 bg-blue-100 my-1 items-center rounded"
                >
                  <Link href={`/schools/${i.school}`}>
                    <div>{i.okulAdi}</div>
                  </Link>
                  <div>tercih sirasi: {i.tercihSirasi}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default profile;
