import React, { useContext } from 'react';
import { Formik, useField } from 'formik';
import { AppContext } from 'context/GlobalState';
import { useRouter } from 'next/router';
const Profil = ({ data }) => {
  console.log(data?.data.cities);
  const router = useRouter();
  const { query } = router;
  console.log(query);
  const initialValues = {
    il: query.il || 'all',
    // ilce: query.ilce || 'all',
    searchTerm: query.searchTerm || '',
  };
  const { state, dispatch } = useContext(AppContext);
  const iller = [...data?.data.cities];

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          router.push(
            {
              pathname: '/schools',
              query: {
                il: values.il,
                // ilce: values.ilce,
                search: values.searchTerm,
              },
            },
            undefined,
            {
              shallow: true,
            }
          );
          dispatch({ type: 'SET_CLICKED', payload: true });

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-2">
            <input
              type="text"
              name="searchTerm"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.searchTerm}
              placeholder="Okul adıyla ara..."
              className="h-10 px-4 bg-blue-200 font-normal text-black outline-none rounded-l  sm:w-56 md:w-56 active:bg-blue-50 focus:bg-blue-50"
            />
            <select
              name="il"
              id="il"
              className="w-40"
              value={values.il}
              onChange={handleChange}
              className="h-10 px-4 bg-blue-200 font-normal text-black outline-none rounded-l  sm:w-56 md:w-56 active:bg-blue-50 focus:bg-blue-50"
            >
              {iller.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            {/* <select
              name="ilce"
              id="ilce"
              className="w-40"
              value={values.ilce}
              onChange={handleChange}
              className="h-10 px-4 bg-blue-200 font-normal text-black outline-none rounded-l  sm:w-56 md:w-56 active:bg-blue-50 focus:bg-blue-50"
            >
              {ilceler.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select> */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-400 font-bold p-2 rounded shadow-md text-white"
            >
              Ara
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export function IlceSelect(props) {
  const [field] = useField({
    name: props.name,
  });
  return <select name="ilce" id="ilce" {...field} {...props}></select>;
}
export default Profil;
