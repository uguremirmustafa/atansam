const { useQuery } = require('react-query');
import axios from 'axios';

export default function usePaginatedSchools(searchTerm, page) {
  return useQuery(
    ['schools', searchTerm],
    async ({ pageParam = page }) => {
      const res = await axios.get(
        `/api/school?perPage=${24}&page=${pageParam}&search=${searchTerm}`
      );
      return res.data;
    },
    { keepPreviousData: true, staleTime: 5000 }
    // {
    //   getNextPageParam: (lastPage) => lastPage.data.nextPage ?? false,
    // }
  );
}
//
