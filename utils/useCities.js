import { useQuery } from 'react-query';

export const useCities = () =>
  useQuery(
    'fetchAllCities',
    async () => {
      const res = await fetch('/api/cities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    },
    {
      refetchOnMount: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false, //refetch when window comes to focus
      refetchOnReconnect: true, //refetch when browser reconnects to server
    }
  );
