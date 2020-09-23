// @flow
import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import { formatDate } from '../../utils/DateUtils';
import DatePickerCustomInput from './DatePickerCustomInput';

type Props = {
  onSetRange: Function,
  label?: string
};

type State = {
  from: Date,
  to: Date,
  showPicker: boolean
};

const dateFormat = 'dd-MMM-yyyy';
class DateRange extends Component<Props, State> {
  static defaultProps = {
    label: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      showPicker: false
    };
  }

  handleDayClick = day => {
    const { onSetRange } = this.props;
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range, () => {
      if (range.from && range.to) {
        this.setState({ showPicker: false });
        onSetRange(range);
      }
    });
  };

  showPicker = () => this.setState({ showPicker: true });

  render() {
    const { label } = this.props;
    const { from, to, showPicker } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="date-picker">
        {label && <p className="date-picker-title">{label}</p>}
        <DatePickerCustomInput
          placeholder="Select a date range"
          value={
            from && to
              ? `${formatDate(from, dateFormat)} - ${formatDate(
                  to,
                  dateFormat
                )}`
              : ''
          }
          onFocus={this.showPicker}
          resetButton={from && to}
        />
        {showPicker && (
          <DayPicker
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            todayButton="Today"
            classNames={{
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
            }}
          />
        )}
      </div>
    );
  }
}

export default DateRange;
