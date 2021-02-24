import { AppContext } from 'context/GlobalState';
import React, { useContext } from 'react';
import ModalForm from './ModalForm';
function Modal({ id, userId, okulAdi }) {
  const { state } = useContext(AppContext);
  return (
    <div
      className={`modal fixed top-0 left-0 h-screen w-screen justify-center items-center ${
        state.modalOpen ? 'flex' : 'hidden'
      }`}
    >
      <div className="bg-blue-400 rounded overflow-hidden">
        <ModalForm id={id} userId={userId} okulAdi={okulAdi} />
      </div>
    </div>
  );
}

export default Modal;
