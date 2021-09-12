import React, { useCallback, useState, useEffect } from 'react';
import { createCn } from 'bem-react-classname';

import LoginModel, { LoginInterface } from './LoginModel';

import { authUser } from '../../../application/auth-user';
import './login.css';

const cn = createCn('login');
let loginModel: LoginInterface = new LoginModel('', '');

export default function Login() {
  useEffect(() => {
    loginModel = new LoginModel('', '');

    return () => {
      loginModel = new LoginModel('', '');
    }
  }, [])
  const [login, setLogin] = useState(loginModel.login);
  const [password, setPassword] = useState(loginModel.password);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.name === 'login') {
      loginModel.login = event.target.value;
      setLogin(event.target.value);
    } else {
      loginModel.password = event.target.value;
      setPassword(loginModel.password);
    }
  }, [login, password]);

  const submitLogin = useCallback((e) => {
    e.preventDefault();
    authUser(login, password)
  }, [login, password])

  return (
    <div className={cn()}>
      <form>
        <label htmlFor="login">
          Login:
        </label>
          <input
            type="text"
            name="login"
            value={login}
            onChange={handleChange}
          />
        <label htmlFor="password">
          Password:
        </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />

          <button
            type='submit'
            disabled={ !loginModel.isSubmitEnable() }
            onClick={submitLogin}
          > Login </button>
      </form>
    </div>
  )
}