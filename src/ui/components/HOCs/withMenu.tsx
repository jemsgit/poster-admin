/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import UserInfo from 'Components/user-info/user-info';
import { useStore } from '../../hooks/useStore';

const Menu: FC = observer(() => {
  const user = useStore((state) => state.user);
  if (user.isAuth) {
    return (
      <div>
        <nav>
          <Link to="/channels">Channels</Link>
          <Link to="/logout">Logout</Link>
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
      <WrapedComponent {...props} />
    </>
  );
}

export default withMenu;
