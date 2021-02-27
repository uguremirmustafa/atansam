import { useAddSchoolToTercihs } from '@utils/mutations';
import { AppContext } from 'context/GlobalState';
import React, { useContext, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const ModalForm = ({ id, userId, okulAdi }) => {
  const { dispatch } = useContext(AppContext);
  const add = useAddSchoolToTercihs();

  const [tercihSirasi, setTercihSirasi] = useState('');
  const handleChange = (e) => {
    setTercihSirasi(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    add.mutate({ id, userId, okulAdi, tercihSirasi });
    dispatch({ type: 'OPEN_MODAL', payload: false });
    setTercihSirasi('');
  };
  return (
    <div>
      <div className="w-full flex justify-between h-12 items-center p-4 text-white font-bold">
        <div>Tercihini yap</div>
        <div
          className="p-1 border-2 rounded border-blue-100 cursor-pointer"
          onClick={() => {
            dispatch({ type: 'OPEN_MODAL', payload: false });
            setTercihSirasi('');
          }}
        >
          <FaTimesCircle size="18px" />
        </div>
      </div>
      <form
        className="bg-blue-200 h-60 w-80 flex flex-col justify-center items-center"
        onSubmit={onSubmit}
      >
        <h3 className="mb-2 font-bold text-xl">{okulAdi}</h3>
        <p>Bu okulu tercih sıranızda kaçıncı sıraya koymak istersiniz?</p>
        <input
          type="number"
          className="bg-blue-50 p-2 rounded my-2 outline-none font-bold w-36"
          value={tercihSirasi}
          onChange={handleChange}
          placeholder="tercih sırası"
          min="1"
          max="40"
        />
        <span className="text-xs">tercih sırası 1 ile 40 arasinda olabilir</span>
        <button type="submit" className="bg-blue-400 py-2 px-4 rounded my-2 font-bold text-white">
          Tercih Yap
        </button>
      </form>
    </div>
  );
};

export default ModalForm;
