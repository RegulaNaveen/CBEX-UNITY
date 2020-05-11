// @flow
import React, { Component } from 'react';
import chevronRight from '../../../../img/chevron-right.svg';
import chevronDown from '../../../../img/chevron-down.svg';
import { Checkmark } from '../../svg';
import { getRandomColor } from '../../../utils/colors';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
import DatePicker from '../../common/DatePicker';
import { parseDate, formatDate } from '../../../utils/DateUtils';
import Multiselect from '../../common/Multiselect';

type State = {
  isCollapsed: boolean,
  answerText: string,
  selectedDay: string
};

type Props = {
  data: Array<Object>,
  isComplete: boolean,
  title: string,
  uncompletedQuestions: number
};

class Task extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false,
      answerText: '',
      selectedDay: ''
    };
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleCollapse();
    }
  };

  handleAnswerText = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ answerText: event.target.value });
  };

  handleDayChange = (selectedDay: string) => {
    this.setState({
      selectedDay
    });
  };

  handleDate = (date: string, format: string) => parseDate(date, format);

  handleFormatDate = (date: Date, format: string) => formatDate(date, format);

  renderAnswer = (type: string, options: Array<Object>) => {
    const { answerText, selectedDay } = this.state;
    const optionsYN = ['Yes', 'No'];
    switch (type) {
      case 'text':
        return (
          <TextArea
            className="proposal-text-area"
            value={answerText}
            onChange={this.handleAnswerText}
            placeholder="Click to answer"
            type="text"
          />
        );
      case 'number':
        return (
          <TextArea
            className="proposal-text-area"
            value={answerText}
            onChange={this.handleAnswerText}
            placeholder="Click to answer"
            type="number"
          />
        );
      case 'y/n':
        return (
          <Dropdown
            id="dd-proposal-answer"
            placeholder="Click to answer"
            items={optionsYN}
          />
        );
      case 'single-picklist':
        return (
          <Dropdown
            id="dd-proposal-answer"
            placeholder="Click to answer"
            items={options}
          />
        );
      case 'date':
        return (
          <DatePicker
            selectedDay={selectedDay}
            handleDayChange={this.handleDayChange}
            handleFormatDate={this.handleFormatDate}
            handleDate={this.handleDate}
          />
        );
      case 'multi-picklist':
        return <Multiselect placeholder="Click to answer" items={options} />;
      default:
        return <div>Click to answer</div>;
    }
  };

  render() {
    const { isCollapsed } = this.state;
    const { data, isComplete, title, uncompletedQuestions } = this.props;
    const hardCode = {
      owner: ['Owner', 'Pedro'],
      dueDate: '02-Apr-2020',
      completionDate: '02-Apr-2020',
      complete: false
    };
    return (
      <div className={isComplete ? 'task-wrapper complete' : 'task-wrapper'}>
        <button
          id="arrow-icon"
          className="task-icon-wrapper"
          onClick={this.handleCollapse}
          onKeyPress={this.handleKeyPress}
          type="button"
          tabIndex={0}
        >
          <img
            className="task-icon"
            src={isCollapsed ? chevronDown : chevronRight}
            alt="question arrow"
          />
        </button>
        {!isCollapsed ? (
          <div
            className="task-title-wrapper"
            role="button"
            onClick={this.handleCollapse}
            onKeyPress={this.handleKeyPress}
            tabIndex={-1}
          >
            <p id="task-title" className="task-title">
              {title}
            </p>
            {isComplete ? (
              <div id="complete-status" className="task-status-wrapper">
                <Checkmark className="task-status-checkmark" />
                <p className="task-status-description">Complete</p>
              </div>
            ) : (
              <div className="task-status-wrapper">
                <p className="task-status-description">
                  {`${uncompletedQuestions.toString()} Incomplete`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="task-table-wrapper">
            <div
              className="task-table-headers"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              tabIndex={-1}
            >
              <div className="task-title">
                <p>{title}</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-answer">
                <p>Answer</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-owner">
                <p>Owner</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-due-date">
                <p>Due Date</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-completion-date">
                <p>Date Completed</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
            </div>
            {data &&
              data.map(item => (
                <div key={item.questionId} className="task-table-row">
                  {hardCode.complete ? (
                    <div className="task-table-row-checkmark">
                      <div className="task-table-row-checkmark-wrapper icon-highlight">
                        <Checkmark className="task-table-row-checkmark-wrapper-icon" />
                      </div>
                    </div>
                  ) : (
                    <div className="task-table-row-checkmark">
                      <div className="task-table-row-checkmark-wrapper icon-highlight" />
                    </div>
                  )}
                  <div className="task-table-row-question-content">
                    <p className="task-table-row-question">
                      {item.questionText}
                    </p>
                  </div>
                  <div className="task-table-row-answer">
                    {item.answerConfiguration
                      ? this.renderAnswer(
                          item.answerConfiguration.type,
                          item.answerConfiguration.options
                        )
                      : this.renderAnswer('', [])}
                  </div>
                  <div className="task-table-row-owner">
                    {hardCode.owner.map(owner => (
                      <p
                        key={owner}
                        className="task-table-row-owner-icon"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {owner.charAt(0).toUpperCase()}
                      </p>
                    ))}
                  </div>
                  <p className="task-table-row-due-date">{hardCode.dueDate}</p>
                  <p className="task-table-row-completion-date">
                    {hardCode.completionDate}
                  </p>
                  {/* TODO: Add edit proposal icon */}
                  {/* <Edit className="task-table-row-edit icon-highlight" /> */}
                  <div className="task-table-row-edit">
                    <div className="task-table-row-edit-wrapper icon-highlight" />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Task;
