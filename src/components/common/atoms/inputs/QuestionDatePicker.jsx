import React, { useState, useEffect } from 'react';
import DatePicker from 'apollo-react/components/DatePickerV2';
import moment from 'moment';
import { CloseCircle } from '../../../svg';

const date = moment();

const QuestionDatePicker = ({
  value,
  resetDate,
  handleDayChange,
  onFocus,
  onBlur
}) => {
  const [inputValue, setInputValue] = useState('');
  const [resetsubmit, setresetsubmit] = useState(false);
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
  return (
    <div className="date-picker">
      <DatePicker
        placeholder="DD-MMM-YYYY"
        dateFormat="DD-MMM-YYYY"
        fullWidth
        inputProps={{
          onFocus: e => {
            onFocus();
          },
          onBlur: e => {
            onBlur();
          }
        }}
        style={{ marginTop: 0 }}
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
            console.log(dte);
            dte = String(dte).split('-');
            dte = `${yr.indexOf(dte[1]) + 1}/${dte[0]}/${dte[2]}`;
            handleDayChange(moment(dte).format(), value);
          }
          if (!dte) handleDayChange(' ', value);
        }}
      />
      {resetsubmit && (
        <button
          onClick={() => {
            setresetsubmit(false);
            setInputValue('');
            resetDate();
          }}
          style={{
            alignSelf: 'auto',
            position: 'absolute',
            right: '6px',
            marginTop: 15
          }}
          type="button"
          className="resetButton"
        >
          <CloseCircle fill="#444" />
        </button>
      )}
    </div>
  );
};
export default QuestionDatePicker;
