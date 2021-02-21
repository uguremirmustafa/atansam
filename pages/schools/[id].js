import React from 'react';
import { getData } from '@utils/fetchData';
import NextLink from 'next/link';

function Okul(props) {
  const { school, error } = props;
  return (
    <div className="flex flex-col space-between w-100%">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="p-4 text-center text-xl">
          <p>{school.name}</p>
          <p>kontenjan: {school.kont}</p>
          <p>tercih edenler: {JSON.stringify(school.tercihEdenler, null, 2)}</p>
          <NextLink href="/schools">okullara geri don</NextLink>
        </div>
      )}
    </div>
  );
}

export default Okul;

export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const res = await getData(`school/${id}`);
    console.log(res);
    return { props: { school: res.data } };
  } catch (error) {
    return { props: { error: 'hata' } };
  }
}
