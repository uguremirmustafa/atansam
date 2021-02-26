const { useQuery } = require('react-query');

export default function getSchoolsWithMyComments(email) {
  return useQuery(
    ['commentedSchools', email],
    async () => {
      const res = await fetch(`/api/school`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      return data;
    },
    {
      enabled: !!email,
    }
  );
}
// export const yorumSil = async (params) => {
//   const { commentId, id } = params;
//   const res = await fetch(`/api/school/${id}/comments`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ commentId, id }),
//   });
//   const data = await res.json();
//   if (!data.success) {
//     alert(data.message);
//   }
//   return data;
// };
