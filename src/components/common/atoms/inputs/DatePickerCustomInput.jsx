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
  defaultValue?: string
};

const DatePickerCustomInput = ({
  defaultValue,
  value,
  onFocus,
  onBlur,
  onChange,
  datestyle,
  onKeyUp,
  onClick,
  placeholder,
  withReset,
  onReset
}: Props) => (
  <div className="datepicker-wrapper">
    <Calendar className="datepicker-icon" />
    <input
      className={
        value === 'MM/DD/YYYY'
          ? 'datepicker-input placeholder'
          : 'datepicker-input date inputdatesize'
      }
      value={value || defaultValue}
      placeholder={placeholder}
      readOnly={datestyle ? true : false}
      onChange={onChange}
      onFocus={onFocus}
      onKeyUp={onKeyUp}
      onClick={onClick}
      onBlur={onBlur}
    />
    {withReset && (value || defaultValue) && (
      <button style={datestyle ? {alignSelf: 'auto', marginTop: 0} : null} type="button" onClick={onReset} className="resetButton">
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
  defaultValue: ''
};

export default DatePickerCustomInput;
