import { AppContext } from 'context/GlobalState';
import React, { useState, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
export default function SearchBox() {
  const { state, dispatch } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  };

  return (
    <div className="fixed top-20 sm:top-2">
      <form onSubmit={onSubmit} className="flex flex-start shadow-md">
        <input
          type="text"
          value={searchTerm}
          placeholder="Okul adıyla ara..."
          onChange={changeHandler}
          className="h-12 px-4 bg-blue-200 font-normal text-black outline-none rounded-l  sm:w-56 md:w-56 active:bg-blue-50 focus:bg-blue-50"
        />
        <button
          type="submit"
          className="h-12 px-4 text-white bg-blue-400 font-bold rounded-r hover:bg-blue-500"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
