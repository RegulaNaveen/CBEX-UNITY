// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import chevronRight from '../../../../img/chevron-right.svg';
import chevronDown from '../../../../img/chevron-down.svg';
import { Checkmark } from '../../svg';
import { getRandomColor } from '../../../utils/colors';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
import DatePicker from '../../common/DatePicker';
import { parseDate, formatDate } from '../../../utils/DateUtils';
import Multiselect from '../../common/Multiselect';
import { setProposalAnswerData } from '../../../actions/proposal-actions';

type State = {
  isCollapsed: boolean,
  selectedDay: string
};

type Props = {
  data: Array<Object>,
  isComplete: boolean,
  title: string,
  uncompletedQuestions: number,
  setProposalAnswer: Function
};

class Task extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false,
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

  handleTextChange = () => {
    // TODO: Call answer endpoint to send answer
  };

  onClickChange = () => {
    // TODO: Call answer endpoint to send answer
  };

  handleDayChange = (selectedDay: string) => {
    const { setProposalAnswer } = this.props;
    this.setState(
      {
        selectedDay
      },
      () => {
        setProposalAnswer(
          '9b28f967-229c-4ca4-9ab6-74e8e681bd50',
          'Country Strategy-N9P',
          'Wed May 06 2020 12:00:00 GMT-0500 (Central Daylight Time)'
        );
      }
    );
  };

  handleDate = (date: string, format: string) => parseDate(date, format);

  handleFormatDate = (date: Date, format: string) => formatDate(date, format);

  renderAnswer = (
    type: string,
    options: Array<Object>,
    answers: Array<Object>
  ) => {
    const { selectedDay } = this.state;
    const optionsYN = ['Yes', 'No'];
    const answer = answers.slice(-1)[0];

    console.log('LAST', answer);

    switch (type) {
      case 'text':
        return (
          <TextArea
            className="proposal-text-area"
            placeholder="Click to answer"
            type="text"
            onChange={this.handleTextChange}
          />
        );
      case 'number':
        return (
          <TextArea
            className="proposal-text-area"
            placeholder="Click to answer"
            type="number"
            onChange={this.handleTextChange}
          />
        );
      case 'y/n':
        return (
          <Dropdown
            id="dd-proposal-answer"
            placeholder="Click to answer"
            items={optionsYN}
            onClick={this.onClickChange}
          />
        );
      case 'single-picklist':
        return (
          <Dropdown
            id="dd-proposal-answer"
            placeholder="Click to answer"
            items={options}
            onClick={this.onClickChange}
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
                  {item.answers.length ? (
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
                          item.answerConfiguration.options,
                          item.answers
                        )
                      : this.renderAnswer('', [], [])}
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

const mapStateToProps = (state: Map) => {
  return { state };
};

export default connect(mapStateToProps, {
  setProposalAnswer: setProposalAnswerData
})(Task);
