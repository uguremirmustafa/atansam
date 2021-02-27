import React, { useContext } from 'react';
import SchoolCard from '@components/SchoolCard';
import { useSession } from 'next-auth/client';
import useSchools from '@utils/useSchools';
import useIntersectionObserver from '@utils/useIntersectionObserver';
import SearchBox from '@components/SearchBox';
import { AppContext } from 'context/GlobalState';
import { useRouter } from 'next/router';
import { useUser } from '@utils/useUser';
import Loading from '@components/loaders/Loading';
import Link from 'next/link';
// import { Adsense } from '@components/advertisement/AdBanner';

function schools() {
  const router = useRouter();
  const { state } = useContext(AppContext);
  const [session, loading] = useSession();
  const {
    data,
    error,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools(state.searchTerm);
  const email = session?.user.email;
  const { data: user, error: userError, status: userStatus } = useUser(email);
  const userId = user?.data?._id;
  // if (!userId) {
  //   router.push('/profile');
  // }

  const loadMoreButtonRef = React.useRef();
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

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
      {status === 'loading' || loading || true ? (
        <Loading />
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {/* <Adsense /> */}
          <SearchBox />
          <div className=" grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-20 md:mt-2">
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.docs.map((school) => (
                  <SchoolCard key={school._id} school={school} email={session?.user.email} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <button
            ref={loadMoreButtonRef}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="p-2 bg-blue-400 font-bold text-white mb-16 shadow-md mt-8 rounded font-bold"
          >
            {isFetchingNextPage
              ? 'Yükleniyor...'
              : hasNextPage
              ? 'Daha fazla okul yükle'
              : 'Listenin sonuna geldiniz. Arama butonuna tıklayarak tüm okulları tekrar görebilirsiniz!'}
          </button>
        </>
      )}
    </div>
  );
}

export default schools;
