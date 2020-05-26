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
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      setProposalAnswer(proposalId, questionId, selectedValues);
    }, 800);
  };

  renderAnswer = (type: string, options: Map, answers: Map) => {
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
      case 'select':
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
            handleFormatDate={formatDate}
            handleDate={parseDate}
            value={answerValue}
          />
        );
      case 'picklist':
        return (
          <Multiselect
            placeholder="Click to answer"
            items={options}
            onClick={this.onSelectValues}
            value={answerValueComplex}
          />
        );
      default:
        return <div id="no-configuration">Click to answer</div>;
    }
  };

  render() {
    const { answers, questionText, answerConfiguration } = this.props;
    const hardCode = {
      owner: ['Owner', 'Pedro']
    };
    let answerDate = 'Not Answered';
    if (answers && answers.length > 0) {
      const { date } = answers.slice(-1)[0];
      const format = 'dd-MMM-yyyy';
      answerDate = formatDate(new Date(date), format);
    }
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
                answerConfiguration.get('type'),
                answerConfiguration.get('options'),
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
        <p className="task-table-row-completion-date">{answerDate}</p>
        <div className="task-table-row-edit">
          <div className="task-table-row-edit-wrapper icon-highlight" />
        </div>
      </div>
    );
  }
}

export default connect(undefined, {
  setProposalAnswer: setProposalAnswerData
})(TaskRow);
