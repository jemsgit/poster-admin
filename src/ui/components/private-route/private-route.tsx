import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../hooks/useStore';

export const PrivateRoute: FC<React.PropsWithChildren<{}>> = (props) => {
  const store = useStore();
  if (store.user.isAuth) {
    return <>{props.children}</>;
  } return <Redirect to="/login" />;
};

export default observer(PrivateRoute);
