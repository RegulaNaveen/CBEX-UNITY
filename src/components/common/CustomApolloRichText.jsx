import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v4 as uuid } from 'uuid';
// import IconButton from 'apollo-react/components/IconButton';
// import Pencil from 'apollo-react-icons/Pencil';
import classNames from 'classnames';
import { useUpdateEffect } from '../../hooks';

const CustomApolloRichText = ({
  richTextVal,
  richTextHtml,
  placeholder,
  onBlur,
  onChange,
  isEditable,
  enableFocus,
  onClickHTML,
  // showEditButton,
  // iconProps,
  className,
  error
}) => {
  const INITIAL_DATA = {
    value: richTextVal,
    html: richTextHtml
  };

  // Component State
  const [richTextData, setRichTextData] = useState(INITIAL_DATA);
  // const [clickedOutside, setClickedOutside] = useState(true);
  const [isRichTextEditable, setIsRichTextEditable] = useState(isEditable);
  const richTextRef = useRef(null);
  const richTextEditorRef = useRef(null);
  // let isFirstRender = true;

  /**
   * Update on external changes
   */
  useUpdateEffect(() => {
    setRichTextData(INITIAL_DATA);
  }, [richTextHtml, richTextVal]);

  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  /**
   * Set focus on load
   */
  useEffect(() => {
    // console.log({
    //   isEditable,
    //   refHtml: richTextEditorRef.current,
    //   enableFocus
    // });
    setIsRichTextEditable(isEditable);

    (async () => {
      await timeout(100);
      if (richTextEditorRef.current && enableFocus)
        richTextEditorRef.current.focus();
    })();
  }, [isEditable]);

  // /**
  //  * onClick Edit button handler
  //  */
  // const onClickEditHandler = () => {
  //   setIsRichTextEditable(prev => {
  //     if (onClickHTML) onClickHTML(!prev, richTextData);
  //     if (richTextEditorRef.current && enableFocus)
  //       richTextEditorRef.current.focus();
  //     return !prev;
  //   });
  // };

  /**
   * OnChange RichText Editor
   */
  const onChangeHandler = (value, html) => {
    if (isEqual(richTextData.value, value)) return; // break func

    // const text = value.blocks
    //   .map(item => item.text)
    //   .filter(item => !isEmpty(item.trim()))
    //   .join(' ');
    const resultObj = { value, html };
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
      isEmpty(e.target.closest('.ubuild-MuiPopover-root')) &&
      isEmpty(e.target.closest('.ubuild-MuiDialog-root'))
    ) {
      // setClickedOutside(true);
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

  // const renderEditIcon = showEditButton && (
  //   <IconButton {...iconProps} onClick={onClickEditHandler}>
  //     <Pencil />
  //   </IconButton>
  // );

  // Render Html View
  if (!isRichTextEditable) {
    return (
      <div
        className={classNames('custom-rich-text', 'readonly', {
          [className]: !!className
        })}
        aria-hidden="true"
        onClick={onClickHTML}
      >
        <RichTextEditor
          variant="view"
          defaultValue={richTextData.value}
          key={uuid().toString()}
        />
        {/* {renderEditIcon} */}
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
      {/* {renderEditIcon} */}
    </div>
  );
};

CustomApolloRichText.defaultProps = {
  richTextVal: { blocks: [] },
  richTextHtml: '',
  placeholder: '',
  onBlur: () => {},
  onChange: () => {},
  isEditable: false,
  enableFocus: false,
  onClickHTML: () => {},
  // showEditButton: false,
  // iconProps: {},
  className: '',
  error: false
};

CustomApolloRichText.propTypes = {
  richTextVal: PropTypes.object,
  richTextHtml: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool,
  enableFocus: PropTypes.bool,
  onClickHTML: PropTypes.func,
  // showEditButton: PropTypes.bool,
  // iconProps: PropTypes.object,
  className: PropTypes.string,
  error: PropTypes.bool
};

/**
 * Memo func to compare prev next props
 */
const propsAreEqual = (prevProp, nextProp) => {
  return (
    isEqual(prevProp.richTextVal, nextProp.richTextVal) &&
    isEqual(prevProp.isEditable, nextProp.isEditable)
  );
};

export default React.memo(CustomApolloRichText, propsAreEqual);
