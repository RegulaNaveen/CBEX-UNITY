// @flow
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Map, List } from 'immutable'; // NOSONAR
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty, xor } from 'lodash';
import IconButton from 'apollo-react/components/IconButton';
import Loader from 'apollo-react/components/Loader';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import Typography from 'apollo-react/components/Typography';
import Grid from 'apollo-react/components/Grid';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';
import { useSelector } from 'react-redux';
import Calendar from 'apollo-react-icons/Calendar';
import CalendarCheck from 'apollo-react-icons/CalendarCheck';
import moment from 'moment';
import { Edit, Outgoing, Incoming } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import TextAreaV2 from './atoms/inputs/TextAreaV2';
import { parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import Qvidianquestions from './qvidian';
import {
  setProposalAnswerData,
  setEditQuestionData,
  setProposalAnswerLoading,
  deleteProposalUserFromDB
} from '../../redux/actions/proposal-actions';
import {
  getUserData,
  getProposalDetails,
  getSelectedBid,
  getnoneditableField
} from '../../redux/selectors';
import { getOpportunityData } from '../../redux/selectors/proposal';
import MatomoHOC from '../HOC/MatomoHOC';
import {
  checkNonEditableFields,
  getCountriesNameForCode,
  getCountryOptions
} from '../../utils/utils';
import ChipView from './Chip/ChipView';
import Autocomplete from './atoms/inputs/AutoComplete';
import AutocompleteText from './atoms/inputs/AutoCompleteText';
import QuestionDatePicker from './atoms/inputs/QuestionDatePicker';
import SFAnswerValidationWrapper from './SFAnswerValidationWrapper';
import ANSWER_TYPES from '../../constants/answerTypes';

// Regex Fix for HTML and plain text showing /span> at the end of question
// const Spanexp = /[^<]\/span>/g;
type State = {
  selectedDay: string,
  selectedRow: Boolean,
  changeIcon: false
};

type Props = {
  questionId: string,
  proposalId: string,
  answers: Map,
  questionText: string,
  questionHTML: string,
  questionJSON: string,
  currentSFanswer: Object,
  qvidianIntegration: string,
  answerConfiguration: Object,
  sectionName: string,
  section: Map,
  userData: Object,
  oppdata: Object,
  setProposalAnswer: Function,
  setAnswerLoading: Function,
  deleteProposalUser: Function,
  setQuestionToDisplayHistory: (answer: string) => void,
  eventCategories: any,
  trackEvent: any,
  proposalDetail: any,
  sfObject: string,
  sfField: string,
  milestone: any,
  milestoneNew: any,
  ismilestoneavailable: string,
  loading: Boolean,
  setEditQuestionData: (data: Object) => void,
  roleNames: Array<string>,
  isCustomQuestion: boolean,
  hasDifferentSFanswer: boolean,
  isNotepadOpen: boolean
};
export class TaskRow extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedDay: '',
      selectedRow: false,
      iconColor: '#00c221'
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

  handlePropsalChange = (textValue, lastValue, reason) => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      section,
      setAnswerLoading,
      deleteProposalUser
    } = this.props;
    setProposalAnswer(proposalId, questionId, textValue, userData).then(() => {
      const [deletedVal] = xor(
        textValue.trim() ? textValue.trim().split(',') : [],
        lastValue.trim() ? lastValue.trim().split(',') : []
      );
      const [deletedEmail] = String(deletedVal).match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
      );
      if (reason === 'remove-option' && deletedEmail) {
        setAnswerLoading(questionId, true);
        const { sectionName, sectionOrder } = section.toJS();
        deleteProposalUser(
          proposalId,
          deletedEmail,
          sectionOrder,
          sectionName
        ).then(() => {
          setAnswerLoading(questionId, false);
        });
      }
    });
    this.trackMatomoEventSubmitAnswer(textValue);
  };

  handleTextChange = (textValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    this.setState({ changeIcon: true });
    const s1 = textValue
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);
    const s2 = lastAnswer
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);
    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (
        s1.length !== s2.length ||
        s1.join(' ').trim() !== s2.join(' ').trim()
      )
        setProposalAnswer(
          proposalId,
          questionId,
          String(textValue).trim(),
          userData
        );
    } else if (!textValue.trim() && lastAnswer.trim()) {
      setProposalAnswer(proposalId, questionId, ' ', userData);
    }

    this.trackMatomoEventSubmitAnswer(textValue);
    this.setSelectRow(false);
  };

  handleVerifyPredictedAnsClick(predictedAnswer) {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      answerConfiguration
    } = this.props;
    const answerType = answerConfiguration.get('type');
    this.setState({ iconColor: '#015ff1' });

    // picklist value should not be converted to string while saving
    if (
      answerType === ANSWER_TYPES.PICKLIST ||
      answerType === ANSWER_TYPES.PICKLIST_LOOKUP
    ) {
      setProposalAnswer(
        proposalId,
        questionId,
        predictedAnswer.get('answer'),
        userData
      );
    } else {
      setProposalAnswer(
        proposalId,
        questionId,
        String(predictedAnswer.get('answer')).trim(),
        userData
      );
    }
  }

  onClickChange = (selectedValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (lastAnswer !== selectedValue)
      setProposalAnswer(proposalId, questionId, selectedValue, userData);

    this.trackMatomoEventSubmitAnswer(selectedValue);
    this.setSelectRow(false);
  };

  handleDayChange = (selectedDay: string, lastAnswer: Date) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    this.setState({ selectedDay }, () => {
      if (
        parseMomentDate(lastAnswer.trim()) !==
          parseMomentDate(selectedDay.trim()) &&
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

  onChildInputFocus = () => {
    this.setSelectRow(true);
  };

  setSelectRow = value => {
    this.setState({ selectedRow: value });
  };

  trackMatomoEventSubmitAnswer = data => {
    const {
      eventCategories,
      proposalDetail,
      questionText,
      questionHTML,
      questionJSON,
      questionHintJSON,
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
            questionHTML,
            questionJSON,
            questionHintJSON,
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
      questionHTML,
      questionJSON,
      questionHintJSON,
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
            questionHTML,
            questionJSON,
            questionHintJSON,
            questionId,
            proposalDetail
          })
        }
      ]
    });
  };

  resetDate = () => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    const { selectedDay } = this.state;
    this.setState({ selectedDay: ' ' }, () => {
      setProposalAnswer(
        proposalId,
        questionId,
        this.state.selectedDay,
        userData
      );
      this.trackMatomoEventSubmitAnswer(' ');
    });
  };

  renderAnswer = (
    type: string,
    options: Map,
    answers: Map,
    lastAnswer: Map
  ) => {
    const {
      sectionName,
      sfObject,
      sfField,
      selectedBid,
      proposalInfo,
      noneditableField,
      hasDifferentSFanswer
    } = this.props;
    // const { selectedDay } = this.state;
    const isCurrentBid = selectedBid.get('isCurrent');

    const optionsYN = ['Yes', 'No'];
    const answer = lastAnswer && lastAnswer.get && lastAnswer.get('answer');

    let answerValue = '';
    let answerValueComplex;
    let finalOptions = options;
    const checkDisableFlag = () =>
      checkNonEditableFields(noneditableField, sfField, sfObject) ||
      !isCurrentBid;

    if (answer) {
      if (isObject(answer)) answerValueComplex = answer.toJS();
      else answerValue = answer.toString();
    }

    if (sectionName === 'Proposal Team') {
      return (
        <SFAnswerValidationWrapper
          hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
          sfObject={sfObject}
        >
          <Autocomplete
            sectionName={sectionName}
            onFocus={() => this.setSelectRow(true)}
            onBlur={() => this.setSelectRow(false)}
            onChange={this.handlePropsalChange}
            text={answerValue}
            disabled={checkDisableFlag()}
          />
        </SFAnswerValidationWrapper>
      );
    }

    if (
      (type === ANSWER_TYPES.PICKLIST ||
        type === ANSWER_TYPES.PICKLIST_LOOKUP) &&
      (sfObject === 'Bid_History__c' ||
        sfObject === 'Apttus__APTS_Agreement__c') &&
      sfField === 'Targeted_Countries__c'
    ) {
      answerValueComplex = getCountriesNameForCode(answerValueComplex || []);
      finalOptions = getCountryOptions();
    }

    switch (type) {
      case 'text':
        answerValue = !String(answerValue).trim()
          ? ''
          : String(answerValue).trim();
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <TextAreaV2
              className="proposal-text-area"
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              value={answerValue}
              onBlur={e => this.handleTextChange(e.target.value, answerValue)}
              onFocus={e => this.onChildInputFocus(e)}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case 'number':
        answerValue = !String(answerValue).trim()
          ? ''
          : String(answerValue).trim();
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <TextArea
              className="proposal-text-area"
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              type="number"
              onBlur={this.handleTextChange}
              onFocus={e => this.onChildInputFocus(e)}
              value={answerValue || ''}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case 'y/n':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <Dropdown
              id="dd-proposal-answer"
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              items={optionsYN}
              onClick={val => this.onClickChange(val, answerValue)}
              value={answerValue}
              setSelectRow={this.setSelectRow}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case 'select':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <Dropdown
              id="dd-proposal-answer"
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              items={finalOptions}
              onClick={val => this.onClickChange(val, answerValue)}
              value={answerValue}
              setSelectRow={this.setSelectRow}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case 'date':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <QuestionDatePicker
              value={answerValue}
              resetDate={this.resetDate}
              handleDayChange={this.handleDayChange}
              onFocus={() => this.setSelectRow(true)}
              onBlur={() => this.setSelectRow(false)}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.PICKLIST:
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <Multiselect
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              items={finalOptions}
              onClick={this.onSelectValues}
              value={answerValueComplex}
              setSelectRow={this.setSelectRow}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.PICKLIST_LOOKUP:
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <AutocompleteText
              sectionName={sectionName}
              sfObject={sfObject}
              lov={finalOptions}
              sfField={sfField}
              multiple
              onFocus={() => this.setSelectRow(true)}
              onBlur={() => this.setSelectRow(false)}
              onChange={this.handlePropsalChange}
              text={answerValueComplex}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      case 'select-lookup':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <AutocompleteText
              sectionName={sectionName}
              sfObject={sfObject}
              lov={finalOptions}
              sfField={sfField}
              onFocus={() => this.setSelectRow(true)}
              onBlur={() => this.setSelectRow(false)}
              onChange={this.handlePropsalChange}
              text={answerValue || ''}
              multiple={false}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      default:
        return <div id="no-configuration">Click to answer</div>;
    }
  };

  renderTags = (milestone, milestoneNew, ismilestoneavailable, lastAnswer) => {
    if (milestoneNew) {
      return (
        <div className="chipview">
          {milestoneNew ? (
            <ChipView label={milestoneNew} answer={lastAnswer} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="chipview">
        {milestone ? (
          <ChipView label={String(milestone)} answer={lastAnswer} />
        ) : null}
      </div>
    );
  };

  isAnswered = (answer, isAnswerPredicted) => {
    if (isAnswerPredicted) return false;
    if (answer && answer.get && answer.get('answer')) {
      if (List.isList(answer.get('answer'))) {
        return Boolean(answer.get('answer').size);
      }
      return Boolean(
        answer
          .get('answer')
          .toString()
          .trim()
      );
    }
    return false;
  };

  render() {
    const {
      answers,
      questionText,
      answerConfiguration,
      milestone,
      milestoneNew,
      ismilestoneavailable,
      loading,
      sfField,
      oppdata,
      currentSFanswer,
      qvidianIntegration,
      questionHint,
      questionHintHTML,
      questionHTML,
      questionJSON,
      questionHintJSON,
      sectionName,
      roleNames,
      setEditQuestionData,
      isCustomQuestion,
      questionId: qId,
      selectedBid,
      proposalInfo,
      isNotepadOpen,
      questionId
    } = this.props;

    const questionID = answers.get('questionId');
    const qvicon = questionId;
    let lastAnswer;
    let answerDate = 'Not Answered';
    let isAnswerPredicted = false;
    let integrationmatch;
    let checkSfAnswer;
    let integrationvalidation;
    const sficon = sfField;
    const currentBidID = selectedBid.toJS().id;
    const oppordata = oppdata.toJS();
    const deploymentDate = '2022-05-08';
    const proposalTimeStamp = oppordata[currentBidID]?.proposal?.proposalDate;
    const proposalCreationDate = proposalTimeStamp.substring(
      0,
      proposalTimeStamp.indexOf('T')
    );
    const dateIsAfter = moment(proposalCreationDate).isAfter(
      moment(deploymentDate)
    );

    const dateIsBefore = moment(proposalCreationDate).isBefore(
      moment(deploymentDate)
    );

    if (_.isEmpty(currentSFanswer) !== true)
      checkSfAnswer = currentSFanswer.toJS().value;
    if (dateIsAfter) {
      integrationvalidation = true;
    }
    integrationvalidation = Qvidianquestions[0].hasOwnProperty(qvicon);
    dateIsAfter ? integrationmatch === qvidianIntegration : (Qvidianquestions[0].hasOwnProperty(qvicon) ? integrationmatch = Qvidianquestions[0][qvicon] : null)
    if (answers) {
      if (!questionID) lastAnswer = answers.last();
      else lastAnswer = answers.get('answers').last();
    }
    if (lastAnswer) {
      if (
        lastAnswer.get &&
        lastAnswer.get('date') &&
        lastAnswer.get('date').length
      ) {
        answerDate = parseMomentDate(lastAnswer.get('date'));
      }
      if (
        lastAnswer.get &&
        lastAnswer.get('userName') &&
        lastAnswer.get('userName').length &&
        lastAnswer.get('userName') === 'UnityPredictedAnswer'
      ) {
        isAnswerPredicted = true;
        answerDate = 'Not Answered';
      }
    }
    const isCurrentBid = selectedBid.get('isCurrent');
    const { selectedRow } = this.state;
    const { iconColor } = this.state;
    const gridColRatio = isNotepadOpen ? [8, 4] : [10, 2];
    return (
      <Grid
        container
        className={`task-table-row${
          selectedRow ? ' selected-task-table-row' : ''
        }`}
        style={{ margin: '2px 0px', padding: '4 8' }}
      >
        <Grid item xs={gridColRatio[0]}>
          {/* Question Text and Milestone */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '8px'
            }}
          >
            {/* questionText */}
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div
                style={{ zIndex: 0, alignSelf: 'center' }}
                className="questiontext-richtext"
              >
                <Typography variant="body2">
                  {questionJSON ? (
                    <RichTextEditor
                      style={{ minHeight: '0px' }}
                      variant="view"
                      defaultValue={JSON.parse(questionJSON)}
                    />
                  ) : (
                    <p>{questionText}</p>
                  )}
                </Typography>
              </div>
              {/* Edit Question Icon */}
              <div style={{ paddingLeft: '5px' }}>
                {isCustomQuestion && isCurrentBid && (
                  <span
                    aria-hidden="true"
                    onClick={() => {
                      setEditQuestionData({
                        questionText,
                        questionHTML,
                        questionJSON,
                        questionHintJSON,
                        section: sectionName,
                        answerType: answerConfiguration.get('type'),
                        roleNames,
                        questionAnswered: !!lastAnswer,
                        questionId: qId
                      });
                    }}
                  >
                    <Edit className="edit-icon" />
                  </span>
                )}
              </div>
              {/* Question Hint */}
              <div style={{ paddingLeft: '5px', paddingTop: '3px' }}>
                {questionHint ? (
                  <Tooltip
                    variant="light"
                    title={
                      questionHintJSON ? (
                        <RichTextEditor
                          variant="view"
                          defaultValue={JSON.parse(questionHintJSON)}
                        />
                      ) : (
                        <p>{questionHint}</p>
                      )
                    }
                    placement="top"
                  >
                    <IconButton
                      color="primary"
                      style={{ margin: 0 }}
                      size="small"
                      className="question-tooltip-icon"
                    >
                      <InfoIcon style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {/* Milestone */}
            <div>
              {this.renderTags(
                milestone,
                milestoneNew,
                ismilestoneavailable,
                lastAnswer
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={gridColRatio[1]}>
          <></>
        </Grid>
        <Grid container>
          {/* Answer */}
          <Grid item xs={gridColRatio[0]}>
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
          </Grid>

          {/* Answer History Button */}
          <Grid
            item
            xs={gridColRatio[1]}
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '5px'
              // justifyContent: 'center',
              // paddingLeft: '20px'
              // paddingTop: '8px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      outline: 'none',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer'
                    }}
                    className="integration-buttons"
                  >
                    {sficon !== 'n/a' && _.isEmpty(checkSfAnswer) !== true ? (
                                      <Tooltip
                                      variant="light"
                                      title={
                                        sficon !== 'n/a' ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: `<p><b>Source</b><br>${sficon}<br>Salesforce</p>`
                                            }}
                                          />
                                        ) : null
                                      }
                                      placement="top"
                                    ><div><Incoming style={{ fill: '#9E54B0' }} /></div>
                                    </Tooltip>
                    ) : sficon !== 'n/a' &&
                      _.isEmpty(checkSfAnswer) !== true ? (
                      <Incoming style={{ fill: '#b7b7b7' }} />
                    ) : null}
                  </div>
                
                  <div
                    style={{
                      textAlign: 'center',
                      outline: 'none',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer'
                    }}
                    className="integration-buttons"
                  >
                    {integrationvalidation === true && this.state.changeIcon === true ? (
                      <Tooltip
                      variant="light"
                      title={
                        integrationmatch ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `<p><b>Destination</b><br>${integrationmatch}<br>Qvidian</p>`
                            }}
                          />
                        ) : null
                      }
                      placement="top"
                    ><div><Outgoing style={{ fill: '#00c221' }} /></div></Tooltip>
                    ) : (integrationvalidation === true ? <Outgoing style={{ fill: '#b7b7b7' }} /> : null   
                    )}
                  </div>
                <div
                  style={{
                    textAlign: 'center',
                    outline: 'none',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#297dfd',
                    cursor: 'pointer'
                  }}
                  type="button"
                  onClick={this.displayAnswerOnHistory}
                  className="integration-buttons"
                >
                  {answerDate === 'Not Answered' && !isAnswerPredicted ? (
                    <Calendar style={{ color: '#b7b7b7' }} />
                  ) : isAnswerPredicted && !loading && !this.isAnswered(lastAnswer, isAnswerPredicted) && !loading ? (
                    <Tooltip
                      variant="light"
                      title="Unity Predicted Answer"
                      placement="top"
                    >
                      <IconButton
                        disabled={!isCurrentBid}
                        style={{ height: '0' }}
                      >
                        <CalendarCheck
                          fontSize="22px"
                          style={{ color: "#015ff1" }}
                          onClick={() =>
                            this.handleVerifyPredictedAnsClick(lastAnswer)
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  ) : ( this.isAnswered(lastAnswer, isAnswerPredicted) && !loading ? (<div>
                    <CalendarCheck
                      className="answered"
                      style={{ marginLeft: '6px', color: '#00c221' }}
                    />
                  </div>) :
                    <CalendarCheck style={{ color: this.state.iconColor }} />
                  )}
                </div>{' '}
              </div>
              <div>
                {loading ? (
                  <span
                    style={{
                      marginLeft: '6px',
                      marginTop: '6px',
                      position: 'relative',
                      top: '15px'
                    }}
                  >
                    <Loader
                      isInner
                      size={20}
                      style={{
                        width: '20px',
                        height: '20px'
                      }}
                    />
                  </span>
                ) : null}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  userData: getUserData(state),
  proposalDetail: getProposalDetails(state),
  selectedBid: getSelectedBid(state),
  oppdata: getOpportunityData(state),
  noneditableField: getnoneditableField(state)
});

export default connect(mapStateToProps, {
  setProposalAnswer: setProposalAnswerData,
  setAnswerLoading: setProposalAnswerLoading,
  deleteProposalUser: deleteProposalUserFromDB,
  setEditQuestionData
})(MatomoHOC(TaskRow));
