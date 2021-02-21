import SchoolCard from '@components/SchoolCard';
import { fetcher } from '@utils/fetcher';
import { useSession } from 'next-auth/client';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useSchools from '@utils/useSchools';
function schools() {
  const [session, loading] = useSession();
  const { data: schools, error, status, isFetching } = useSchools();

  if (loading) return <div>loading...</div>;
  if (!session) return <div>you are not authorised to see the content</div>;
  if (error) return <div>sth went wrong</div>;
  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-2">
        {schools?.data.map((school) => (
          <SchoolCard key={school._id} school={school} />
        ))}
      </div>
    </div>
  );
}

export default schools;
