import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useSession } from 'next-auth/client';
import { useUser } from '@utils/useUser';
import useSchool from '@utils/useSchool';
import BackToSchool from '@components/buttons/BackToSchool';
import { addTercihToUser, useAddSchoolToTercihs } from '@utils/mutations';
import { useRemoveSchoolFromTercihs } from '@utils/mutations';
import Fetching from '@components/loaders/Fetching';
import Loading from '@components/loaders/Loading';
import { AppContext } from 'context/GlobalState';
import Modal from '@components/modal/Modal';
import ModalForm from '@components/modal/ModalForm';
import TercihEdenlerTable from '@components/table/TercihEdenlerTable';
function Okul() {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();
  const email = session?.user.email;

  //get user
  const { data: user, error: userError, status: userStatus } = useUser(email);
  const userId = user?.data?._id;

  //get school
  const { data: school, error: schoolError, status: schoolStatus } = useSchool(id, userId);
  const okulAdi = school?.data.name;
  const add = useAddSchoolToTercihs();
  const remove = useRemoveSchoolFromTercihs();
  return (
    <>
      <div className="px-4 py-2">
        {(userStatus || schoolStatus) === 'loading' || loading ? (
          <Loading />
        ) : (userStatus || schoolStatus) === 'error' ? (
          <span>
            Error: {schoolError.message} , {userError.message}
          </span>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <Fetching />
            <div className="p-4 bg-white rounded shadow-md text-center h-60">
              <Modal id={id} userId={userId} okulAdi={okulAdi} />
              <div className="text-xl font-bold my-2">{school?.data.name}</div>
              {/* <div className="text-xl font-bold my-2">{school?.data._id}</div> */}
              <div>{school?.data.il}</div>
              <div>{school?.data.ilce}</div>
              <div>Kontenjan: {school?.data.kont}</div>
              {!user?.data.sinavSiralamasi ? (
                <div>OABT siralamani girmeden tercih yapamazsin</div>
              ) : (
                <div className="flex justify-center">
                  <button
                    className="bg-green-400 p-3 m-2 rounded shadow-md cursor-pointer hover:shadow-lg font-bold text-white flex items-center"
                    onClick={() => {
                      dispatch({ type: 'OPEN_MODAL', payload: true });
                    }}
                  >
                    <FaPlus size="16px" style={{ marginRight: '8px' }} /> Tercih Et
                  </button>
                  <button
                    className="bg-red-400 p-3 m-2 rounded shadow-md cursor-pointer hover:shadow-lg font-bold text-white flex items-center"
                    onClick={() => {
                      remove.mutate({ id, userId });
                    }}
                  >
                    <FaMinus size="16px" style={{ marginRight: '8px' }} /> Tercihi Kaldır
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 bg-white rounded shadow-md">
              <h3 className="text-center font-bold my-2 text-xl">Tercih Edenler</h3>
              {!user?.data.sinavSiralamasi ? (
                <div>OABT siralamani girmeden bu okulu tercih edenleri goremezsin</div>
              ) : (
                <TercihEdenlerTable school={school} />
              )}
            </div>
          </div>
        )}
        <BackToSchool />
      </div>
    </>
  );
}

export default Okul;
