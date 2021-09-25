import React, { FC, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createCn } from 'bem-react-classname';
import { IChannelStore } from 'services/store/channel-store';
import Channel from './channel/channel';
import { useStore } from '../../hooks/useStore';
import { getChanngels } from '../../../application/get-channels';

import './channels-page.css';

const cn = createCn('channels-page');

const ChannelsPage: FC = () => {
  const history = useHistory();
  useEffect(() => {
    getChanngels();
  }, []);

  const channelStore: IChannelStore = useStore((state) => state.channelStore);
  const { channels, isLoading } = channelStore;

  const onChannelSelect = useCallback((id: string) => {
    history.push(`/channel/${id}`);
  }, [history]);

  const renderContent = () => (
    <main className={cn('content')}>
      <section>
        <ul className={cn('list')}>
          {
            channels.map(
              (channel) => (
                <li key={channel.id}>
                  <Channel data={channel} onSelect={onChannelSelect} />
                </li>
              ),
            )
          }
        </ul>
      </section>
    </main>
  );

  return (
    <div className={cn()}>
      <h3 className={cn('title')}> Каналы </h3>
      {
      isLoading ? <span>Loading</span> : renderContent()
    }
    </div>
  );
};

export default observer(ChannelsPage);
