// @flow
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty } from 'lodash';
import TextField from 'apollo-react/components/TextField';
import { Checkmark } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import DatePicker from './atoms/inputs/DatePicker';
import UserLookup from './atoms/inputs/UserLookup';
import { parseDate, formatDate, parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import { setProposalAnswerData } from '../../redux/actions/proposal-actions';
import { getUserData, getProposalDetails } from '../../redux/selectors';
import MatomoHOC from '../HOC/MatomoHOC';
import { getCountriesNameForCode, getCountryOptions } from '../../utils/utils';
import ChipView from './Chip/ChipView';

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
  setQuestionToDisplayHistory: (answer: string) => void,
  eventCategories: any,
  trackEvent: any,
  proposalDetail: any,
  sfObject: string,
  sfField: string,
  milestone: any,
  ismilestoneavailable: string
};

export class TaskRow extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedDay: ''
    };
  }

  componentDidMount() {
    const elem = document.querySelectorAll('textarea');
    if (elem && elem.length) {
      for (let index = 0; index < elem.length; index++) {
        if (elem[index].scrollHeight < 40) {
          elem[index].style.height = '5px';
        } else if (
          elem[index].value.split('\n').length > 5 ||
          elem[index].value.length > 275
        ) {
          elem[index].style.height = '140px';
        } else if (
          elem[index].value.split('\n').length < 5 ||
          elem[index].value.length < 275
        ) {
          elem[index].style.height = `${elem[index].scrollHeight + 2}px`;
        }
      }
    }
  }

  handleTextChange = (textValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (lastAnswer !== textValue)
        setProposalAnswer(proposalId, questionId, textValue, userData);
    } else if (!textValue && lastAnswer.trim()) {
      setProposalAnswer(proposalId, questionId, ' ', userData);
    }

    this.trackMatomoEventSubmitAnswer(textValue);
  };

  onClickChange = (selectedValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (lastAnswer !== selectedValue)
      setProposalAnswer(proposalId, questionId, selectedValue, userData);

    this.trackMatomoEventSubmitAnswer(selectedValue);
  };

  handleDayChange = (selectedDay: string, lastAnswer: Date) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    this.setState({ selectedDay }, () => {
      if (parseMomentDate(lastAnswer) !== parseMomentDate(selectedDay))
        setProposalAnswer(proposalId, questionId, selectedDay, userData);
    });
    this.trackMatomoEventSubmitAnswer(selectedDay);
  };

  onSelectValues = (
    selectedValues: Array<string>,
    lastAnswer: Array<string>
  ) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (!isEqual(lastAnswer, selectedValues))
      setProposalAnswer(proposalId, questionId, selectedValues, userData);

    this.trackMatomoEventSubmitAnswer(selectedValues);
  };

  displayAnswerOnHistory = () => {
    const { setQuestionToDisplayHistory, questionId } = this.props;
    setQuestionToDisplayHistory(questionId);
    this.trackMatomoEventAnswerHistory();
  };

  trackMatomoEventSubmitAnswer = data => {
    const {
      eventCategories,
      proposalDetail,
      questionText,
      sectionName,
      trackEvent,
      questionId
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Question: ${questionText} (${sectionName})`,
      name: `Answer: ${data}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            answer: data,
            sectionName,
            questionText,
            questionId,
            proposalDetail
          })
        }
      ]
    });
  };

  trackMatomoEventAnswerHistory = () => {
    const {
      eventCategories,
      proposalDetail,
      questionText,
      sectionName,
      trackEvent,
      questionId
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Answer History: Clicked On ${questionText} (${sectionName})`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            sectionName,
            questionText,
            questionId,
            proposalDetail
          })
        }
      ]
    });
  };

  renderAnswer = (
    type: string,
    options: Map,
    answers: Map,
    lastAnswer: Map,
    questionText: Map
  ) => {
    const { sectionName, sfObject, sfField } = this.props;
    const { selectedDay } = this.state;

    const optionsYN = ['Yes', 'No'];
    const answer = lastAnswer && lastAnswer.get('answer');

    let answerValue = '';
    let answerValueComplex;
    let finalOptions = options;

    if (answer) {
      if (isObject(answer)) answerValueComplex = answer.toJS();
      else answerValue = answer.toString();
    }

    if (sectionName === 'Proposal Team')
      return <UserLookup onChange={this.handleTextChange} text={answerValue} />;

    if (
      type === 'picklist' &&
      (sfObject === 'Bid_History__c' ||
        sfObject === 'Apttus__APTS_Agreement__c') &&
      sfField === 'Targeted_Countries__c'
    ) {
      answerValueComplex = getCountriesNameForCode(answerValueComplex || []);
      finalOptions = getCountryOptions();
    }

    switch (type) {
      case 'text':
        return (
          <TextField
            id={String(questionText.substr(0, 20)).replaceAll(' ', '')}
            className="proposal-text-area"
            placeholder="Click to answer"
            onChange={() => {
              const elem = document.getElementById(
                String(questionText.substr(0, 20)).replaceAll(' ', '')
              );
              if (elem.scrollHeight < 40 || elem.value.length === 0) {
                elem.style.height = '5px';
              } else if (
                elem.value.split('\n').length > 5 ||
                elem.value.length > 275
              ) {
                elem.style.height = '140px';
              } else if (
                elem.value.split('\n').length < 5 ||
                elem.value.length < 275
              ) {
                elem.style.height = `${elem.scrollHeight + 2}px`;
              }
            }}
            onBlur={e => {
              this.handleTextChange(e.target.value, answerValue);
            }}
            defaultValue={answerValue}
            sizeAdjustable
            minHeight={40}
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
            items={finalOptions}
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
            items={finalOptions}
            onClick={this.onSelectValues}
            value={answerValueComplex}
          />
        );
      default:
        return <div id="no-configuration">Click to answer</div>;
    }
  };

  renderTags = (milestone, ismilestoneavailable, lastAnswer) => {
    if (ismilestoneavailable) {
      return (
        <div className="chipview">
          {milestone ? (
            <ChipView label={String(milestone)} answer={lastAnswer} />
          ) : (
            <>{lastAnswer ? <Checkmark /> : null}</>
          )}
        </div>
      );
    }
    if (lastAnswer) {
      return <Checkmark />;
    }
    return <span />;
  };

  render() {
    const {
      answers,
      questionText,
      answerConfiguration,
      milestone,
      ismilestoneavailable
    } = this.props;
    const questionId = answers.get('questionId');
    let lastAnswer;
    let answerDate = 'Not Answered';
    if (!questionId) lastAnswer = answers.last();
    else lastAnswer = answers.get('answers').last();

    if (lastAnswer) answerDate = parseMomentDate(lastAnswer.get('date'));
    return (
      <div className="task-table-row">
        <div className="question-text">
          {this.renderTags(milestone, ismilestoneavailable, lastAnswer)}
          <p>{questionText}</p>
        </div>

        <div>
          {answerConfiguration
            ? this.renderAnswer(
                answerConfiguration.get('type'),
                answerConfiguration.get('options'),
                answers,
                lastAnswer,
                questionText
              )
            : this.renderAnswer('', [], [], undefined, questionText)}
        </div>

        <button type="button" onClick={this.displayAnswerOnHistory}>
          {answerDate}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  userData: getUserData(state),
  proposalDetail: getProposalDetails(state)
});

export default connect(mapStateToProps, {
  setProposalAnswer: setProposalAnswerData
})(MatomoHOC(TaskRow));
