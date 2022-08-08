import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import { useUpdateEffect } from '../../hooks';

const CustomApolloRichText = ({
  richTextString,
  richTextVal,
  richTextHtml,
  placeholder,
  onBlur,
  onChange,
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
  const INITIAL_DATA = {
    text: richTextString,
    value: richtextObject,
    html: richTextHtml
  };

  // Component State
  const [richTextData, setRichTextData] = useState(INITIAL_DATA);
  const [isRichTextEditable, setIsRichTextEditable] = useState(isEditable);
  // const [clickedOutside, setClickedOutside] = useState(true);
  const richTextRef = useRef(null);
  const richTextEditorRef = useRef(null);
  // let isFirstRender = true;

  /**
   * Update on external changes
   */
  useUpdateEffect(() => {
    setRichTextData(INITIAL_DATA);
  }, [richTextHtml, richTextVal]);

  /**
   * Function to Add Delay for Specific Seconds
   */
  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   * Set Focus on RichText Editor
   */
  const setFocusOnEditor = async () => {
    await timeout(100);
    if (richTextEditorRef.current && enableFocus)
      richTextEditorRef.current.focus();
  };

  /**
   * Set focus on load
   */
  useEffect(() => {
    setIsRichTextEditable(isEditable);
    setFocusOnEditor();
  }, [isEditable]);

  /**
   * onClick Edit button handler
   */
  const onClickHTML = () => {
    setIsRichTextEditable(true);
    setFocusOnEditor();
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
    if (onChange) onChange(resultObj); // onChange callback func

    // if (!isFirstRender || !isEmpty(text)) setClickedOutside(false);
    // isFirstRender = false;
  };

  /**
   * Handle Outside Click Function
   */
  const handleClickOutside = e => {
    if (
      richTextRef.current &&
      !richTextRef.current.contains(e.target) &&
      isEmpty(e.target.closest('.MuiPopover-root')) &&
      isEmpty(e.target.closest('.MuiDialog-root'))
    ) {
      setIsRichTextEditable(false);
      if (onBlur) onBlur(richTextData);
    }
  };

  /**
   * Trigger Outside Click
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  /**
   * OnBlur RichText Editor
   */
  // useUpdateEffect(() => {
  //   if (clickedOutside && onBlur) onBlur(richTextData); // onBlur callback func
  // }, [clickedOutside]);

  // console.log({ richTextData, isRichTextEditable });

  // Render Html View
  if (!isRichTextEditable) {
    return (
      <div
        className={classNames('custom-rich-text', 'readonly', {
          [className]: !!className,
          disabled
        })}
        aria-hidden="true"
        onClick={onClickHTML}
      >
        <RichTextEditor
          placeholder={placeholder || ''}
          variant="view"
          defaultValue={richTextData.value}
          key={uuid().toString()}
          disabled
        />
      </div>
    );
  }

  // Render Popover RichText Editor
  return (
    <div
      className={classNames('custom-rich-text', 'popover', {
        [className]: !!className
      })}
    >
      <div
        className={classNames('popover-inner', { error: !!error })}
        ref={richTextRef}
      >
        <RichTextEditor
          placeholder={placeholder || ''}
          spellCheck={false}
          variant="popover"
          defaultValue={richTextData.value}
          onChange={onChangeHandler}
          ref={richTextEditorRef}
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
  isEditable: PropTypes.bool,
  enableFocus: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool
};

/**
 * Memo func to compare prev next props
 */
const propsAreEqual = (prevProp, nextProp) => {
  return isEqual(prevProp.richTextString, nextProp.richTextString);
};

export default React.memo(CustomApolloRichText, propsAreEqual);
