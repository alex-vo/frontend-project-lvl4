import React, { useContext } from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext.js';

const loginSchema = object({
  username: string().required(),
  password: string().required(),
});

export default () => {
  const { authContext, setAuthContext } = useContext(AuthContext);
  if (authContext.isAuthenticated) {
    return (
      <Navigate to="/"/>
    );
  }

  const navigate = useNavigate();
  return (
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
        onSubmit={(values, { setSubmitting, setErrors }) => {
          axios.post('/api/v1/login', values)
            .then(({ data }) => {
              const newAuthContext = {
                isAuthenticated: true,
                username: data.username,
                token: data.token,
              };
              setAuthContext(newAuthContext);
              localStorage.setItem('user', JSON.stringify(newAuthContext));
              navigate('/');
            })
            .catch(() => {
              setSubmitting(false);
              setErrors({ username: 'failed to login' });
            });
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
};
