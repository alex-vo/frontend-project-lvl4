import React, { useContext } from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AuthContext from './AuthContext.jsx';

export default () => {
  const { authContext, setAuthContext } = useContext(AuthContext);
  if (authContext.isAuthenticated) {
    return (
      <Navigate to="/"/>
    );
  }

  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      {/* todo formik hook */}
      <Link to="/signup">{t('sign up')}</Link>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={object().shape({
          username: string().required(t('required')),
          password: string().required(t('required')),
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          setSubmitting(true);
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
                {t('login')}
              </button>
            </form>
          )
        }
      </Formik>
    </div>
  );
};
