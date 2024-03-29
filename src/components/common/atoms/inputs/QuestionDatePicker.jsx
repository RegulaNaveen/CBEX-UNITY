import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'apollo-react/components/DatePicker';
import moment from 'moment';
import { CloseCircle } from '../../../svg';

const QuestionDatePicker = ({
  value,
  resetDate,
  handleDayChange,
  onFocus,
  onBlur,
  disabled = false,
  toggleWatch,
  onCascadeChange,
  forceBlur,
  isMandatory
}) => {
  const [inputValue, setInputValue] = useState('');
  const [resetsubmit, setresetsubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const datePickerRef = useRef(null);
  useEffect(() => {
    value = String(value)
      .trimStart()
      .trimEnd();
    value =
      String(new Date(value)).includes('Invalid') || !String(value).length
        ? ''
        : moment(value).format('DD-MMM-YYYY');
    setInputValue(value);
    if (value) setresetsubmit(true);
    else setresetsubmit(false);
  }, [value]);

  useEffect(() => {
    if (forceBlur === true) {
      value = String(value)
        .trimStart()
        .trimEnd();
      value =
        String(new Date(value)).includes('Invalid') || !String(value).length
          ? ''
          : moment(value).format('DD-MMM-YYYY');
      setInputValue(value);
      if (datePickerRef.current) {
        datePickerRef.current.closeCalendar(); // close calendar popup
        if (datePickerRef.current.inputRef.current) {
          datePickerRef.current.inputRef.current.setAttribute(
            'aria-invalid',
            'false'
          ); // remove error state from input
          datePickerRef.current.inputRef.current.blur(); // closes watcher too
        }
      } else {
        onBlur();
      }
    }
  }, [forceBlur]);

  return (
    <div className={`date-picker ${disabled ? 'disabled' : ''}`}>
      <DatePicker
        placeholder="DD-MMM-YYYY"
        dateFormat="DD-MMM-YYYY"
        fullWidth
        disabled={disabled}
        inputProps={{
          onFocus: e => {
            if (toggleWatch) toggleWatch(true);
            onFocus();
          },
          onBlur: e => {
            if (toggleWatch) toggleWatch(false);
            onBlur();
          }
        }}
        inputValue={inputValue}
        onInputChange={dte => {
          const dateregx = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
          const yr = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ];
          setInputValue(dte);
          if (dte && dateregx.test(dte)) {
            dte = String(dte).split('-');
            dte = `${yr.indexOf(dte[1]) + 1}/${dte[0]}/${dte[2]}`;
            handleDayChange(moment(dte).format('DD-MMM-YYYY'), value);
          }
          if (!dte) {
            handleDayChange(' ', value);
          } else {
            setErrorMessage('');
          }

          if (onCascadeChange) onCascadeChange();
        }}
        ref={datePickerRef}
      />
      {resetsubmit && !disabled && (
        <button
          onClick={() => {
            setresetsubmit(false);
            setInputValue('');
            if (inputValue.trim() !== '' && !isMandatory) {
              // If inputValue is not empty, reset the date
              resetDate();
              setErrorMessage('');
            }
            if (isMandatory) {
              // If the date is mandatory, show an error message when the date is removed
              setErrorMessage(
                'This is a mandatory field and it cannot be kept blank'
              );
            }
          }}
          style={{
            alignSelf: 'auto',
            position: 'absolute',
            right: '6px',
            marginTop: 15
          }}
          type="button"
          className="resetButton"
          tabIndex={-1}
        >
          <CloseCircle fill="#444" />
        </button>
      )}
      {errorMessage && (
        <div style={{ color: '#e20000', fontSize: '13px' }}>{errorMessage}</div>
      )}
    </div>
  );
};
export default QuestionDatePicker;
