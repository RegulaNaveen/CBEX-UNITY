// @flow
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import _ from 'lodash';
import DatePickerCustomInput from './DatePickerCustomInput';
import { parseMomentDate } from '../../utils/DateUtils';

type Props = {
  label?: any,
  selectedDay: string,
  handleDayChange: Function,
  handleFormatDate: Function,
  handleDate: Function,
  value?: string
};

const DatePicker = ({
  label,
  selectedDay,
  handleDayChange,
  handleFormatDate,
  handleDate,
  value
}: Props) => {
  let dateFormat = '';
  if (!_.isEmpty(value)) {
    const date = new Date(value || '');
    dateFormat = parseMomentDate(date);
  }

  function handleChange(pickedDay: string) {
    handleDayChange(pickedDay, value);
  }

  return (
    <div className="date-picker">
      {label && <p className="date-picker-title">{label}</p>}
      <DayPickerInput
        value={dateFormat || selectedDay || 'DD/MM/YYYY'}
        onDayChange={handleChange}
        component={DatePickerCustomInput}
        format="dd/MM/yyyy"
        formatDate={handleFormatDate}
        parseDate={handleDate}
        dayPickerProps={{
          showOutsideDays: true,
          todayButton: 'Today',
          classNames: {
            container: 'datepicker-container',
            wrapper: 'DayPicker-wrapper',
            interactionDisabled: 'DayPicker--interactionDisabled',
            months: 'DayPicker-Months',
            month: 'DayPicker-Month',

            navBar: 'DayPicker-NavBar',
            navButtonPrev: 'DayPicker-NavButton DayPicker-NavButton--prev',
            navButtonNext: 'DayPicker-NavButton DayPicker-NavButton--next',
            navButtonInteractionDisabled:
              'DayPicker-NavButton--interactionDisabled',

            caption: 'DayPicker-Caption',
            weekdays: 'DayPicker-Weekdays',
            weekdaysRow: 'DayPicker-WeekdaysRow',
            weekday: 'DayPicker-Weekday',
            body: 'DayPicker-Body',
            week: 'DayPicker-Week',
            weekNumber: 'DayPicker-WeekNumber',
            day: 'DayPicker-Day',
            footer: 'datepicker-footer',
            todayButton: 'datepicker-today-button',

            // default modifiers
            today: 'DayPicker-Day--today',
            selected: 'datepicker-selected',
            disabled: 'DayPicker-Day--disabl',
            outside: 'DayPicker-Day--outside'
          }
        }}
      />
    </div>
  );
};

DatePicker.defaultProps = {
  label: undefined,
  value: undefined
};

export default DatePicker;
