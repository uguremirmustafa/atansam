import { useSession } from 'next-auth/client';
import { useQuery } from 'react-query';

function profile() {
  const [session, loading] = useSession();
  const email = session?.user.email;
  const { isLoading, error, data, isFetching } = useQuery(['user', email], async () => {
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    const data = await res.json();
    return data;
  });

  return (
    <div>
      {loading || (isLoading && <p>Loading...</p>)}
      {session && <p>{session.user.email}</p>}
      <div>{JSON.stringify(data?.data, null, 2)}</div>
    </div>
  );
}
export default profile;
