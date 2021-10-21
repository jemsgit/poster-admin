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

import { renderText, escapeHtml } from '../../helpers/text-helper';

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
    if (!(e.ctrlKey || e.metaKey) || e.target === e.currentTarget || e.button !== 0) {
      return;
    }
    processItemClick(e);
  }, []);

  const handleContextClick = useCallback((e: MouseEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, []);

  const handlePaste = (e: any) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, escapeHtml(text));
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const currentRef = inputRef.current;
    if (content !== currentRef.innerHTML) {
      currentRef!.innerHTML = renderText(content);
      currentRef.addEventListener('mousedown', handleOpenLink);
      currentRef.addEventListener('contextmenu', handleContextClick);
      currentRef.addEventListener('paste', handlePaste);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      currentRef.removeEventListener('mousedown', handleOpenLink);
      currentRef.removeEventListener('contextmenu', handleContextClick);
      currentRef.removeEventListener('paste', handlePaste);
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
    const text = inputRef.current!.innerText.replace(/\n\n/g, '\n');
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
