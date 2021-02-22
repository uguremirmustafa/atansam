const { useQuery, useInfiniteQuery } = require('react-query');
import axios from 'axios';
// export default function useSchools() {
//   return useQuery('schools', async () => {
//     const data = await fetch('/api/school');
//     return data.json();
//   });
// }
export default function useSchools() {
  return useInfiniteQuery(
    'schools',
    async ({ pageParam = 1 }) => {
      const res = await axios.get(`/api/school?perPage=${24}&page=${pageParam}`);
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage ?? false,
    }
  );
}
// export default function useSchools() {
//   return useQuery('schools', async () => {
//     const data = await fetch('/api/school', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     return data.json();
//   });
// }
