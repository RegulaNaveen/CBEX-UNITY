import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import { EditorState } from 'draft-js';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { QUESTION_UNLOCK_TIMEOUT } from '../../constants/app';

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
  disabled
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
  const richTextContainerRef = useRef(null);
  const richTextEditorRef = useRef(null);
  const richTextKey = useRef(uuid());
  const [unlockTimeout, setUnlockTimeout] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

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
        if (richTextEditorRef.current && richTextEditorRef.current.editorRef.current) {
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

  /**
   * Update on external changes
   */
  useEffect(() => {
    // Restrict Richtext height upto 5 lines
    setTimeout(() => {
      console.log(richTextEditorRef.current.editorRef.current.editorContainer)
      if (richTextEditorRef.current && richTextEditorRef.current.editorRef.current.editorContainer) {
        if (richTextData.text) {
           setRefElementStyle(richTextEditorRef.current.editorRef.current.editorContainer, 125, 120, '5px');
        } else {
          const { style: refStyle } = richTextEditorRef.current.editorRef.current.editorContainer;
          refStyle.height = 'auto';
        }
      }
    }, 100);

    setRichTextData(INITIAL_DATA);
  }, [INITIAL_DATA]);

  useUpdateEffect(() => {
    richTextKey.current = uuid();
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
   * Set focus on load
   */
  useEffect(() => {
    setIsRichTextEditable(isEditable);
  }, [isEditable]);

  /**
   * onClick Edit button handler
   */
  const onClickHTML = () => {
    setIsRichTextEditable(true);
    if (enableFocus) {
      setFocusOnEditor();
      onFocus();
      resetUnlockTimer();
    }
  };
  /**
   * OnChange RichText Editor
   */
  const onChangeHandler = (value, html) => {
    if (isEqual(richTextData.value, value)) return; // break func

    const text = value.blocks
      .map(item => item.text)
      .filter(item => !isEmpty(item.trim()))
      .join(' ');
    const resultObj = { text, value, html };
    setRichTextData(resultObj);

    if (richTextEditorRef.current && richTextEditorRef.current.editorRef.current.editorContainer) {
      // Restrict Richtext height upto 10 lines
      const {
        clientHeight,
        scrollHeight,
        style: refStyle
      } = richTextEditorRef.current.editorRef.current.editorContainer;

      if (scrollHeight < 230) refStyle.height = 'auto';
      if (clientHeight <= 230) setRefElementStyle(richTextEditorRef.current.editorRef.current.editorContainer, 230, 230);
    }

    if (onChange) onChange(resultObj); // onChange callback func

    resetUnlockTimer();
  };

  /**
   * Handle Outside Click Function
   */
  const handleClickOutside = e => {
    if (
      richTextContainerRef.current &&
      !richTextContainerRef.current.contains(e.target) &&
      isEmpty(e.target.closest('.MuiPopover-root')) &&
      isEmpty(e.target.closest('.MuiDialog-root')) &&
      isFocused
    ) {
      blur();
    }
  };

  const blur = () => {
    setIsFocused(false);
    if (onBlur) onBlur(richTextData);
    resetUnlockTimer(true);
  };

  /**
   * Trigger Outside Click
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleBlur = () => {
    setTimeout(() => {
      if (richTextContainerRef.current.querySelector('.MuiFormControl-root') === null && isFocused) {
        blur();
      }
    }, 300);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  // Render Popover RichText Editor
  return (
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
          'focused': isFocused
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
          key={richTextKey.current}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
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
  disabled: false
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
  disabled: PropTypes.bool
};

/**
 * Memo func to compare prev next props
 */
// const propsAreEqual = (prevProp, nextProp) => {
//   return isEqual(prevProp.richTextString, nextProp.richTextString);
// };

export default CustomApolloRichText;
