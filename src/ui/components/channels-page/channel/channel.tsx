import React, { FC, useCallback } from 'react';
import { createCn } from 'bem-react-classname';
import { IChannel } from '../../../../services/store/channel-store';

import './channel.css';

interface Props {
  data: IChannel,
  onSelect: (id: string) => void
}

const cn = createCn('channel');

const Channel: FC<Props> = ({ data, onSelect }) => {
  const {
    id, type, loadImage, times,
  } = data;
  const handleClick = useCallback(() => {
    onSelect(data.id);
  }, [data.id, onSelect]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.code === '13') {
      onSelect(data.id);
    }
  }, [data.id, onSelect]);
  return (
    <div
      className={cn()}
      onClick={handleClick}
      role="link"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <span className={cn('name')}>
        {id}
        :
        {' '}
        {type}
      </span>
      <span className={cn('params')}>
        Loading images:
        {loadImage}
      </span>
      <span className={cn('params')}>
        Time settings:
        {times.join(', ')}
      </span>
    </div>
  );
};

export default Channel;
