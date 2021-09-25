import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { useStore } from 'ui/hooks/useStore';

const Root: FC = () => {
  const isAuth: boolean = useStore((state) => state.user.isAuth);
  return <Redirect to={isAuth ? '/channels' : '/login'} />;
};

export default Root;
