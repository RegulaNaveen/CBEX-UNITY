// @flow
import React from 'react';
import { Calendar, CloseCircle } from '../../../svg';

type Props = {
  value: string,
  placeholder: string,
  onFocus?: Function,
  onBlur?: Function,
  onChange?: Function,
  onKeyUp?: Function,
  onClick?: Function,
  withReset?: boolean,
  onReset?: Function,
};

const DatePickerCustomInput = ({
  value,
  onFocus,
  onBlur,
  onChange,
  onKeyUp,
  onClick,
  placeholder,
  withReset,
  onReset,
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
    {withReset && value && (
      <button type="button" onClick={onReset} className="resetButton">
        <CloseCircle fill="#444" />
      </button>
    )}
  </div>
);

DatePickerCustomInput.defaultProps = {
  onFocus: undefined,
  onBlur: undefined,
  onChange: undefined,
  onKeyUp: undefined,
  onClick: undefined,
  withReset: false,
  onReset: undefined,
};

export default DatePickerCustomInput;
