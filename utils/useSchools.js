const { useQuery } = require('react-query');

export default function useSchools() {
  return useQuery('schools', async () => {
    const data = await fetch('/api/school');
    return data.json();
  });
}
