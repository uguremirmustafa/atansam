import { useQuery } from 'react-query';

export const useUser = (email) =>
  useQuery(
    'user',
    async () => {
      const res = await fetch('/api/user', {
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
