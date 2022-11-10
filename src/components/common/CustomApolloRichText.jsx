import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import {
  EditorState,
  SelectionState,
  Modifier,
  convertToRaw,
  CompositeDecorator
} from 'apollo-react/node_modules/draft-js';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import TagUserList from './TagUserList';

import { QUESTION_UNLOCK_TIMEOUT } from '../../constants/app';
import featureFlags from '../../constants/featureFlags';

// CustomApolloRichText Utilities

/**
 * Function to find user tag pattern and return an object of pattering matching status
 * @param {editorState} EditorState
 * @returns {{ userQuery, offsetRange }}
 */
function getUserTagQueryInfo(editorState) {
  let queryInfo = {
    userQuery: null,
    offsetRange: { start: 0, end: 0 },
    anchorKey: null
  };

  const selectionState = editorState.getSelection();
  if (selectionState.isCollapsed()) {
    const anchorKey = selectionState.getAnchorKey();
    const anchorOffset = selectionState.getAnchorOffset();
    const blockOnSelection = editorState
      .getCurrentContent()
      .getBlockForKey(anchorKey);
    const blockText = blockOnSelection.text.substring(0, anchorOffset);
    const filteredTxt = blockText.split(' ').pop();
    const isValidTxt = filteredTxt.match(/^@[^@]*$/gi);
    if (isValidTxt) {
      queryInfo.userQuery = filteredTxt.substring(1);
      queryInfo.offsetRange = {
        start: anchorOffset - filteredTxt.length,
        end: anchorOffset
      };
      queryInfo.anchorKey = anchorKey;
    }
  }

  return queryInfo;
}

/**
 * DraftJS decorator strategy function to find entities of type 'MENTION'
 * @param {contentBlock} EditorState
 * @param {callback} callback
 * @param {contentState} contentState
 */
function handleUserTagStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'MENTION'
    );
  }, callback);
}

const mentionStyles = {
  color: '#0768fd'
};

// MENTION entity's component
function MentionComponent(props) {
  return (
    <span {...props} style={mentionStyles}>
      {props.children}
    </span>
  );
}

// decorator for DraftJS Editor Component
const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleUserTagStrategy,
    component: MentionComponent
  }
]);

