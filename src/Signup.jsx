import React, { useContext } from 'react';
import { Formik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
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
    <>
      <Link to="/login">{t('login')}</Link>
      <Formik
        initialValues={{ username: '', password: '', passwordRepeat: '' }}
        validate={(values) => {
          const result = {};
          if (values.password !== values.passwordRepeat) {
            result.password = 'passwords must match';
          }

          return result;
        }}
        validationSchema={object({
          username: string().required().min(3).max(20),
          password: string().required().min(6),
          passwordRepeat: string().required(),
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          axios.post('/api/v1/signup', values)
            .then(({ data }) => {
              const newAuthContext = {
                isAuthenticated: true,
                ...data,
              };
              setAuthContext(newAuthContext);
              localStorage.setItem('user', JSON.stringify(newAuthContext));
              navigate('/');
            })
            .catch((e) => {
              setSubmitting(false);
              if (e.response.data.statusCode === 409) {
                setErrors({ username: 'username already exists' });
              } else {
                setErrors({ username: 'failed to sign up' });
              }
            });
        }}
      >
        {
          ({ values, errors, touched, handleChange, handleSubmit }) => (
            <form className="w-50" onSubmit={handleSubmit}>
              <h1 className="text-center mb-4">{t('registration')}</h1>
              <div className="form-floating mb-3 form-group">
                <label className="form-label" htmlFor="username">
                  {t('username')}
                  <input
                    placeholder={t('3-to-20-chars')}
                    name="username"
                    autoComplete="username"
                    required=""
                    id="username"
                    className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                    value={values.username}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.username}
                  </div>
                </label>
              </div>
              <div className="form-floating mb-3 form-group">
                <label className="form-label" htmlFor="password">
                  {t('password')}
                  <input
                    placeholder={t('min-6-chars')}
                    name="password"
                    autoComplete="new-password"
                    required=""
                    type="password"
                    id="password"
                    className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                </label>
              </div>
              <div className="form-floating mb-3 form-group">
                <label className="form-label" htmlFor="passwordRepeat">
                  {t('repeat-password')}
                  <input
                    placeholder={t('min-6-chars')}
                    name="passwordRepeat"
                    autoComplete="new-password"
                    required=""
                    type="password"
                    id="passwordRepeat"
                    className={`form-control ${errors.passwordRepeat && touched.passwordRepeat ? 'is-invalid' : ''}`}
                    value={values.passwordRepeat}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    {errors.passwordRepeat}
                  </div>
                </label>
              </div>
              <button type="submit" className="w-100 btn btn-outline-primary">{t('register')}</button>
            </form>
          )
        }
      </Formik>
    </>
  );
};
