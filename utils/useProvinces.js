import { useQuery } from 'react-query';

export const useProvinces = (il) =>
  useQuery(
    ['fetchAllProvinces', il],
    async () => {
      const res = await fetch(`/api/provinces?il=${il}`, {
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
      enabled: !!il,
      keepPreviousData: true,
    }
  );
