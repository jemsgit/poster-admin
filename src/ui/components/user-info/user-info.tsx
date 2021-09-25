import React from 'react';
import { IUserStore } from '../../../services/store/user-store';

interface IProps {
  user: IUserStore
}

export default function UserInfo(props: IProps) {
  const { user: { name } } = props;
  return (
    <div>
      <span>{ name }</span>
    </div>
  );
}
