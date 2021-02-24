const { useQuery } = require('react-query');

export default function useSchool(id, userId) {
  return useQuery(
    `school/${id}`,
    async () => {
      const data = await fetch(`/api/school/${id}`);
      return data.json();
    },
    { enabled: !!userId }
  );
}
