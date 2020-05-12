// @flow
import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DatePickerCustomInput from './DatePickerCustomInput';

type Props = {
  label?: any,
  selectedDay: string,
  handleDayChange: Function,
  handleFormatDate: Function,
  handleDate: Function,
  value: string
};

const DatePicker = ({
  label,
  selectedDay,
  handleDayChange,
  handleFormatDate,
  handleDate,
  value
}: Props) => {
  return (
    <div className="date-picker">
      {label && <p className="date-picker-title">{label}</p>}
      <DayPickerInput
        value={selectedDay || 'MM/DD/YYYY' || value}
        onDayChange={handleDayChange}
        component={DatePickerCustomInput}
        format="MM/dd/yyyy"
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
  label: undefined
};

export default DatePicker;
