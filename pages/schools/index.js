import React, { useContext } from 'react';
import SchoolCard from '@components/SchoolCard';
import { useSession } from 'next-auth/client';
import { AppContext } from 'context/GlobalState';
import { useRouter } from 'next/router';
import { useUser } from '@utils/useUser';
import Loading from '@components/loaders/Loading';
import Link from 'next/link';
import { useQuery } from 'react-query';
import axios from 'axios';
import Filter from '@components/selectbox/Filter';

function schools() {
  const router = useRouter();
  const { query } = router;
  const { state } = useContext(AppContext);
  const [session, loading] = useSession();

  const uri = `/api/school?il=${encodeURIComponent(query.il) || 'hepsi'}&ilce=${
    encodeURIComponent(query.ilce) || 'hepsi'
  }&search=${query.search !== undefined ? encodeURIComponent(query.search) || '' : ''}`;
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ['schools', query],
    async () => {
      const res = await axios.get(uri);
      return res.data;
    },
    {
      keepPreviousData: true,
      staleTime: 500000,
      enabled: !!query,
      refetchOnWindowFocus: false,
    }
  );
  const email = session?.user.email;
  const { data: user, error: userError, status: userStatus } = useUser(email);
  const userId = user?.data?._id;

  //rendering...
  if (!session)
    return (
      <div className="text-center p-2 bg-white rounded">
        Okulları görmek için{' '}
        <Link href="/giris">
          <span className="text-blue-400 font-bold cursor-pointer ">giriş</span>
        </Link>{' '}
        yapmalısın!
      </div>
    );
  return (
    <div className="flex justify-center items-center flex-col">
      {status === 'loading' || loading ? (
        <Loading />
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <Filter isFetching={isFetching} status={status} />
          {/* {cities && <ProvinceSelect data={cities} />} */}
          {/* {data && JSON.stringify(data, null, 2)} */}
          <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-4 md:mt-10">
            {data?.data.map((i) => (
              <SchoolCard key={i._id} school={i} email={session?.user.email} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default schools;
