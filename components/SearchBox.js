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
      <form onSubmit={onSubmit} className="flex px-6 flex-start">
        <input
          type="text"
          value={searchTerm}
          placeholder="Acaba hangi okula atansam..."
          onChange={changeHandler}
          className="h-12 px-4 bg-blue-100 font-normal text-black outline-none rounded shadow-md sm:w-56 md:w-56"
        />
        <button
          type="submit"
          className="h-12 px-4 text-white bg-blue-400 font-bold rounded shadow-md"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
