/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserInfo from 'Components/user-info/user-info';
import Toggle from 'Components/toggle/toggle';
import { useStore } from '../../hooks/useStore';
import { useLogout } from '../../../application/auth-user';
import useTheme from '../../hooks/useTheme';

import './with-menu.css';

const Menu: FC = observer(() => {
  const user = useStore((state) => state.user);
  const { theme, setAppTheme } = useTheme();
  const { logout } = useLogout();
  const handleLogout = useCallback((e) => {
    e.preventDefault();
    logout();
  }, [logout]);

  const handleThemeChange = useCallback((e: any) => {
    setAppTheme(e.target.checked ? 'dark' : 'white');
  }, [setAppTheme]);

  const isWhiteTheme = theme !== 'white';

  if (user.isAuth) {
    return (
      <div className="menu">
        <nav>
          <Link to="/channels">Channels</Link>
          <Link to="/logout" onClick={handleLogout}>Logout</Link>
        </nav>
        <Toggle
          isChecked={isWhiteTheme}
          onChange={handleThemeChange}
        />
        <UserInfo user={user} />
      </div>
    );
  } return undefined;
});

function withMenu(WrapedComponent: FC, props: any) {
  return (
    <>
      <Menu />
      <div className="page">
        <WrapedComponent {...props} />
      </div>
    </>
  );
}

export default withMenu;
