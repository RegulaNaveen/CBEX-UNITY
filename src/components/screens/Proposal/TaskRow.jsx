// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { Checkmark } from '../../svg';
import { getRandomColor } from '../../../utils/colors';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
import DatePicker from '../../common/DatePicker';
import { parseDate, formatDate } from '../../../utils/DateUtils';
import Multiselect from '../../common/Multiselect';
import { setProposalAnswerData } from '../../../actions/proposal-actions';

type State = {
  selectedDay: string
};

type Props = {
  questionId: string,
  proposalId: string,
  answers: Array<Object>,
  questionText: string,
  answerConfiguration: Object,
  setProposalAnswer: Function
};

export class TaskRow extends Component<Props, State> {
  timeout: any;

  constructor(props: Object) {
    super(props);

    this.state = {
      selectedDay: ''
    };

    this.timeout = 0;
  }

  handleTextChange = (textValue: string) => {
    const { setProposalAnswer, proposalId, questionId } = this.props;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      setProposalAnswer(proposalId, questionId, textValue);
    }, 800);
  };

  onClickChange = (selectedValue: string) => {
    const { setProposalAnswer, proposalId, questionId } = this.props;
    setProposalAnswer(proposalId, questionId, selectedValue);
  };

  handleDayChange = (selectedDay: string) => {
    const { setProposalAnswer, proposalId, questionId } = this.props;
    this.setState(
      {
        selectedDay
      },
      () => {
        setProposalAnswer(proposalId, questionId, selectedDay);
      }
    );
  };

  onSelectValues = (selectedValues: Array<string>) => {
    const { setProposalAnswer, proposalId, questionId } = this.props;
    setProposalAnswer(proposalId, questionId, selectedValues);
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
    let answerValue = '';
    let answerValueComplex;
    if (answer !== undefined) {
      if (typeof answer.answer === 'string') answerValue = answer.answer;
      answerValueComplex = answer.answer;
    }

    switch (type) {
      case 'text':
        return (
          <TextArea
            className="proposal-text-area"
            placeholder="Click to answer"
            type="text"
            onChange={this.handleTextChange}
            value={answerValue}
          />
        );
      case 'number':
        return (
          <TextArea
            className="proposal-text-area"
            placeholder="Click to answer"
            type="number"
            onChange={this.handleTextChange}
            value={answerValue}
          />
        );
      case 'y/n':
        return (
          <Dropdown
            id="dd-proposal-answer"
            placeholder="Click to answer"
            items={optionsYN}
            onClick={this.onClickChange}
            value={answerValue}
          />
        );
      case 'single-picklist':
        return (
          <Dropdown
            id="dd-proposal-answer"
            placeholder="Click to answer"
            items={options}
            onClick={this.onClickChange}
            value={answerValue}
          />
        );
      case 'date':
        return (
          <DatePicker
            selectedDay={selectedDay}
            handleDayChange={this.handleDayChange}
            handleFormatDate={this.handleFormatDate}
            handleDate={this.handleDate}
            value={answerValue}
          />
        );
      case 'multi-picklist':
        return (
          <Multiselect
            placeholder="Click to answer"
            items={options}
            onClick={this.onSelectValues}
            value={answerValueComplex}
          />
        );
      default:
        return <div>Click to answer</div>;
    }
  };

  render() {
    const { answers, questionText, answerConfiguration } = this.props;
    const hardCode = {
      owner: ['Owner', 'Pedro'],
      dueDate: '02-Apr-2020',
      completionDate: '02-Apr-2020'
    };

    return (
      <div className="task-table-row">
        {answers.length ? (
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
          <p className="task-table-row-question">{questionText}</p>
        </div>
        <div className="task-table-row-answer">
          {answerConfiguration
            ? this.renderAnswer(
                answerConfiguration.type,
                answerConfiguration.options,
                answers
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
    );
  }
}

const mapStateToProps = (state: Map) => {
  return { state };
};

export default connect(mapStateToProps, {
  setProposalAnswer: setProposalAnswerData
})(TaskRow);
