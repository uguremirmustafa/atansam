const { useQuery, QueryCache } = require('react-query');

export default function useSchool(id) {
  return useQuery(['school', id], async () => {
    const data = await fetch(`/api/school/${id}`);
    return data.json();
  });
}
