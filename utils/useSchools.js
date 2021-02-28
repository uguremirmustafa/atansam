const { useInfiniteQuery } = require('react-query');
import axios from 'axios';

export default function useSchools(searchTerm) {
  return useInfiniteQuery(
    ['schools', searchTerm],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `/api/school?perPage=${24}&page=${pageParam}&search=${searchTerm}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage ?? false,
      keepPreviousData: true,
    }
  );
}
