// @flow
import React from 'react';

type Props = {
  value: string,
  onFocus: Function,
  onBlur: Function,
  onChange: Function,
  onKeyUp: Function,
  onClick: Function
};

const DayPickerCustomInput = (props: Props) => {
  const { value, onFocus, onBlur, onChange, onKeyUp, onClick } = props;
  return (
    <div className="daypicker-container">
      <input
        className="daypicker-input"
        value={value}
        onChange={onChange && onChange}
        onFocus={onFocus && onFocus}
        onKeyUp={onKeyUp && onKeyUp}
        onClick={onClick && onClick}
        onBlur={onBlur && onBlur}
      />
    </div>
  );
};

export default DayPickerCustomInput;