// CustomApolloRichText Component
const CustomApolloRichText = ({
  questionId,
  richTextString,
  richTextVal,
  richTextHtml,
  placeholder,
  onBlur,
  onChange,
  onFocus,
  isEditable,
  enableFocus,
  className,
  error,
  disabled,
  canUserTagInQuestion
}) => {
  // Set initial blocks structure if only string available
  let richtextObject = richTextVal;
  if (richTextString && isEmpty(richTextVal?.blocks)) {
    richtextObject = {
      blocks: [
        {
          text: richTextString,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ],
      entityMap: {}
    };
  }

  // Initial Richtext Data
  const INITIAL_DATA = useMemo(
    () => ({
      text: richTextString,
      value: richtextObject,
      html: richTextHtml
    }),
    [richTextString, richTextHtml]
  );

  // Component State
  const [richTextData, setRichTextData] = useState(INITIAL_DATA);
  const [isRichTextEditable, setIsRichTextEditable] = useState(isEditable);
  const [unlockTimeout, setUnlockTimeout] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTag, setSearchTag] = useState(null);
  const [queryStringRange, setQueryStringRange] = useState({
    start: 0,
    end: 0
  });
  const [anchorKey, setAnchorKey] = useState(null);

  // Component Refs
  const richTextContainerRef = useRef(null);
  const richTextEditorRef = useRef(null);
  const richTextKeyRef = useRef(uuid());

  /**
   * Function to Add Delay for Specific Seconds
   */
  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   *
   * @param {*} clear to remove the timer
   * function to set timer for auto unlock and auto save
   */
  const resetUnlockTimer = (clear = false) => {
    clearTimeout(unlockTimeout);
    if (clear) {
      setUnlockTimeout(null);
    } else {
      const timer = setTimeout(() => {
        if (
          richTextEditorRef.current &&
          richTextEditorRef.current.editorRef.current
        ) {
          richTextEditorRef.current.editorRef.current.blur();
        }
        blur();
      }, QUESTION_UNLOCK_TIMEOUT);
      setUnlockTimeout(timer);
    }
  };

  /**
   * Set Reference Element Height
   */
  const setRefElementStyle = async (
    elementRef,
    elementH,
    scrollH,
    initialElementH = 'auto'
  ) => {
    await timeout(0);
    const { scrollHeight, style: refStyle } = elementRef;
    refStyle.height = initialElementH;
    const refHeight = scrollHeight > elementH ? scrollH : scrollHeight;
    // refStyle.height = `${refHeight + 0.4}px`;
    refStyle.height = `${refHeight}px`;
  };

  useEffect(() => {
    // this timeout cannot be AVOIDED since it will wait for 500ms to let apollo component to update it's internal state on first render
    setTimeout(() => {
      if (richTextEditorRef.current && canUserTagInQuestion) {
        const editorState = richTextEditorRef.current.state.editorState;
        const newEditorState = EditorState.set(editorState, {
          decorator: compositeDecorator
        });
        richTextEditorRef.current.setState({ editorState: newEditorState });
      }
    }, 500);
    if (isEqual(richTextData.value, INITIAL_DATA.value)) return; // break func
    resetUnlockTimer();
  }, [richTextData, canUserTagInQuestion]);

  /**
   * Update RichText data on external changes
   */
  useEffect(() => {
    // Restrict Richtext height upto 5 lines
    setTimeout(() => {
      if (
        richTextEditorRef.current &&
        richTextEditorRef.current.editorRef.current.editorContainer
      ) {
        if (richTextData.text) {
          setRefElementStyle(
            richTextEditorRef.current.editorRef.current.editorContainer,
            125,
            120,
            '5px'
          );
        } else {
          const {
            style: refStyle
          } = richTextEditorRef.current.editorRef.current.editorContainer;
          refStyle.height = 'auto';
        }
      }
    }, 100);

    setRichTextData(INITIAL_DATA);
  }, [INITIAL_DATA]);

  /**
   * Update RichText Key to reRender Component
   */
  useUpdateEffect(() => {
    richTextKeyRef.current = uuid();
  }, [INITIAL_DATA]);

  /**
   * Set Focus on RichText Editor
   */
  const setFocusOnEditor = async () => {
    await timeout(0);
    if (richTextEditorRef.current && enableFocus) {
      const rect = richTextContainerRef.current.getBoundingClientRect();
      richTextEditorRef.current.focus();
      if (rect.top < 0) {
        richTextContainerRef.current.scrollIntoView(true);
      } else if (
        rect.bottom >
        (window.innerHeight || document.documentElement.clientHeight)
      ) {
        richTextContainerRef.current.scrollIntoView(false);
      }
    }
  };

  /**
   * Set IsRichTextEditable state on external change
   */
  useEffect(() => {
    setIsRichTextEditable(isEditable);
  }, [isEditable]);

  /**
   * OnClick ReadOnly RichText
   */
  const onClickHTML = () => {
    setIsRichTextEditable(true);
    if (enableFocus) {
      setFocusOnEditor();
      onFocus();
      resetUnlockTimer();
    }
  };

  const handleUserMention = async () => {
    await timeout(500);
    if (richTextEditorRef.current) {
      const editorState = richTextEditorRef.current.state.editorState;
      const userQueryInfo = getUserTagQueryInfo(editorState);
      if (userQueryInfo.userQuery !== null) {
        setSearchTag(userQueryInfo.userQuery);
        setQueryStringRange(userQueryInfo.offsetRange);
        setAnchorKey(userQueryInfo.anchorKey);
      } else {
        setSearchTag(null);
        setQueryStringRange({ start: 0, end: 0 });
        setAnchorKey(null);
      }
    }
  };

  /**
   * OnChange RichText Editor
   */
  const onChangeHandler = async (value, html) => {
    if (canUserTagInQuestion) {
      handleUserMention();
    }
    if (isEqual(richTextData.value, value)) return; // break func

    const text = value.blocks
      .map(item => item.text)
      .filter(item => !isEmpty(item.trim()))
      .join(' ');
    const resultObj = { text, value, html };
    setRichTextData(resultObj);

    if (
      richTextEditorRef.current &&
      richTextEditorRef.current.editorRef.current.editorContainer
    ) {
      // Restrict Richtext height upto 10 lines
      const {
        clientHeight,
        scrollHeight,
        style: refStyle
      } = richTextEditorRef.current.editorRef.current.editorContainer;

      if (scrollHeight < 230) refStyle.height = 'auto';
      if (clientHeight <= 230)
        setRefElementStyle(
          richTextEditorRef.current.editorRef.current.editorContainer,
          230,
          230
        );
    }

    if (onChange) onChange(resultObj); // onChange callback func
  };

  /**
   * Handle Click Outside RichText
   */
  const handleClickOutside = e => {
    if (
      richTextContainerRef.current &&
      !richTextContainerRef.current.contains(e.target) &&
      isEmpty(e.target.closest('.MuiPopover-root')) &&
      isEmpty(e.target.closest('.MuiDialog-root')) &&
      isEmpty(e.target.closest('.tag-user-list')) &&
      isEmpty(e.target.closest('.tag-user-list-empty')) &&
      isEmpty(e.target.closest('.tag-user-list-loader')) &&
      isFocused
    ) {
      setSearchTag(null);
      blur();
    }
  };

  const blur = () => {
    setIsFocused(false);
    setSearchTag(null);
    console.log(richTextData.text);
    if (onBlur) onBlur(richTextData);
    resetUnlockTimer(true);
  };

  /**
   * Trigger Click Outside RichText
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleKeyDown = e => {
    if (richTextContainerRef.current.contains(e.target) && isFocused) {
      if ((e.shiftKey && e.key === 'Tab') || e.key === 'Tab') {
        blur();
      }
    }
  };

  const handleFocus = useCallback(() => {
    if (enableFocus) {
      setIsFocused(true);
      resetUnlockTimer();
    }
    onFocus();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleUserTag = user => {
    console.log('user', user, queryStringRange);
    const userName = `${user.last_name}, ${user.first_name}`;
    if (richTextEditorRef.current) {
      const editorState = richTextEditorRef.current.state.editorState;
      const contentState = editorState.getCurrentContent();
      const contentStateWithMentionAdded = contentState.createEntity(
        'MENTION',
        'IMMUTABLE'
      );
      const entityKey = contentStateWithMentionAdded.getLastCreatedEntityKey();
      let selectionState = SelectionState.createEmpty(anchorKey);
      selectionState = selectionState.merge({
        anchorOffset: queryStringRange.start,
        focusKey: anchorKey,
        focusOffset: queryStringRange.end
      });
      const contentStateWithMention = Modifier.replaceText(
        contentState,
        selectionState,
        userName
      );
      let newSelectionState = selectionState.merge({
        anchorOffset: selectionState.getAnchorOffset(),
        focusOffset: selectionState.getAnchorOffset() + userName.length
      });
      const contentStateWithEntity = Modifier.applyEntity(
        contentStateWithMention,
        newSelectionState,
        entityKey
      );
      let newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
      });
      newSelectionState = selectionState.merge({
        anchorOffset: selectionState.getAnchorOffset() + userName.length,
        focusOffset: selectionState.getAnchorOffset() + userName.length
      });
      newEditorState = EditorState.forceSelection(
        newEditorState,
        newSelectionState
      );
      const newContentStateRaw = convertToRaw(
        newEditorState.getCurrentContent()
      );
      const text = newContentStateRaw.blocks
        .map(item => item.text)
        .filter(item => !isEmpty(item.trim()))
        .join(' ');
      const html =
        richTextEditorRef.current.editorRef &&
        richTextEditorRef.current.editorRef.current &&
        richTextEditorRef.current.editorRef.current.editor &&
        richTextEditorRef.current.editorRef.current.editor.innerHTML;
      const resultObj = { text, value: newContentStateRaw, html };
      setRichTextData(resultObj);
      richTextEditorRef.current.setState({ editorState: newEditorState });
      resetUnlockTimer();
    }
  };

  // Render Popover RichText Editor
  return (
    <>
      <div
        className={classNames('custom-rich-text', {
          readonly: disabled,
          popover: !disabled,
          disabled,
          [className]: !!className
        })}
      >
        <div
          className={classNames('custom-rich-text-inner', {
            'popover-inner': !disabled,
            error: !!error,
            focused: isFocused
          })}
          ref={richTextContainerRef}
        >
          <RichTextEditor
            placeholder={placeholder || ''}
            spellCheck={false}
            variant={!disabled ? 'popover' : 'view'}
            defaultValue={richTextData.value}
            onChange={onChangeHandler}
            tabIndex={!disabled ? 0 : -1}
            ref={richTextEditorRef}
            key={richTextKeyRef.current}
            onFocus={handleFocus}
          />
        </div>
      </div>
      {/* TagUserList Component for adding tag */}
      {searchTag !== null && (
        <div style={{ position: 'relative' }} data-testid="tag-user-list">
          <TagUserList
            searchTag={searchTag}
            onSelect={user => handleUserTag(user)}
            close={() => setSearchTag(null)}
          />
        </div>
      )}
    </>
  );
};

CustomApolloRichText.defaultProps = {
  questionId: '',
  richTextString: '',
  richTextVal: { blocks: [] },
  richTextHtml: '',
  placeholder: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  isEditable: false,
  enableFocus: false,
  className: '',
  error: false,
  disabled: false,
  canUserTagInQuestion: false
};

CustomApolloRichText.propTypes = {
  questionId: PropTypes.string,
  richTextString: PropTypes.string,
  richTextVal: PropTypes.object,
  richTextHtml: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  isEditable: PropTypes.bool,
  enableFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  canUserTagInQuestion: PropTypes.bool
};

export default CustomApolloRichText;
