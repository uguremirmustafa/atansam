import { getData } from '@utils/fetchData';
import Link from 'next/link';
const Index = ({ schools }) => {
  console.log(schools);
  return (
    <div className="p-4 shadow rounded bg-gray-200">
      {schools.map((i) => (
        <p key={i._id}>{i.name}</p>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData('school');
  return { props: { schools: res.data } };
}

export default Index;
