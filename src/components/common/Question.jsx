// @flow
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty } from 'lodash';
import TextField from 'apollo-react/components/TextField';
import Button from 'apollo-react/components/Button';
import IconButton from 'apollo-react/components/IconButton';
import Grid from 'apollo-react/components/Grid';
import Box from 'apollo-react/components/Box';
import Typography from 'apollo-react/components/Typography';
import { Checkmark } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import UserLookup from './atoms/inputs/UserLookup';
import { parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import { setProposalAnswerData } from '../../redux/actions/proposal-actions';
import { getUserData, getProposalDetails } from '../../redux/selectors';
import MatomoHOC from '../HOC/MatomoHOC';
import { getCountriesNameForCode, getCountryOptions } from '../../utils/utils';
import ChipView from './Chip/ChipView';
import removeSpecialChars from '../../utils/pasteUtils';
import Autocomplete from './atoms/inputs/AutoComplete';

import DatePicker from 'apollo-react/components/DatePickerV2';
import moment from 'moment'
import QuestionDatePicker from './atoms/inputs/QuestionDatePicker';
// import DatePicker from './atoms/inputs/DatePicker';
import StatusCheck from 'apollo-react-icons/StatusCheck';

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
        const txtareaheight =
          elem[index].scrollHeight > 140 ? 140 : elem[index].scrollHeight;
        elem[index].style.height = `auto`;
        elem[index].style.height = `${txtareaheight + 2}px`;
      }
    }
  }

  handlePropsalChange = (textValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    setProposalAnswer(proposalId, questionId, textValue, userData);
    // if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
    //   if (lastAnswer !== textValue)
    //     setProposalAnswer(proposalId, questionId, textValue, userData);
    // } else if (!textValue && lastAnswer.trim()) {
    //   setProposalAnswer(proposalId, questionId, ' ', userData);
    // }

    this.trackMatomoEventSubmitAnswer(textValue);
  };

  handleTextChange = (textValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    let s1 = textValue.trim().split(' ').filter(v=>v.trim().length > 0);
    let s2 = lastAnswer.trim().split(' ').filter(v=>v.trim().length > 0);
    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (s1.length !== s2.length || s1.join(' ').trim() != s2.join(' ').trim())
        setProposalAnswer(proposalId, questionId, String(textValue).trim(), userData);
    } else if (!textValue.trim() && lastAnswer.trim()) {
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
      if (
        parseMomentDate(lastAnswer) !== parseMomentDate(selectedDay) &&
        selectedDay
      )
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

  resetDate = () => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    this.setState({ selectedDay: ' ' }, () => {
      setProposalAnswer(proposalId, questionId, this.state.selectedDay, userData);
      this.trackMatomoEventSubmitAnswer(' ');
    })
   }

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
       return <Autocomplete sectionName={sectionName} onChange={this.handlePropsalChange} text={answerValue}/>
      // return <UserLookup sectionName={sectionName} onChange={this.handleTextChange} text={answerValue} />;

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
        answerValue = !(String(answerValue).trim()) ? '' : String(answerValue).trim();
        return (
          <TextField
            className="proposal-text-area"
            placeholder="Click to answer"
            onPaste={event => {
              removeSpecialChars(event);
              const txtareaheight =
                event.target.scrollHeight > 300
                  ? 300
                  : event.target.scrollHeight;
              event.target.style.height = `auto`;
              event.target.style.height = `${txtareaheight + 2}px`;
            }}
            onChange={event => {
              const txtareaheight =
                event.target.scrollHeight > 300
                  ? 300
                  : event.target.scrollHeight;
              event.target.style.height = `auto`;
              event.target.style.height = `${txtareaheight + 2}px`;
            }}
            onBlur={e => this.handleTextChange(e.target.value, answerValue)}
            defaultValue={answerValue}
            sizeAdjustable
            minHeight={40}
          />
        );
      case 'number':
        answerValue = !(String(answerValue).trim()) ? '' : String(answerValue).trim();
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
          <QuestionDatePicker 
            value={answerValue} 
            resetDate={this.resetDate}
            handleDayChange={this.handleDayChange}
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
    return (
      <div className="chipview">
        { milestone ? 
          <ChipView label={String(milestone)} answer={lastAnswer} /> :
          null
        }
      </div>
    );
  };

  handleVerifyPredictedAnsClick(predictedAnswer) {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    setProposalAnswer(proposalId, questionId, String(predictedAnswer.get('answer')).trim(), userData);
  }

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
    let isAnswerPredicted = false;
    if (!questionId) lastAnswer = answers.last();
    else lastAnswer = answers.get('answers').last();

    if (lastAnswer) {
      answerDate = parseMomentDate(lastAnswer.get('date'));
      if (lastAnswer.get('userName') === 'UnityPredictedAnswer') {
        isAnswerPredicted = true;
        answerDate = 'Not Answered';
      }
    }

    return (
      <Box marginBottom={{ xs: '24px', md: '8px' }}>
        <Grid
          container
          spacing={2}
          className="question-row"
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            style={{ display: 'flex', alignItems: 'center'}}
          >
            <Grid container spacing={2} className="question-text-container">
              <Grid component={Box} item xs={4} sm={3} display={{ md: 'none' }}>
                <p style={{fontWeight: 'bold', marginRight: '8px'}}>Question </p>
              </Grid>
              <Grid item xs={8} sm={9} md={12}>
                <div className="question-text">
                  { this.renderTags(milestone, ismilestoneavailable, lastAnswer) }
                  <p>{questionText}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={5}
            className="answer-col"
          >
            <Grid container spacing={2} className="question-text-container">
              <Grid component={Box} item xs={4} sm={3} display={{ md: 'none' }}>
                <p style={{fontWeight: 'bold', marginRight: '8px'}}>Answer </p>
              </Grid>
              <Grid item xs={8} sm={9} md={12}>
                <div className="test">
                  { answerConfiguration ? this.renderAnswer(
                      answerConfiguration.get('type'),
                      answerConfiguration.get('options'),
                      answers,
                      lastAnswer,
                      questionText
                    ) : this.renderAnswer('', [], [], undefined, questionText)
                  }
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            lg={2}
            xl={1}
            className="date-answered-col"
          >
            <Grid container spacing={2} className="question-text-container">
              <Grid component={Box} item xs={4} sm={3} display={{ md: 'none' }}>
                <p style={{fontWeight: 'bold', marginRight: '8px'}}>Date Completed </p>
              </Grid>
              <Grid item xs={8} sm={9} md={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Button
                  variant="text"
                  onClick={this.displayAnswerOnHistory}
                  style={{ padding: '0 4px', width: '120px', justifyContent: 'flex-start' }} // based on current date format
                >
                  {answerDate}
                </Button>
                {
                  (isAnswerPredicted) ? (
                    <IconButton onClick={() => this.handleVerifyPredictedAnsClick(lastAnswer)}>
                      <StatusCheck fontSize={'22px'} style={{ color: '#D9D9D9' }} />
                    </IconButton>
                  ) : null
                }
                {
                  (lastAnswer && lastAnswer.get('answer').trim() && !isAnswerPredicted) ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                      <Checkmark />
                    </div>
                  ) : null
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
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
