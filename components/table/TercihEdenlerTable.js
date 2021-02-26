import React from 'react';

function TercihEdenlerTable({ school }) {
  return (
    <div className="w-full ">
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-blue-200 h-16 border-b-4 border-blue-300">
            <th className="w-1/2 text-left px-2">Öğretmen</th>
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
                    <td className="text-left px-2 capitalize">{i.name}</td>
                    <td className="text-center px-2">{i.sinavSiralamasi}</td>
                    <td className="text-right px-2">
                      {ts.length > 0 && <span>{ts[0].tercihSirasi}</span>}
                    </td>
                  </tr>
                );
              })
          ) : (
            <div className="font-bold py-2 text-red-400">bu okulu henüz tercih eden olmamış</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TercihEdenlerTable;
