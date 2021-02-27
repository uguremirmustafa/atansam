import CommentCard from '@components/comments/CommentCard';
import Loading from '@components/loaders/Loading';
import Profil from '@components/ProfileForm';
import getSchoolsWithMyComments from '@utils/getSchoolsWithMyComments';

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
  const { data: schoolsCommented, isLoading: schoolsCommentedLoading } = getSchoolsWithMyComments(
    email
  );
  schoolsCommented && console.log(schoolsCommented);
  console.log(schoolsCommentedLoading);
  //rendering
  if (error) return <div>{error}</div>;
  return (
    <div className="mb-8">
      {loading || (isLoading && <Loading />)}
      {session && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
          <div className="p-4 bg-white rounded shadow-md ">
            <h3 className="text-center font-bold mb-2 text-xl">Profil Bilgilerim</h3>
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
            <h3 className="text-center font-bold mb-2 text-xl">Tercih Listem</h3>
            {data?.data.tercihler
              .sort((a, b) => a.tercihSirasi - b.tercihSirasi)
              .map((i, ind) => (
                <Link href={`/schools/${i.school}`} key={ind}>
                  <div className="flex justify-between cursor-pointer py-2 px-2 bg-blue-100 my-1 items-center rounded hover:text-blue-400 text-blue-600 transition duration-300 ease-in-out text-xs">
                    <div>{i.okulAdi}</div>
                    <div>tercih sirasi: {i.tercihSirasi}</div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="bg-white p-4 w-full md:col-span-2">
            <h3 className="text-center font-bold mb-2 text-xl">Yorumlarım</h3>
            {schoolsCommentedLoading && <Loading />}
            {schoolsCommented?.data.map((i) => {
              return (
                <div key={i._id} className="grid overflow-hidden mb-2 rounded">
                  <Link href={`/schools/${i._id}`}>
                    <div className=" bg-red-200 p-1 rounded-t cursor-pointer text-red-900 hover:text-red-700 transition duration-300 ease-in-out">
                      {i.name}
                    </div>
                  </Link>
                  {i.yorumlar
                    .filter((i) => i.kullanici === email)
                    .map((i) => (
                      <p key={i._id} className="p-1 bg-red-50 truncate border-b-2 border-red-100">
                        {i.yorum}
                      </p>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default profile;
