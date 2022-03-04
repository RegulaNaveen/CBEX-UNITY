import React, { useState, useEffect, useRef } from 'react';
import removeSpecialChars from '../../../../utils/pasteUtils';

const TextAreaV2 = ({
  className,
  placeholder,
  onBlur,
  onFocus,
  value,
  disabled
}) => {
  const [inputValue, setInputValue] = useState('');
  const taref = useRef(null); 
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    taref.current.style.height = '5px';
    const txtareaheight =
    taref.current.scrollHeight > 145 ? 140 : taref.current.scrollHeight;
    taref.current.style.height = txtareaheight + "px";
  }, [value,inputValue]);

  return (
    <textarea
      className={className}
      ref={taref}
      placeholder={placeholder}
      onPaste={event => {
        setInputValue(event.target.value);
        removeSpecialChars(event);
        const txtareaheight =
          event.target.scrollHeight > 300 ? 300 : event.target.scrollHeight;
        event.target.style.height = `auto`;
        event.target.style.height = `${txtareaheight + 2}px`;
      }}
      onChange={event => {
        setInputValue(event.target.value);
        const txtareaheight =
          event.target.scrollHeight > 300 ? 300 : event.target.scrollHeight;
        event.target.style.height = `auto`;
        event.target.style.height = `${txtareaheight + 2}px`;
      }}
      onBlur={onBlur}
      onFocus={onFocus}
      value={inputValue}
      rows="1"
      style={{ resize: 'vertical' }}
      disabled={disabled}
    />
  );
};

export default React.memo(TextAreaV2);
