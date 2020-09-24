// @flow
import React from 'react';
import { Calendar } from '../svg';

type Props = {
  value: string,
  placeholder: string,
  onFocus?: Function,
  onBlur?: Function,
  onChange?: Function,
  onKeyUp?: Function,
  onClick?: Function
};

const DatePickerCustomInput = ({
  value,
  onFocus,
  onBlur,
  onChange,
  onKeyUp,
  onClick,
  placeholder
}: Props) => (
  <div className="datepicker-wrapper">
    <Calendar className="datepicker-icon" />
    <input
      className={
        value === 'MM/DD/YYYY'
          ? 'datepicker-input placeholder'
          : 'datepicker-input date'
      }
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      onClick={onClick}
      onBlur={onBlur}
    />
  </div>
);

DatePickerCustomInput.defaultProps = {
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  onKeyUp: undefined,
  onClick: undefined
};

export default DatePickerCustomInput;
