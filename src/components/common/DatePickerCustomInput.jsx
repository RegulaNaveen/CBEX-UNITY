// @flow
import React from 'react';
import { Calendar } from '../svg';

type Props = {
  value: string,
  onFocus: Function,
  onBlur: Function,
  onChange: Function,
  onKeyUp: Function,
  onClick: Function
};

const DatePickerCustomInput = (props: Props) => {
  const { value, onFocus, onBlur, onChange, onKeyUp, onClick } = props;
  return (
    <div className="datepicker-wrapper">
      <Calendar className="datepicker-icon" />
      <input
        className={
          value === 'MM/DD/YYYY'
            ? 'datepicker-input placeholder'
            : 'datepicker-input date'
        }
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onClick={onClick}
        onBlur={onBlur}
      />
    </div>
  );
};

export default DatePickerCustomInput;
