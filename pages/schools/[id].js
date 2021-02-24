import React, { useState } from 'react';
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
function Okul() {
  const router = useRouter();
  const { id } = router.query;
  const [session, loading] = useSession();
  const email = session?.user.email;

  //get user
  const { data: user, error: userError, status: userStatus } = useUser(email);
  const userId = user?.data?._id;

  //get school
  const { data: school, error: schoolError, status: schoolStatus } = useSchool(id, userId);

  const add = useAddSchoolToTercihs();
  const remove = useRemoveSchoolFromTercihs();
  return (
    <div className="px-4 py-2">
      {(userStatus || schoolStatus) === 'loading' || loading ? (
        <Loading />
      ) : (userStatus || schoolStatus) === 'error' ? (
        <span>
          Error: {schoolError.message} , {userError.message}
        </span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Fetching />
          <div className="p-4 bg-white rounded shadow-md text-center">
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
                  className="bg-green-400 p-3 m-2 rounded shadow-md cursor-pointer hover:shadow-lg font-bold text-white"
                  onClick={() => {
                    add.mutate({ id, userId });
                  }}
                >
                  <FaPlus size="20px" />
                </button>
                <button
                  className="bg-red-400 p-3 m-2 rounded shadow-md cursor-pointer hover:shadow-lg font-bold text-white"
                  onClick={() => {
                    remove.mutate({ id, userId });
                  }}
                >
                  <FaMinus size="20px" />
                </button>
              </div>
            )}
          </div>
          <div className="p-4 bg-white rounded shadow-md">
            <h3 className="text-center font-bold my-2 text-xl">Tercih Edenler</h3>

            {!user?.data.sinavSiralamasi ? (
              <div>OABT siralamani girmeden bu okulu tercih edenleri goremezsin</div>
            ) : (
              <>
                {school?.data.tercihEdenler.length > 0
                  ? school?.data.tercihEdenler.map((i, ind) => (
                      <div key={ind} className="text-center">
                        {i.name} - {i.sinavSiralamasi}
                      </div>
                    ))
                  : 'kimse yazmamis'}
              </>
            )}
          </div>
        </div>
      )}
      <BackToSchool />
    </div>
  );
}

export default Okul;
