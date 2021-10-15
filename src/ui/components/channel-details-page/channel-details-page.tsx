import React, {
  FC, useCallback, useEffect, useState, useRef,
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

import { renderText } from '../../helpers/text-helper';

import { processItemClick } from './editor';
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
    isSaving, isLoading, files, channelId,
  } = channelDetailsStore;
  const [editFile, setEditFile] = useState(undefined);
  const [content, setContent] = useState('');
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getChannelDetails(match.params.id);
  }, []);

  const handleOpenLink = useCallback((e: MouseEvent) => {
    if (!e.altKey || e.target === e.currentTarget) {
      return;
    }

    processItemClick(e);
  }, []);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    if (content !== inputRef.current!.innerHTML) {
      inputRef.current!.innerHTML = renderText(content);
      inputRef.current.addEventListener('click', handleOpenLink);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      inputRef.current.removeEventListener('click', handleOpenLink);
    };
  }, [content, handleOpenLink]);

  const handleFileSelect = useCallback((
    e: React.MouseEvent<HTMLAnchorElement>,
    file: ChannelFile,
  ) => {
    e.preventDefault();
    setEditFile(file.name);
    setContent(file.content);
  }, [content]);

  const handleSaveContent = useCallback(() => {
    saveChannelFileContent(channelId, editFile, inputRef.current!.innerText);
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
    <section className={cn('editor')}>
      <div
        ref={inputRef}
        contentEditable="true"
        className={cn('editor-content')}
      />
      <button
        type="button"
        className={cn('save-button')}
        onClick={handleSaveContent}
        disabled={isSaving}
      >
        Save
      </button>
    </section>
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
