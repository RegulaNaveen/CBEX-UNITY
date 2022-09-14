import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import { useUpdateEffect } from '../../hooks';
import TagUserList from './TagUserList';
import { getUsersList } from '../../redux/actions/proposal-actions';

let firstRender = true;

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
  const [searchTag, setSearchTag] = useState(null);
  // Component Refs
  const richTextContainerRef = useRef(null);
  const richTextEditorRef = useRef(null);
  const richTextKeyRef = useRef(uuid());
  const backspaceRef = useRef(false);
  const rangeRef = useRef(null);
  const selectionRef = useRef(null);
  const dispatch = useDispatch();

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
   * Update RichText data on external changes
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
    if (richTextEditorRef.current && enableFocus)
      richTextEditorRef.current.focus();
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
    }
  };

  useUpdateEffect(() => {
    if (!searchTag) return () => {};

    const timer = setTimeout(async () => {
      const res = await dispatch(getUsersList(searchTag));
      console.log({ res });
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTag]);

  const getLastWordBeforeCaret = async () => {
    if (firstRender) {
      firstRender = false;
      return null;
    } // break func on first render

    const selection = window.getSelection && window.getSelection();
    selectionRef.current = selection;
    // if (selection && selection.rangeCount === 0) return null; // break func on selected range 0

    const range = selection.getRangeAt(0);
    rangeRef.current = range;
    const { collapsed, startOffset, startContainer } = range;

    await timeout(0);
    if (collapsed) {
      let text = startContainer.textContent.substring(0, startOffset);
      if (backspaceRef.current) {
        backspaceRef.current = false;
        text = startContainer.textContent.substring(0, startOffset - 1);
      }
      const filteredTxt = text.split(' ').pop();
      const isValidTxt = filteredTxt.match(/^@[^@]*$/gi);
      return isValidTxt ? filteredTxt.substring(1) : null;
    }
    return null;
  };

  /**
   * OnChange RichText Editor
   */
  const onChangeHandler = async (value, html) => {
    const resp = await getLastWordBeforeCaret();
    setSearchTag(resp);
    console.log({ wordBeforeCursor: resp });
    console.log({ value, html });

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
   * Handle Click Outside RichText
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
      setSearchTag(null);
      if (onBlur) onBlur(richTextData);
    }
  };

  const handleEditorBackspace = event => {
    if (event.key === 'Backspace') {
      backspaceRef.current = true;
    }
  };

  /**
   * Trigger Click Outside RichText
   */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEditorBackspace);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEditorBackspace);
    };
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
      >
        <RichTextEditor
          placeholder={placeholder || ''}
          spellCheck={false}
          variant={isRichTextEditable ? 'popover' : 'view'}
          defaultValue={richTextData.value}
          onChange={onChangeHandler}
          onClick={() => console.log('Editor Clicked')}
          ref={richTextEditorRef}
          key={richTextKeyRef.current}
        />
        {/* TagUserList Component for adding tag */}
        {searchTag != null && (
          <TagUserList
            ref={{ rangeRef, selectionRef, richTextEditorRef }}
            searchTag={searchTag}
            close={() => setSearchTag(null)}
          />
        )}
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

export default CustomApolloRichText;
