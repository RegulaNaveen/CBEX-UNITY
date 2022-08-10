// @flow
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty, xor, isString, has } from 'lodash';
import IconButton from 'apollo-react/components/IconButton';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import Grid from 'apollo-react/components/Grid';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';
import moment from 'moment';
import { Edit } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import { parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import Qvidianquestions from './qvidian';
import SystemIntegrations from './SystemIntegrations/SystemIntegrations';
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
import QuestionDatePicker from './atoms/inputs/QuestionDatePicker';
import SFAnswerValidationWrapper from './SFAnswerValidationWrapper';
import ANSWER_TYPES from '../../constants/answerTypes';
import CustomApolloRichText from './CustomApolloRichText';
import { DEFAULT } from '../../constants/app';
import AutoCompleteWithAddOption from '../views/modals/AutoCompleteWithAddOption';

// Regex Fix for HTML and plain text showing /span> at the end of question
type State = {
  selectedDay: string,
  selectedRow: Boolean,
  changeIcon: ''
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
        textValue?.trim() ? textValue?.trim().split(',') : [],
        lastValue?.trim() ? lastValue?.trim().split(',') : []
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

  handleTextChange = (textValue, lastAnswer, editorData) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    const s1 = textValue
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);
    const s2 = lastAnswer
      .trim()
      .split(' ')
      .filter(v => v.trim().length > 0);

    isEmpty(s1)
      ? this.setState({ changeIcon: '#b7b7b7' })
      : this.setState({ changeIcon: '#00c221' });

    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (
        s1.length !== s2.length ||
        s1.join(' ').trim() !== s2.join(' ').trim()
      )
        setProposalAnswer(
          proposalId,
          questionId,
          String(textValue).trim(),
          userData,
          editorData
        );
    } else if (!textValue.trim() && lastAnswer.trim()) {
      setProposalAnswer(proposalId, questionId, ' ', userData, editorData);
    }

    this.trackMatomoEventSubmitAnswer(textValue);
    this.setSelectRow(false);
  };

  /**
   * Func to save data onBlur RichText Editor
   */
  handleRichTextChange = (editorData, lastEditorData) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    console.log({ newData: editorData.value, oldData: lastEditorData.value });

    if (!isEqual(editorData.value, lastEditorData.value)) {
      const { value, html, text } = editorData;

      isEmpty(text)
        ? this.setState({ changeIcon: '#b7b7b7' })
        : this.setState({ changeIcon: '#00c221' });

      const editorText = text.trim() || ' ';
      setProposalAnswer(proposalId, questionId, String(editorText), userData, {
        value,
        html
      });
    }
    this.trackMatomoEventSubmitAnswer(editorData.text);
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
      noneditableField,
      hasDifferentSFanswer
    } = this.props;
    const isCurrentBid = selectedBid.get('isCurrent');

    const optionsYN = ['Yes', 'No'];
    const answer = lastAnswer && lastAnswer?.get('answer');

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

    /**
     * Get Converted Answer String
     */
    const getConvertedAnsString = str =>
      !String(str).trim() ? '' : String(str).trim();

    const hasFormattedAns = has(lastAnswer?.toJS(), 'formattedAnswer');
    const formattedAnswer =
      hasFormattedAns && lastAnswer?.toJS().formattedAnswer;
    const richTextJSON = formattedAnswer
      ? formattedAnswer.value
      : { blocks: [] };
    // const oldFormattedData = formattedAnswer || {
    //   html: '',
    //   value: { blocks: [] },
    //   text: ''
    // };

    // Richtext Props
    const richTextAnswerField = {
      richTextString: getConvertedAnsString(answerValue),
      richTextVal: richTextJSON,
      enableFocus: true,
      isEditable: false,
      placeholder: checkDisableFlag() ? '' : DEFAULT.CLICK_TO_ANS,
      disabled: checkDisableFlag(),
      // onBlur: data => {
      //   if (
      //     !isEqual(JSON.stringify(richTextJSON), JSON.stringify(data.value))
      //   ) {
      //     console.log({ lastAns: lastAnswer?.toJS() });
      //     this.handleRichTextChange(data, oldFormattedData); // Call func to save data
      //   }
      // }
      onBlur: data => {
        if (!isEqual(getConvertedAnsString(answerValue), data.text.trim())) {
          const { value, html } = data;
          this.handleTextChange(data.text, getConvertedAnsString(answerValue), {
            value,
            html
          });
        }
      }
    };

    switch (type) {
      case 'text': {
        answerValue = getConvertedAnsString(answerValue);
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <CustomApolloRichText {...richTextAnswerField} />
          </SFAnswerValidationWrapper>
        );
      }
      case 'number':
        answerValue = getConvertedAnsString(answerValue);
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
            <AutoCompleteWithAddOption
              // sectionName={sectionName}
              sfObject={sfObject}
              lov={finalOptions}
              sfField={sfField}
              multiple
              answer={answerValueComplex}
              onFocus={() => this.setSelectRow(true)}
              onBlur={() => this.setSelectRow(false)}
              disabled={checkDisableFlag()}
              onChange={this.handlePropsalChange}
            />
          </SFAnswerValidationWrapper>
        );
      case 'select-lookup':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <AutoCompleteWithAddOption
              sfObject={sfObject}
              lov={finalOptions}
              sfField={sfField}
              onFocus={() => this.setSelectRow(true)}
              onBlur={() => this.setSelectRow(false)}
              onChange={this.handlePropsalChange}
              answer={answerValue || ''}
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
          {milestoneNew && isString(milestoneNew) ? (
            <ChipView label={milestoneNew} answer={lastAnswer} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="chipview">
        {milestone && isString(milestone) ? (
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
      answerValue,
      sfObject,
      oppdata,
      currentSFanswer,
      qvidianIntegration,
      hasDifferentSFanswer,
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
      questionId,
      screenWidth
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
    const deploymentDate = '2022-08-05';
    const proposalTimeStamp = oppordata[currentBidID]?.proposal?.proposalDate;
    const proposalCreationDate = proposalTimeStamp.substring(
      0,
      proposalTimeStamp.indexOf('T')
    );
    const dateIsAfter = moment(proposalCreationDate).isAfter(
      moment(deploymentDate)
    );
    const answerText = answers?.toJS()[0]?.answer;

    const dateIsBefore = moment(proposalCreationDate).isBefore(
      moment(deploymentDate)
    );
    if (
      typeof currentSFanswer !== 'undefined' &&
      _.isEmpty(currentSFanswer) !== true
    ) {
      checkSfAnswer = currentSFanswer.toJS().value;
    }
    if (dateIsAfter) {
      integrationvalidation = true;
    }
    integrationvalidation = has(Qvidianquestions[0], qvicon);
    dateIsAfter
      ? integrationmatch === qvidianIntegration
      : has(Qvidianquestions[0], qvicon)
      ? (integrationmatch = Qvidianquestions[0][qvicon])
      : null;
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
    const { selectedRow, iconColor, changeIcon } = this.state;
    const gridColRatio = isNotepadOpen ? (screenWidth < 641 ? [8, 4] : [10, 2]) : [10, 2];
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
                <div className="question-title-txt">
                  {questionJSON ? (
                    <RichTextEditor
                      style={{ minHeight: '0px' }}
                      variant="view"
                      defaultValue={JSON.parse(questionJSON)}
                    />
                  ) : (
                    <p>{questionText}</p>
                  )}
                </div>
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
                        <div>{questionHint}</div>
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

          {/* System Integrations */}
          <SystemIntegrations
            checkSfAnswer={checkSfAnswer}
            sficon={sficon}
            gridColRatio={gridColRatio}
            integrationmatch={integrationmatch}
            integrationvalidation={integrationvalidation}
            answeronhistory={this.displayAnswerOnHistory}
            answerdate={answerDate}
            isAnswerPredicted={isAnswerPredicted}
            isAnswered={this.isAnswered}
            lastAnswer={lastAnswer}
            iconColor={iconColor}
            loading={loading}
            isNotepadOpen={isNotepadOpen}
            changeIcon={changeIcon}
            isCurrentBid={isCurrentBid}
            sfObject={sfObject}
            answer={answerValue}
            answerText={answerText}
            handleVerifyPredictedAnsClick={this.handleVerifyPredictedAnsClick}
            hasDifferentSFanswer={hasDifferentSFanswer}
          />
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
