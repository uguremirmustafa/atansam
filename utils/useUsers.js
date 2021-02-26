import { useQuery } from 'react-query';

export const useUsers = (email) =>
  useQuery(
    'fetchAllUsers',
    async () => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      const data = await res.json();
      return data;
    },
    {
      enabled: !!email,
    }
  );
