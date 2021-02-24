import React from 'react';
import { Formik } from 'formik';

const Profil = ({ email }) => {
  return (
    <div>
      <Formik
        initialValues={{ tercihSirasi: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.derece) {
            errors.derece = 'dereceni girmeden devam edemeyiz';
          }
          // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          //   errors.email = 'Invalid email address';
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="number"
              name="tercihSirasi"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.derece}
              placeholder="tercihSirasi giriniz"
              className="h-8 bg-gray-50 rounded border-2 p-4 border-gray-300"
            />

            {errors.tercihSirasi && touched.tercihSirasi && errors.tercihSirasi}

            {update.isLoading ? (
              'Kaydediliyor...'
            ) : (
              <>
                {update.isError ? <div>An error occurred: {update.error.message}</div> : null}

                {update.isSuccess ? <div>Kaydedildi</div> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-400 font-bold p-2 rounded shadow-md text-white"
                >
                  Bilgilerimi Kaydet
                </button>
              </>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profil;
