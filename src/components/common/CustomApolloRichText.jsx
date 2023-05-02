import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';

import {
  EditorState,
  SelectionState,
  Modifier,
  Entity,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator
} from 'apollo-react/node_modules/draft-js';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import Link from 'apollo-react-icons/Link';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import TagUserList from './TagUserList';
import { QUESTION_UNLOCK_TIMEOUT } from '../../constants/app';
import {
  MentionComponentWithEmail,
  MentionComponentWithName,
  MentionComponentWithLink,
  MentionComponentWithCopiedHyperlink,
  MentionComponentWithHyperLink
} from './ApolloRichTextComponents/MentionComponent';

let CAN_DECORATE_LINKS = false;

// CustomApolloRichText Utilities

/**
 * Function to find user tag pattern and return an object of pattering matching status
 * @param {editorState} EditorState
 * @returns {{ userQuery, offsetRange }}
 */
function getUserTagQueryInfo(editorState) {
  const queryInfo = {
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
    const reversedText = blockText
      .split('')
      .reverse()
      .join('');
    const matchResults = reversedText.matchAll(/([^@]*)@/gi);
    const matchResultsArr = Array.from(matchResults);
    if (matchResultsArr.length > 0) {
      queryInfo.userQuery = matchResultsArr[0][1]
        .split('')
        .reverse()
        .join('');
      queryInfo.offsetRange = {
        start: anchorOffset - (matchResultsArr[0][1].length + 1),
        end: anchorOffset
      };
      queryInfo.anchorKey = anchorKey;
    }
  }

  return queryInfo;
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

/**
 * DraftJS decorator strategy function to find entities of type 'MENTION'
 * @param {contentBlock} EditorState
 * @param {callback} callback
 * @param {contentState} contentState
 */
function handleLinkOpportunityStrategy(contentBlock, callback, contentState) {
  if (!CAN_DECORATE_LINKS) return;
  const REGEX = /\b[A-Z]{3}[0-9]{5}\b/g;
  findWithRegex(REGEX, contentBlock, callback);
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
// Strategy function for link entities
function handleHyperlinkOpportunityStrategy(
  contentBlock,
  callback,
  contentState
) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}
// Strategy function for link matches
function handleHyperLinkOpportunityStrategy(
  contentBlock,
  callback,
  contentState
) {
  const text = contentBlock.getText();
  const regex = /(http\S+)?[-a-zA-Z0-9@:%._\/+~#=]{1,256}(\.[a-zA-Z]{2,4}|\/[a-zA-Z]{1,})\b([-a-zA-Z0-9@:%_\+~#?&//=]*)/g;
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
// decorator for DraftJS Editor Component
export const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleUserTagStrategy,
    component: MentionComponentWithName
  },

  {
    strategy: handleHyperlinkOpportunityStrategy,
    component: MentionComponentWithCopiedHyperlink
  },
  {
    strategy: handleHyperLinkOpportunityStrategy,
    component: MentionComponentWithHyperLink
  },
  {
    strategy: handleLinkOpportunityStrategy,
    component: MentionComponentWithLink
  }
]);

export const compositeDecoratorHidden = new CompositeDecorator([
  {
    strategy: handleUserTagStrategy,
    component: MentionComponentWithEmail
  },

  {
    strategy: handleHyperlinkOpportunityStrategy,
    component: MentionComponentWithCopiedHyperlink
  },
  {
    strategy: handleHyperLinkOpportunityStrategy,
    component: MentionComponentWithHyperLink
  },
  {
    strategy: handleLinkOpportunityStrategy,
    component: MentionComponentWithLink
  }
]);

