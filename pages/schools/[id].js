import React from 'react';
import { getData } from '@utils/fetchData';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import useSchool from '@utils/useSchool';
function Okul() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSchool(id);
  console.log(data);
  return (
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>
      <NextLink href="/schools">okullara geri don</NextLink>
    </div>
    // <div className="flex flex-col space-between w-100%">
    //   {error ? (
    //     <p>{error}</p>
    //   ) : (
    //     <div className="p-4 text-center text-xl">
    //       <p>{school.name}</p>
    //       <p>kontenjan: {school.kont}</p>
    //       <p>tercih edenler: {JSON.stringify(school.tercihEdenler, null, 2)}</p>
    //       <NextLink href="/schools">okullara geri don</NextLink>
    //     </div>
    //   )}
    // </div>
  );
}

export default Okul;

// export async function getServerSideProps(context) {
//   const id = context.query.id;
//   try {
//     const res = await getData(`school/${id}`);
//     console.log(res);
//     return { props: { school: res.data } };
//   } catch (error) {
//     return { props: { error: 'hata' } };
//   }
// }
