import Loading from '@components/loaders/Loading';
import UserCard from '@components/user/UserCard';
import { useUsers } from '@utils/useUsers';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function Admin({ data, success }) {
  const router = useRouter();
  useEffect(() => {
    if (!success) {
      router.push('/');
    }
  }, [success]);
  const userEmail = data?.user.email;
  const { data: users, isLoading, error } = useUsers(userEmail);
  return (
    <div>
      {isLoading && <Loading />}
      {error && <div>hata olustu {error}</div>}
      <div className="px-2 place-items-center grid gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {users && users.data.map((i) => <UserCard key={i._id} user={i} />)}
      </div>
    </div>
  );
}

export default Admin;

export async function getServerSideProps(req, res) {
  const session = await getSession(req);
  if (session?.user.email !== 'uguremirmustafa@gmail.com') {
    return { props: { data: 'admin degilsin', success: false } };
  } else {
    return { props: { data: session, success: true } };
  }
}
