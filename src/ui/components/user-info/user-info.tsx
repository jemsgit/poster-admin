import React from 'react';
import { IUserStore } from '../../../services/store/user-store';

import './user-info.css';

interface IProps {
  user: IUserStore
}

export default function UserInfo(props: IProps) {
  const { user: { name } } = props;
  return (
    <div className="user-info">
      <div className="user-info__userpic"> </div>
      <span>{ name }</span>
    </div>
  );
}
