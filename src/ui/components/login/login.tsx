/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState, FC } from 'react';
import { Redirect } from 'react-router-dom';
import { createCn } from 'bem-react-classname';

import { isSubmitEnable } from './login-logic';

import { useAuthenticate } from '../../../application/auth-user';
import './login.css';

const cn = createCn('login');

const Login: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isAuth, authenticate } = useAuthenticate();

  const handleLoginChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }, [login]);

  const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }, [password]);

  const submitLogin = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authenticate(login, password);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [login, password]);

  if (isAuth) {
    return <Redirect to="/channels" />;
  }

  return (
    <div className={cn()}>
      <form>
        <label
          htmlFor="login"
        >
          Login:
        </label>
        <input
          type="text"
          id="login"
          value={login}
          onChange={handleLoginChange}
        />
        <label htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button
          type="submit"
          disabled={!isSubmitEnable(login, password, isLoading)}
          onClick={submitLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
