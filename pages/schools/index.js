import React from 'react';
import SchoolCard from '@components/SchoolCard';
import { useSession } from 'next-auth/client';
import useSchools from '@utils/useSchools';
import useIntersectionObserver from '@utils/useIntersectionObserver';
function schools() {
  const [session, loading] = useSession();
  const {
    data,
    error,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSchools();
  console.log(data);
  console.log(hasNextPage);

  const loadMoreButtonRef = React.useRef();
  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  //rendering...
  if (!session) return <div>you are not authorised to see the content</div>;
  return (
    <div className="flex justify-center items-center flex-col">
      {status === 'loading' || loading ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-2">
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.docs.map((school) => (
                  <SchoolCard key={school._id} school={school} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <button
            ref={loadMoreButtonRef}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Yukleniyor...'
              : hasNextPage
              ? 'Daha fazla okul yukle'
              : 'Listenin sonuna geldiniz'}
          </button>
        </>
      )}
    </div>
  );
}

export default schools;
