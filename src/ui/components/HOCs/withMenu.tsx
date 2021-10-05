/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserInfo from 'Components/user-info/user-info';
import { useStore } from '../../hooks/useStore';
import { useLogout } from '../../../application/auth-user';

import './with-menu.css';

const Menu: FC = observer(() => {
  const user = useStore((state) => state.user);
  const { logout } = useLogout();
  const handleLogout = useCallback((e) => {
    e.preventDefault();
    logout();
  }, [logout]);

  if (user.isAuth) {
    return (
      <div className="menu">
        <nav>
          <Link to="/channels">Channels</Link>
          <Link to="/logout" onClick={handleLogout}>Logout</Link>
        </nav>
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
