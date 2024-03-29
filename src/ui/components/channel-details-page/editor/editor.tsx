import React, {
  FC, useCallback, useEffect, useRef,
} from 'react';

import { createCn } from 'bem-react-classname';

import { processItemClick } from '../editor';
import { renderText, escapeHtml } from '../../../helpers/text-helper';

import './editor.css';

const cn = createCn('editor');

const ACTIVE_CLASS = 'active';

interface IProps {
  content: string;
  isSaving: boolean;
  onSave: (text: string) => void;
}

type ActionFunc = (
  inputRef: React.RefObject<HTMLElement>,
  activeElement: HTMLElement,
) => void;

const topAction: ActionFunc = (inputRef, activeElement) => {
  inputRef.current.removeChild(activeElement);
  inputRef.current.prepend(activeElement);
};

const downAction: ActionFunc = (inputRef, activeElement) => {
  const nextElement = activeElement.nextElementSibling;
  if (!nextElement) {
    return;
  }
  inputRef.current.removeChild(activeElement);
  nextElement.parentNode.insertBefore(activeElement, nextElement.nextSibling);
};

const upAction: ActionFunc = (inputRef, activeElement) => {
  const prevElement = activeElement.previousElementSibling;
  if (!prevElement) {
    return;
  }
  inputRef.current.removeChild(activeElement);
  prevElement.parentNode.insertBefore(activeElement, prevElement);
};

const deleteAction: ActionFunc = (inputRef, activeElement) => {
  inputRef.current.removeChild(activeElement);
};

const actions = {
  up: upAction,
  down: downAction,
  delete: deleteAction,
  top: topAction,
};

function isPartnerEditable(el: HTMLElement) {
  const parent = el.parentElement;
  return parent && parent.getAttribute('contentEditable');
}

const Editor: FC<IProps> = ({ content, isSaving, onSave }) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(null);

  const setActiveElement = useCallback((el?: HTMLElement) => {
    if (!el) {
      return;
    }
    if (activeRef.current) {
      activeRef.current.classList.toggle(ACTIVE_CLASS);
    }
    activeRef.current = el;
    el.classList.toggle(ACTIVE_CLASS);
  }, []);

  const handleMouseClick = useCallback((e: MouseEvent) => {
    const el = e.target as HTMLTextAreaElement;
    if (isPartnerEditable(el)) {
      setActiveElement(el);
    }
  }, []);

  const handleOpenLink = useCallback((e: MouseEvent) => {
    if (!(e.ctrlKey || e.metaKey) || e.target === e.currentTarget || e.button !== 0) {
      return;
    }
    processItemClick(e);
  }, []);

  const handlePaste = (e: any) => {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, escapeHtml(text));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (![38, 40].includes(e.keyCode) || !activeRef.current) {
      return;
    }

    const prevElement = activeRef.current.previousElementSibling;
    const nextElement = activeRef.current.nextElementSibling;
    setActiveElement(e.keyCode === 38 ? prevElement : nextElement);
  };

  const handleSaveContent = useCallback(() => {
    const text = inputRef.current!.innerText
      .replace(/\n\n/g, '\n')
      .replace(new RegExp(String.fromCharCode(160), 'g'), ' ');
    onSave(text);
  }, [onSave]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    const currentRef = inputRef.current;
    if (content !== currentRef!.innerHTML) {
      currentRef!.innerHTML = renderText(content);
      currentRef.addEventListener('mousedown', handleOpenLink);
      currentRef.addEventListener('mousedown', handleMouseClick);
      currentRef.addEventListener('paste', handlePaste);
      currentRef.addEventListener('keydown', handleKeyDown);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      currentRef.removeEventListener('mousedown', handleOpenLink);
      currentRef.removeEventListener('mousedown', handleMouseClick);
      currentRef.removeEventListener('paste', handlePaste);
      currentRef.removeEventListener('keydown', handleKeyDown);
    };
  }, [content]);

  const handleControlClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const action = target.getAttribute('data-type');
    if (!activeRef.current || !actions[action]) {
      return;
    }
    actions[action](inputRef, activeRef.current, () => {});
  }, []);

  return (
    <section className={cn()}>
      <div className={cn('controls')}>
        <button
          type="button"
          data-type="top"
          onClick={handleControlClick}
        >
          Top
        </button>
        <button
          type="button"
          data-type="up"
          onClick={handleControlClick}
        >
          Up
        </button>
        <button
          type="button"
          data-type="down"
          onClick={handleControlClick}
        >
          Down
        </button>
        <button
          type="button"
          data-type="delete"
          onClick={handleControlClick}
        >
          Delete
        </button>
      </div>
      <div
        ref={inputRef}
        contentEditable="true"
        className={cn('content')}
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
};

export default Editor;
