import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';

const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export default () => (
  <div>
    <Formik
      initialValues={{ username: '', password: '' }}
      validate={(values) => {
        const errors = {};
        try {
          loginSchema.validateSync(values, { abortEarly: false });
        } catch (e) {
          e.inner.forEach((err) => {
            errors[err.path] = err.message;
          });
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2));
        setTimeout(() => {
          setSubmitting(false);
        }, 4000);
      }}
    >
      {
        ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
              Submit
            </button>
          </form>
        )
      }
    </Formik>
  </div>
);