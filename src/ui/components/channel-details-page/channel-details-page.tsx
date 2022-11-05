import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
// import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { createCn } from 'bem-react-classname';
import { IChannelDetailsStore } from 'services/store/channel-files-store';
import { useStore } from '../../hooks/useStore';
import { getChannelDetails } from '../../../application/get-channels';
import { saveChannelFileContent } from '../../../application/save-channel-data';
import { ChannelFile } from '../../../domain/channel-details';

import Editor from './editor/editor';

import './channel-details-page.css';

interface IProps<P> extends RouteComponentProps {
  match: Match<P>
}

interface Match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface MatchParams {
  id: string;
}

const cn = createCn('channel-details-page');

const ChannelDetailsPage: FC<IProps<MatchParams>> = ({ match }) => {
  const channelDetailsStore: IChannelDetailsStore = useStore((state) => state.channelDetailsStore);
  const {
    isSaving, isLoading, files, channelId, clearChannelData,
  } = channelDetailsStore;
  const [editFile, setEditFile] = useState(undefined);
  const [content, setContent] = useState('');

  useEffect(() => {
    getChannelDetails(match.params.id);
    return () => clearChannelData();
  }, []);

  const handleFileSelect = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    file: ChannelFile,
  ) => {
    e.preventDefault();
    setEditFile(file.name);
    setContent(file.content);
  }, [content]);

  const handleSaveContent = useCallback((text) => {
    saveChannelFileContent(channelId, editFile, text);
  }, [channelId, editFile]);

  const renderFileList = () => (
    <section>
      <ul className={cn('list')}>
        {
            files.map(
              (file) => (
                <li
                  key={file.name}
                >
                  <a
                    href="/"
                    onClick={(e) => handleFileSelect(e, file)}
                  >
                    {file.name}
                  </a>
                </li>
              ),
            )
          }
      </ul>
    </section>
  );

  const renderEditor = () => (
    <Editor
      content={content}
      onSave={handleSaveContent}
      isSaving={isSaving}
    />
  );

  const renderContent = () => (
    <main className={cn('content')}>
      { renderFileList() }
      { editFile ? renderEditor() : undefined }
    </main>
  );

  return (
    <div className={cn()}>
      <h3 className={cn('title')}> Details </h3>
      {
        isLoading ? <span>Loading</span> : renderContent()
      }
    </div>
  );
};

export default observer(ChannelDetailsPage);