// CustomApolloRichText Component
const CustomApolloRichText = ({
  richTextString,
  richTextVal,
  richTextHtml,
  richTextHtmlExport,
  placeholder,
  onBlur,
  onChange,
  onFocus,
  isEditable,
  enableFocus,
  className,
  error,
  disabled,
  canUserTagInQuestion,
  allFlags,
  iscustomtab = false,
  isQuestionCustomerTab = false,
  setFocus = false
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
      html: richTextHtml,
      htmlExport: richTextHtmlExport,
      docExport: richtextObject
    }),
    [richTextString, richTextHtml, richTextHtmlExport]
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
  const richTextEditorRefHidden = useRef(null);
  const richTextKeyRef = useRef(uuid());
  const richTextKeyRefHidden = useRef(uuid());

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
    // to always make sure recently created timeout gets cleared
    setUnlockTimeout(prevUnlockTimeout => {
      clearTimeout(prevUnlockTimeout);
      return prevUnlockTimeout;
    });
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
        setRichTextData(rteValue => rteValue);
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
        if (richTextEditorRefHidden.current) {
          if (typeof richTextData.value === 'object') {
            let { blocks } = richTextData.value;
            if (!(Array.isArray(blocks) && blocks.length > 0)) {
              blocks = [
                {
                  text: '',
                  type: 'unstyled',
                  depth: 0,
                  inlineStyleRanges: [],
                  entityRanges: [],
                  data: {}
                }
              ];
            }
            const newEditorStateHidden = EditorState.set(
              EditorState.createWithContent(
                convertFromRaw({
                  entityMap: {},
                  ...richTextData.value,
                  blocks
                })
              ),
              {
                decorator: compositeDecoratorHidden
              }
            );
            richTextEditorRefHidden.current.setState({
              editorState: newEditorStateHidden
            });
          }
        }
      }
    }, 700);
    if (isEqual(richTextData.value, INITIAL_DATA.value)) return; // break func
    // enable timer only if field is focused
    if (isFocused) {
      resetUnlockTimer();
    }
    CAN_DECORATE_LINKS = allFlags?.canLinkOpportunityNo;
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
    richTextKeyRefHidden.current = uuid();
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (richTextEditorRef.current && setFocus) {
        richTextEditorRef.current.focus();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [setFocus]);

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

    const htmlHidden =
      richTextEditorRefHidden.current.editorRef &&
      richTextEditorRefHidden.current.editorRef.current &&
      richTextEditorRefHidden.current.editorRef.current.editor &&
      richTextEditorRefHidden.current.editorRef.current.editor.innerHTML;

    const valueHidden =
      richTextEditorRefHidden.current &&
      richTextEditorRefHidden.current.state.editorState &&
      richTextEditorRefHidden.current.state.editorState.getCurrentContent();
    const resultObj = {
      text,
      value,
      html,
      htmlExport: htmlHidden,
      docExport: valueHidden
    };
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
    const html =
      richTextEditorRef.current.editorRef &&
      richTextEditorRef.current.editorRef.current &&
      richTextEditorRef.current.editorRef.current.editor &&
      richTextEditorRef.current.editorRef.current.editor.innerHTML;
    const htmlHidden =
      richTextEditorRefHidden.current.editorRef &&
      richTextEditorRefHidden.current.editorRef.current &&
      richTextEditorRefHidden.current.editorRef.current.editor &&
      richTextEditorRefHidden.current.editorRef.current.editor.innerHTML;
    const valueHidden =
      richTextEditorRefHidden.current &&
      richTextEditorRefHidden.current.state.editorState &&
      richTextEditorRefHidden.current.state.editorState.getCurrentContent();
    const resultObj = {
      ...richTextData,
      html,
      htmlExport: htmlHidden,
      docExport: valueHidden
    };

    if (onBlur) onBlur(resultObj);
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

  const handleFocus = () => {
    if (enableFocus) {
      setIsFocused(true);
      resetUnlockTimer();
    }
    onFocus();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleUserTag = user => {
    const userName = `${user.first_name} ${user.last_name}`;
    if (richTextEditorRef.current) {
      const editorState = richTextEditorRef.current.state.editorState;
      const editorStateHidden =
        richTextEditorRefHidden.current.state.editorState;
      const contentState = editorState.getCurrentContent();
      const contentStateWithMentionAdded = contentState.createEntity(
        'MENTION',
        'IMMUTABLE',
        user
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
      let newEditorStateHidden = EditorState.set(editorStateHidden, {
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

      const htmlHidden =
        richTextEditorRefHidden.current.editorRef &&
        richTextEditorRefHidden.current.editorRef.current &&
        richTextEditorRefHidden.current.editorRef.current.editor &&
        richTextEditorRefHidden.current.editorRef.current.editor.innerHTML;

      const valueHidden =
        richTextEditorRefHidden.current &&
        richTextEditorRefHidden.current.state.editorState &&
        richTextEditorRefHidden.current.state.editorState.getCurrentContent();

      const resultObj = {
        text,
        value: newContentStateRaw,
        html,
        htmlExport: htmlHidden,
        docExport: valueHidden
      };
      setRichTextData(resultObj);
      richTextEditorRef.current.setState({ editorState: newEditorState });
      resetUnlockTimer();
    }
  };

  function hyperLinkHandler() {
    const { editorState } = richTextEditorRef.current.state;
    const selectionState = editorState.getSelection();

    const contentState = editorState.getCurrentContent();

    const selectedText = editorState
      .getCurrentContent()
      .getBlockForKey(selectionState.getStartKey())
      .getText()
      .slice(selectionState.getStartOffset(), selectionState.getEndOffset());
    const linkName = selectedText;
    let linkAddress;
    let linkInstance;
    function getLinkAddress() {
      const startKey = selectionState.getStartKey();

      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);

      const index = selectionState.getStartOffset();
      const linkKey = blockWithLinkAtBeginning.getEntityAt(index);

      if (linkKey !== null) {
        linkInstance = Entity.get(linkKey);

        const datatest = linkInstance.getData();

        const { url } = datatest;
        if (url !== null) {
          linkAddress = window.prompt('Link Address:', url);
        } else {
          linkAddress = window.prompt('Link Address:', 'Enter url');
        }
      } else {
        linkAddress = window.prompt('Link Address:', 'Enter url');
      }

      return linkAddress;
    }

    linkAddress = getLinkAddress();

    if (linkAddress !== null) {
      const editorStateHidden =
        richTextEditorRefHidden.current.state.editorState;

      const link = linkAddress;

      contentState.createEntity('LINK', 'MUTABLE', {
        url: link,
        target: '_blank'
      });

      const entityKey = contentState.getLastCreatedEntityKey();

      const contentStateWithLink = Modifier.replaceText(
        contentState,
        selectionState,
        linkName,
        editorState.getCurrentInlineStyle(),
        entityKey
      );
      let newSelectionState = selectionState.merge({
        anchorOffset: selectionState.getAnchorOffset(),
        focusOffset: selectionState.getAnchorOffset() + linkName.length
      });
      const contentStateWithEntity = Modifier.applyEntity(
        contentStateWithLink,
        newSelectionState,
        entityKey
      );

      let newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
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

      const htmlHidden =
        richTextEditorRefHidden.current.editorRef &&
        richTextEditorRefHidden.current.editorRef.current &&
        richTextEditorRefHidden.current.editorRef.current.editor &&
        richTextEditorRefHidden.current.editorRef.current.editor.innerHTML;

      const valueHidden =
        richTextEditorRefHidden.current &&
        richTextEditorRefHidden.current.state.editorState &&
        richTextEditorRefHidden.current.state.editorState.getCurrentContent();

      const resultObj = {
        text,
        value: newContentStateRaw,
        html,
        htmlExport: htmlHidden,
        docExport: valueHidden
      };
      setRichTextData(resultObj);
      richTextEditorRef.current.setState({ editorState: newEditorState });
      resetUnlockTimer();
    }
  }
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
            'popover-inner-custom-tab': iscustomtab,
            'question-customer-right': isQuestionCustomerTab,
            error: !!error,
            focused: isFocused,
            'unity-customtab': iscustomtab
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
            customControllers={(editorState, onChange) => (
              <>
                <div className="style-button-group">
                  <Link className="icon-button" onClick={hyperLinkHandler} />
                </div>
              </>
            )}
          />
        </div>
        <div style={{ display: 'none' }}>
          <RichTextEditor
            placeholder={''}
            spellCheck={false}
            variant="readOnly"
            defaultValue={richTextData.value}
            tabIndex={-1}
            ref={richTextEditorRefHidden}
            key={richTextKeyRefHidden.current}
          />
        </div>
      </div>
      {/* TagUserList Component for adding tag */}
      {searchTag !== null && (
        <div style={{ position: 'relative' }} data-testid="tag-user-list">
          <TagUserList
            searchTag={searchTag}
            onSelect={handleUserTag}
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
