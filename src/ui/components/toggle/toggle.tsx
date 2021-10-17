/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import { createCn } from 'bem-react-classname';

import './toggle.css';

interface IProps {
  isChecked: boolean;
  onChange: (data: any) => void;
}

const cn = createCn('toggle');

const Toggle: FC<IProps> = ({ isChecked, onChange }) => (
  <div className={cn({ checked: isChecked })}>
    <input
      id="toggle"
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className={cn('input')}
    />
    <label htmlFor="toggle" className={cn('label')} />
  </div>
);

export default Toggle;
