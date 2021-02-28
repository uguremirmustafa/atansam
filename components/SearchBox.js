import { AppContext } from 'context/GlobalState';
import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
const iller = [
  {
    value: 'ALL',
    label: 'Tüm Iller',
  },
  {
    value: 'ADANA',
    label: 'ADANA',
  },
  {
    value: 'KASTAMONU',
    label: 'KASTAMONU',
  },
  {
    value: 'AFYONKARAHİSAR',
    label: 'AFYONKARAHİSAR',
  },
];
const ilceler = [
  {
    value: 'ALL',
    label: 'Tüm Iller',
  },
  {
    value: 'CİDE',
    label: 'CİDE',
  },
  {
    value: 'SİDE',
    label: 'SİDE',
  },
  {
    value: 'ÇATALZEYTİN',
    label: 'ÇATALZEYTİN',
  },
];
export default function SearchBox() {
  const { state, dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [il, setIl] = useState('');
  const [ilce, setIlce] = useState('');

  const changeHandler = (e) => {
    setIl(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
    dispatch({ type: 'SET_PROVINCE', payload: selected });
  };

  return (
    <div className="fixed top-12 md:top-30 w-full md:w-56 flex justify-center bg-white mt-4 pb-4 md:mt-0 md:p-0 md:bg-transparent shadow-md md:shadow-none z-index-0">
      <form onSubmit={onSubmit} className="flex flex-start shadow-md">
        <input
          type="text"
          value={searchTerm}
          placeholder="Okul adıyla ara..."
          onChange={changeHandler}
          className="h-10 px-4 bg-blue-200 font-normal text-black outline-none rounded-l  sm:w-56 md:w-56 active:bg-blue-50 focus:bg-blue-50"
        />
        <select name="il" id="il" className="w-40" value={selected} onChange={changeHandler}>
          {iller.map((i) => {
            return (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            );
          })}
        </select>
        <select name="il" id="il" className="w-40" value={selected} onChange={changeHandler}>
          {ilceler.map((i) => {
            return (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          disabled={selected === ''}
          className="h-10 px-4 text-white bg-blue-400 font-bold rounded-r hover:bg-blue-500"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
