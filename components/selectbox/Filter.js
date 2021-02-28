import { useCities } from '@utils/useCities';
import { useProvinces } from '@utils/useProvinces';
import { AppContext } from 'context/GlobalState';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

function Filter({ isFetching, status }) {
  const router = useRouter();
  const { query } = router;
  const [effect, setEffect] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const [il, setIl] = useState(query.il);
  const [ilce, setIlce] = useState(query.ilce);
  const [search, setSearch] = useState(query.search || '');
  const { data: illerRaw } = useCities();
  const { data: ilcelerRaw, isLoading } = useProvinces(il);
  const iller = illerRaw && ['hepsi', ...illerRaw.data];
  const ilceler = ilcelerRaw && ['hepsi', ...ilcelerRaw.data];
  console.log(ilceler);
  const ilChange = (e) => {
    console.log(e.target.value);
    setIl(e.target.value);
    setIlce('hepsi');
    setSearch('');
  };
  const ilceChange = (e) => {
    setIlce(e.target.value);
  };
  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: '/schools',
        query: {
          il: il,
          ilce: ilce,
          search: search,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
    dispatch({ type: 'SET_CLICKED', payload: true });
  };
  return (
    <div className="w-80 z-index-0">
      <h3 className="p-2 font-bold text-center text-sm md:text-base">
        İl ve ilçe adıyla okulları ara
      </h3>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-center items-center md:flex-row z-index-0 text-xs md:text-sm lg:text-base "
      >
        <div className="flex w-60 md:mx-2 z-index-0">
          <div
            className={`justify-center  flex items-center w-20 bg-blue-200 text-gray-600 font-bold outline-none h-6 md:h-10 text-center rounded-l my-1 `}
          >
            İl
          </div>
          <select
            name="iller"
            id="iller"
            value={il}
            onChange={ilChange}
            className="bg-blue-400 w-40 text-white font-bold outline-none px-2 h-6 md:h-10 rounded-r my-1 appearance-none cursor-pointer focus:bg-green-500"
          >
            {iller?.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-60  z-index-0">
          <div
            className={`justify-center  flex items-center w-20 bg-blue-200 text-gray-600 font-bold outline-none h-6 md:h-10 text-center rounded-l my-1 ${
              il !== '' ? 'block' : 'hidden'
            }`}
          >
            İlçe
          </div>
          <select
            name="ilceler"
            id="ilceler"
            value={ilce}
            onChange={ilceChange}
            className={`bg-blue-400 w-40 text-white font-bold outline-none px-2 h-6 md:h-10 md:h-10 rounded-r my-1 appearance-none cursor-pointer focus:bg-green-500 ${
              il !== '' ? 'block' : 'hidden'
            }`}
          >
            {isLoading ? (
              <option key="loading">loading</option>
            ) : (
              ilceler?.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))
            )}
          </select>
        </div>
        <input
          type="text"
          value={search}
          onChange={searchChange}
          placeholder="Okul adı ile ara"
          className="bg-blue-200 text-gray-900 font-bold outline-none px-2 rounded w-60 md:w-40 md:mx-2  my-1 appearance-none focus:bg-yellow-200 h-6 md:h-10 md:h-10"
        />

        <button
          type="submit"
          className={`w-60 bg-yellow-400 font-bold text-gray-900 outline-none p-1 md:p-2 md:h-10 h-6 rounded my-1 flex justify-center items-center focus:outline-none hover:bg-yellow-300 ${
            il !== '' ? 'block' : 'hidden'
          }`}
          disabled={il === ''}
        >
          {status === 'loading' || isFetching ? (
            <div>Yükleniyor...</div>
          ) : (
            <>
              Ara <FaSearch style={{ marginLeft: '10px' }} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default Filter;
