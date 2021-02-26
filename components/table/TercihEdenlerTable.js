import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';

function TercihEdenlerTable({ school }) {
  return (
    <div className="w-full ">
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-blue-200 h-16 border-b-4 border-blue-300 text-xs md:text-base">
            <th className="w-2/3 text-left px-2">Öğretmen</th>
            <th className="w-1/4 text-center px-2">Derecesi</th>
            <th className="w-1/4 text-right px-2">
              Kaçıncı <br /> Tercihi
            </th>
          </tr>
        </thead>
        <tbody>
          {school?.data.tercihEdenler.length > 0 ? (
            school?.data.tercihEdenler
              .sort((a, b) => a.sinavSiralamasi - b.sinavSiralamasi)
              .map((i, ind) => {
                const ts = i.tercihler.filter((o) => o.school === school?.data._id);

                return (
                  <tr key={ind} className={`${ind % 2 === 0 ? 'bg-blue-50' : 'bg-blue-200'} h-8`}>
                    <td className="text-left px-2 lowercase text-xs md:text-sm flex py-2 items-center ">
                      {i.name.split(' ')[0]}{' '}
                      <a href={`mailto:${i.email}`}>
                        <FaRegEnvelope style={{ marginLeft: '4px' }} />
                      </a>
                    </td>
                    <td className="text-center px-2 text-xs md:text-sm">{i.sinavSiralamasi}</td>
                    <td className="text-right px-2 text-xs md:text-sm">
                      {ts.length > 0 && <span>{ts[0].tercihSirasi}</span>}
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr className="font-bold py-2 text-red-400">
              <td>bu okulu henüz tercih eden olmamış</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TercihEdenlerTable;
