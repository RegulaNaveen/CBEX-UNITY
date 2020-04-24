// @flow
import React, { PureComponent } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import typeof Locale from 'date-fns/locale/en-US';
import 'react-day-picker/lib/style.css';
import Modal from '../../common/Modal';
import DatePickerCustomInput from '../../common/DatePickerCustomInput';
import { PrimaryButton } from '../../common/Buttons';
import Checkbox from '../../common/Checkbox';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
import SelectTeam from '../../common/SelectTeam';
import Close from '../../svg/Close';

type Props = {
  onClose: Function,
  onSave: Function,
  items: Array<Object>,
  teams: Array<Object>
};

type State = {
  isChecked: boolean,
  questionText: string,
  selectedDay: string
};

class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isChecked: false,
      questionText: '',
      selectedDay: ''
    };
  }

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  handleDeleteTeam = () => {
    // TODO: Delete a team item
  };

  handleQuestionText = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ questionText: event.target.value });
  };

  handleDayChange = (selectedDay: string) => {
    this.setState({
      selectedDay
    });
  };

  parseDate = (str: string, format: string, locale: Locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  };

  formatDate = (date: number, format: string, locale: Locale) => {
    return dateFnsFormat(date, format, { locale });
  };

  render() {
    const { isChecked, questionText, selectedDay } = this.state;
    const { onClose, onSave, items, teams } = this.props;

    return (
      <Modal>
        <div className="modal-content">
          <div className="modal-wrapper-title">
            <div className="modal-segment-title">
              <p className="modal-title">Add New Question</p>
              <div
                className="close-modal-icon"
                role="presentation"
                onClick={onClose}
              >
                <Close className="close-icon" />
              </div>
            </div>
            <div className="modal-subtitle">Optional Subtitle</div>
          </div>
          <div className="modal-wrapper-body">
            <div className="modal-segment">
              <TextArea
                id="question-text-area"
                className="modal-text-area"
                value={questionText}
                onChange={this.handleQuestionText}
                placeholder="Hint text..."
                title="Enter Question Text"
              />
            </div>
            <div className="modal-segment">
              <div className="modal-answer-type">
                <Dropdown
                  id="dd-andwer-type"
                  placeholder="Select"
                  items={items}
                  title="Answer Type"
                />
              </div>
              <div className="modal-picker">
                <p className="dd-title">Label</p>
                <DayPickerInput
                  value={selectedDay || 'MM/DD/YYYY'}
                  onDayChange={this.handleDayChange}
                  component={DatePickerCustomInput}
                  format="MM/dd/yyyy"
                  formatDate={this.formatDate}
                  parseDate={this.parseDate}
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
                      navButtonPrev:
                        'DayPicker-NavButton DayPicker-NavButton--prev',
                      navButtonNext:
                        'DayPicker-NavButton DayPicker-NavButton--next',
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
            </div>
            <div className="modal-segment">
              <Dropdown
                id="dd-team-member"
                placeholder="Select"
                items={items}
                title="Which team member roles will answer"
              />
            </div>
            <div className="modal-segment">
              {teams &&
                teams.map(team => {
                  const { id, name } = team;
                  return (
                    <SelectTeam
                      key={id}
                      id="selected-team-item"
                      onClick={this.handleDeleteTeam}
                    >
                      {name}
                    </SelectTeam>
                  );
                })}
            </div>
            <div className="modal-segment">
              <Checkbox
                id="send-notification-checkbox"
                value="notification"
                name="notification"
                onChange={this.handleIsChecked}
                isChecked={isChecked}
              >
                Send notification now
              </Checkbox>
            </div>
          </div>
          <div className="modal-wrapper-footer">
            <div className="modal-button-cancel">
              <PrimaryButton
                className="close-button"
                id="cancel-button"
                onClick={onClose}
              >
                Cancel
              </PrimaryButton>
            </div>
            <div className="modal-button-okay">
              <PrimaryButton
                className="okay-button"
                id="okay-button"
                onClick={onSave}
              >
                Okay
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddQuestionModal;
