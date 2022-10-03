import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import { EditorState } from 'draft-js';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import useUpdateEffect from '../../hooks/useUpdateEffect';

const CustomApolloRichText = ({
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
  /**
   * Function to Add Delay for Specific Seconds
   */
  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    const { scrollHeight, style: refStyle } = elementRef.current;

    refStyle.height = initialElementH;
    const refHeight = scrollHeight > elementH ? scrollH : scrollHeight;
    // refStyle.height = `${refHeight + 0.4}px`;
    refStyle.height = `${refHeight}px`;
  };

  /**
   * Update on external changes
   */
  useEffect(() => {
    setRichTextData(INITIAL_DATA);
    // Restrict Richtext height upto 5 lines
    if (INITIAL_DATA.text) {
      setRefElementStyle(richTextContainerRef, 125, 120, '5px');
    } else {
      const { style: refStyle } = richTextContainerRef.current;
      refStyle.height = 'auto';
    }
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
      } else if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
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
    if (richTextEditorRef.current) {
      const { editorState } = richTextEditorRef.current.state;
      richTextEditorRef.current.setState({
        editorState: EditorState.moveFocusToEnd(editorState)
      })
      richTextContainerRef.current.scrollTop = richTextContainerRef.current.scrollHeight;      
    }
    setIsRichTextEditable(true);
    if (enableFocus) {
      setFocusOnEditor();
      onFocus();
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

    // Restrict Richtext height upto 10 lines
    const {
      clientHeight,
      scrollHeight,
      style: refStyle
    } = richTextContainerRef.current;
    if (scrollHeight < 230) refStyle.height = 'auto';
    if (clientHeight <= 230) setRefElementStyle(richTextContainerRef, 230, 230);

    if (onChange) onChange(resultObj); // onChange callback func
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
      isRichTextEditable
    ) {
      setIsRichTextEditable(false);
      if (onBlur) onBlur(richTextData);
    }
  };

  const blur = () => {
    if (onBlur) onBlur(richTextData)
  }

  /**
   * Trigger Outside Click
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleKeyDown = e => {
    if (richTextContainerRef.current.contains(e.target)) {
      if ((e.shiftKey && e.key === 'Tab') || e.key === 'Tab') {
        blur();
        if (isRichTextEditable) {
          setTimeout(() => {
            setIsRichTextEditable(false);
          }, 0);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  });

  // Render Popover RichText Editor
  return (
    <div
      className={classNames('custom-rich-text', {
        readonly: !isRichTextEditable,
        popover: isRichTextEditable,
        disabled,
        [className]: !!className
      })}
    >
      <div
        className={classNames('custom-rich-text-inner', {
          'popover-inner': isRichTextEditable,
          error: !!error
        })}
        ref={richTextContainerRef}
        aria-hidden="true"
        onClick={() => {
          if (!isRichTextEditable && !disabled) onClickHTML();
        }}
        tabIndex={(!isRichTextEditable && !disabled) ? 0 : -1}
        onFocus={() => {
          if(!isRichTextEditable && !disabled) onClickHTML() }
        }
      >
        <RichTextEditor
          placeholder={placeholder || ''}
          spellCheck={false}
          variant={isRichTextEditable ? 'popover' : 'view'}
          defaultValue={richTextData.value}
          onChange={onChangeHandler}
          ref={richTextEditorRef}
          key={richTextKey.current}
        />
      </div>
    </div>
  );
};

CustomApolloRichText.defaultProps = {
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
