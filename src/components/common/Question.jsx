// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty } from 'lodash';
import { Checkmark } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import DatePicker from './atoms/inputs/DatePicker';
import UserLookup from './atoms/inputs/UserLookup';
import { parseDate, formatDate, parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import { setProposalAnswerData } from '../../redux/actions/proposal-actions';
import { getUserData } from '../../redux/selectors';

type State = {
  selectedDay: string
};

type Props = {
  questionId: string,
  proposalId: string,
  answers: Map,
  questionText: string,
  answerConfiguration: Object,
  sectionName: string,
  userData: Object,
  setProposalAnswer: Function,
  setQuestionToDisplayHistory: (answer: string) => void
};

export class TaskRow extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedDay: ''
    };
  }

  handleTextChange = (textValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (lastAnswer !== textValue)
        setProposalAnswer(proposalId, questionId, textValue, userData);
    } else if (!textValue && lastAnswer) {
      setProposalAnswer(proposalId, questionId, ' ', userData);
    }
  };

  onClickChange = (selectedValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (lastAnswer !== selectedValue)
      setProposalAnswer(proposalId, questionId, selectedValue, userData);
  };

  handleDayChange = (selectedDay: string, lastAnswer: Date) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    this.setState({ selectedDay }, () => {
      if (parseMomentDate(lastAnswer) !== parseMomentDate(selectedDay))
        setProposalAnswer(proposalId, questionId, selectedDay, userData);
    });
  };

  onSelectValues = (
    selectedValues: Array<string>,
    lastAnswer: Array<string>
  ) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (!isEqual(lastAnswer, selectedValues))
      setProposalAnswer(proposalId, questionId, selectedValues, userData);
  };

  displayAnswerOnHistory = () => {
    const { setQuestionToDisplayHistory, questionId } = this.props;
    setQuestionToDisplayHistory(questionId);
  };

  renderAnswer = (
    type: string,
    options: Map,
    answers: Map,
    lastAnswer: Map
  ) => {
    const { sectionName } = this.props;
    const { selectedDay } = this.state;

    const optionsYN = ['Yes', 'No'];
    const answer = lastAnswer && lastAnswer.get('answer');

    let answerValue = '';
    let answerValueComplex;

    if (answer) {
      if (isObject(answer)) answerValueComplex = answer.toJS();
      else answerValue = answer.toString();
    }

    if (sectionName === 'Proposal Team')
      return <UserLookup onChange={this.handleTextChange} text={answerValue} />;

    switch (type) {
      case 'text':
        return (
          <TextArea
            className="proposal-text-area"
            placeholder="Click to answer"
            type="text"
            onBlur={this.handleTextChange}
            value={answerValue}
          />
        );
      case 'number':
        return (
          <TextArea
            className="proposal-text-area"
            placeholder="Click to answer"
            type="number"
            onBlur={this.handleTextChange}
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
    const questionId = answers.get('questionId');
    let lastAnswer;
    let answerDate = 'Not Answered';

    if (!questionId) lastAnswer = answers.last();
    else lastAnswer = answers.get('answers').last();

    if (lastAnswer) answerDate = parseMomentDate(lastAnswer.get('date'));

    return (
      <div className="task-table-row">
        <div className="question-text">
          {lastAnswer ? <Checkmark /> : <span />}
          <p>{questionText}</p>
        </div>

        <div>
          {answerConfiguration
            ? this.renderAnswer(
                answerConfiguration.get('type'),
                answerConfiguration.get('options'),
                answers,
                lastAnswer
              )
            : this.renderAnswer('', [], [], undefined)}
        </div>

        <button type="button" onClick={this.displayAnswerOnHistory}>
          {answerDate}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  userData: getUserData(state)
});

export default connect(mapStateToProps, {
  setProposalAnswer: setProposalAnswerData
})(TaskRow);
