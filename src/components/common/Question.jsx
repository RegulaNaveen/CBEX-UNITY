/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// @flow
/* eslint-disable no-plusplus */
import React from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty, xor, has, isString } from 'lodash';
import IconButton from 'apollo-react/components/IconButton';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import Grid from 'apollo-react/components/Grid';
import InfoIcon from 'apollo-react-icons/Info';
import Tooltip from 'apollo-react/components/Tooltip';
import Typography from 'apollo-react/components/Typography';
import moment from 'moment';
import classNames from 'classnames';

import { Edit } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import { parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import Qvidianquestions from './qvidian';
import SystemIntegrations from './SystemIntegrations/SystemIntegrations';
import PriceModel from './PriceModel';
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
import { SocketContext } from '../../context/SocketContext';
import EventLauncher from '../screens/Opportunity/EventLauncher';
import { parseStringifyJson } from '../../utils/helpers';
import withIdleStateDetection from '../HOC/IdleStateDetector';

const DropdownWithIdleStateDetection = withIdleStateDetection(Dropdown);
const QuestionDatePickerWithIdleStateDetection = withIdleStateDetection(
  QuestionDatePicker
);
const MultiSelectWithIdleStateDetection = withIdleStateDetection(Multiselect);
const AutoCompleteWithAddOptionWithIdleStateDetection = withIdleStateDetection(
  AutoCompleteWithAddOption
);

// Regex Fix for HTML and plain text showing /span> at the end of question
type State = {
  selectedDay: string,
  selectedRow: Boolean,
  changeIcon: ''
};

type Props = {
  questionData: Map,
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
  isNotepadOpen: boolean,
  events: Object
};
export class TaskRow extends React.PureComponent<Props, State> {
  static contextType = SocketContext;

  constructor(props: Object) {
    super(props);

    this.quesTextContainerRef = React.createRef();
    this.quesTextInnerLeftRef = React.createRef();
    this.quesTextInnerRightRef = React.createRef();

    this.state = {
      selectedDay: '',
      selectedRow: false,
      iconColor: '#00c221',
      screenWidth: '',
      enableRichtext: false
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
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
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
    console.log('set proposal answer');
    setProposalAnswer(
      this.context,
      proposalId,
      questionId,
      textValue,
      userData
    ).then(() => {
      // const [deletedVal] = xor(
      //   textValue?.trim() ? textValue?.trim().split(',') : [],
      //   lastValue?.trim() ? lastValue?.trim().split(',') : []
      // );
      // const [deletedEmail] = String(deletedVal).match(
      //   /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
      // );
      // if (reason === 'remove-option' && deletedEmail) {
      //   setAnswerLoading(questionId, true);
      //   const { sectionName, sectionOrder } = section.toJS();
      //   deleteProposalUser(
      //     proposalId,
      //     deletedEmail,
      //     sectionOrder,
      //     sectionName
      //   ).then(() => {
      //     setAnswerLoading(questionId, false);
      //   });
      // }
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

    if (isEmpty(s1)) this.setState({ changeIcon: '#b7b7b7' });
    else this.setState({ changeIcon: '#00c221' });

    if (!isEmpty(textValue.replace(/\r?\n|\r| /g, ''))) {
      if (
        s1.length !== s2.length ||
        s1.join(' ').trim() !== s2.join(' ').trim()
      ) {
        setProposalAnswer(
          this.context,
          proposalId,
          questionId,
          String(textValue).trim(),
          userData,
          editorData
        );
      }
    } else if (!textValue.trim() && lastAnswer.trim()) {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,

        userData,
        editorData
      );
    }
    this.context.questionUnlockWrapper(questionId);

    this.trackMatomoEventSubmitAnswer(textValue);
    this.setSelectRow(false);
  };

  /**
   * Func to save data onBlur RichText Editor
   */
  handleRichTextChange = editorData => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    const { value, html, text } = editorData;

    if (isEmpty(text)) this.setState({ changeIcon: '#b7b7b7' });
    else this.setState({ changeIcon: '#00c221' });

    const editorText = text.trim() || ' ';

    setProposalAnswer(
      this.context,
      proposalId,
      questionId,
      String(editorText),
      userData,
      {
        value,
        html
      }
    );
    this.trackMatomoEventSubmitAnswer(editorData.text);
    this.setSelectRow(false);
  };

  handleVerifyPredictedAnsClick = predictedAnswer => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      lastAnswer,
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
        this.context,
        proposalId,
        questionId,
        predictedAnswer.get('answer'),
        userData
      );
    } else {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        String(predictedAnswer.get('answer')).trim(),
        userData
      );
    }
  };

  onClickChange = (selectedValue: string, lastAnswer: string) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (lastAnswer !== selectedValue) {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        selectedValue,
        userData
      );
    }
    this.trackMatomoEventSubmitAnswer(selectedValue);
    // this.setSelectRow(false);
  };

  handleDayChange = (selectedDay: string, lastAnswer: Date) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    this.setState({ selectedDay }, () => {
      if (
        parseMomentDate(lastAnswer.trim()) !==
          parseMomentDate(selectedDay.trim()) &&
        selectedDay
      )
        setProposalAnswer(
          this.context,
          proposalId,
          questionId,
          selectedDay,
          userData
        );
    });
    this.trackMatomoEventSubmitAnswer(selectedDay);
  };

  onSelectValues = (
    selectedValues: Array<string>,
    lastAnswer: Array<string>
  ) => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    if (!isEqual(lastAnswer, selectedValues))
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        selectedValues,
        userData
      );

    this.trackMatomoEventSubmitAnswer(selectedValues);
  };

  displayAnswerOnHistory = () => {
    const { setQuestionToDisplayHistory, questionId } = this.props;
    setQuestionToDisplayHistory(questionId);
    this.trackMatomoEventAnswerHistory();
  };

  onChildInputFocus = () => {
    this.context.questionLockWrapper(this.props.questionId);
    this.setSelectRow(true);
  };

  setSelectRow = value => {
    // call question unlock
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
      questionId,
      events
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: events
        ? `Event: ${questionText} (${sectionName})`
        : `Question: ${questionText} (${sectionName})`,
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
        },
        {
          events: events || []
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

  trackMatomoEventLauncher = data => {
    const { eventCategories, trackEvent } = this.props;
    const { action, customDimensions } = data;
    trackEvent({
      category: eventCategories.pd(this.props),
      action,
      customDimensions
    });
  };

  resetDate = () => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;
    this.setState({ selectedDay: ' ' }, () => {
      setProposalAnswer(
        this.context,
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
      hasDifferentSFanswer,
      loading
    } = this.props;

    const { selectedRow } = this.state;
    const isCurrentBid = selectedBid.get('isCurrent');

    const optionsYN = ['Yes', 'No'];
    const answer = lastAnswer && lastAnswer?.get('answer');

    let answerValue = '';
    let answerValueComplex;
    let finalOptions = options;
    const checkDisableFlag = () => {
      if (this.isQuestionLockedByOther()) return true;

      return (
        checkNonEditableFields(noneditableField, sfField, sfObject) ||
        !isCurrentBid
      );
    };

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
            onFocus={() => {
              // call question lock
              this.context.questionLockWrapper(this.props.questionId);
              this.setSelectRow(true);
            }}
            onBlur={() => {
              this.context.questionUnlockWrapper(this.props.questionId);

              this.setSelectRow(false);
            }}
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

    // Function to converted Answer String
    const getConvertedAnsString = str =>
      !String(str).trim() ? '' : String(str).trim();

    const lastAnswerJS = lastAnswer?.toJS();
    const formattedAnswer =
      has(lastAnswerJS, 'formattedAnswer') && lastAnswerJS.formattedAnswer;

    const parseFormattedData =
      !formattedAnswer || isObject(formattedAnswer)
        ? formattedAnswer
        : parseStringifyJson(formattedAnswer);

    const richTextData = parseFormattedData || {
      html: '',
      value: { blocks: [] }
    };

    // Richtext Props
    const richTextAnswerField = {
      // questionId: this.props.questionId,
      richTextString: getConvertedAnsString(answerValue),
      richTextVal: richTextData.value,
      richTextHtml: richTextData.html,
      enableFocus: true,
      isEditable: false,
      placeholder: checkDisableFlag() ? '' : DEFAULT.CLICK_TO_ANS,
      disabled: checkDisableFlag(),
      onFocus: () => {
        // Change title style for richEdit icon
        const { clientWidth: quesTitleW } = this.quesTextContainerRef.current;
        const {
          clientWidth: quesTitleLW,
          style: quesTitleLStyle,
          firstChild
        } = this.quesTextInnerLeftRef.current;
        const { clientWidth: quesTitleRW } = this.quesTextInnerRightRef.current;

        // Diff between Question Title container and inner blocks width
        const quesTitleWidthDiff = quesTitleW - (quesTitleLW + quesTitleRW);
        this.setState({ enableRichtext: quesTitleWidthDiff > 28 });
        if (quesTitleWidthDiff > 28) {
          quesTitleLStyle.minHeight = 'auto';
          firstChild.style.maxWidth = 'none';
        } else {
          quesTitleLStyle.minHeight = '44px';
          firstChild.style.maxWidth = 'calc(100% - 28px)';
        }

        if (!selectedRow) this.setSelectRow(true);
        this.context.questionLockWrapper(this.props.questionId);
      },
      onBlur: data => {
        let saveDate = false;
        const previousAnsText = getConvertedAnsString(answerValue).trim();

        // save the formatting change
        if (
          !isEqual(richTextData.value, data.value) &&
          !isEmpty(data.text.trim())
        )
          if (
            isEmpty(richTextData.value?.blocks) &&
            lastAnswerJS?.answer === data.value?.blocks[0]?.text
          )
            saveDate = false;
          else saveDate = true;
        // save the data if we see any text difference.
        else if (
          previousAnsText !== data.text.trim() &&
          data.text.trim() !== ''
        )
          saveDate = true;
        // save the data if user removes the whole answer.
        else if (previousAnsText !== '' && data.text.trim() === '')
          saveDate = true;

        if (saveDate) {
          this.handleRichTextChange(data);
        }
        this.context.questionUnlockWrapper(this.props.questionId);

        this.setState({ enableRichtext: false });

        // Change title style for richEdit icon
        const {
          style: quesTitleLStyle,
          firstChild
        } = this.quesTextInnerLeftRef.current;
        quesTitleLStyle.minHeight = 'auto';
        firstChild.style.maxWidth = 'none';

        this.setSelectRow(false);
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
            <DropdownWithIdleStateDetection
              id="dd-proposal-answer"
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              items={optionsYN}
              onClick={val => this.onClickChange(val, answerValue)}
              value={answerValue}
              setSelectRow={this.setSelectRow}
              disabled={checkDisableFlag()}
              questionId={this.props.questionId}
              lockedBySelf={!!this.isQuestionLockedBySelf()}
              lockQuestionOnFocus
            />
          </SFAnswerValidationWrapper>
        );
      case 'select':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <DropdownWithIdleStateDetection
              id="dd-proposal-answer"
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              items={finalOptions}
              onClick={val => this.onClickChange(val, answerValue)}
              value={answerValue}
              setSelectRow={this.setSelectRow}
              disabled={checkDisableFlag()}
              questionId={this.props.questionId}
              lockedBySelf={!!this.isQuestionLockedBySelf()}
              lockQuestionOnFocus
            />
          </SFAnswerValidationWrapper>
        );
      case 'date':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <QuestionDatePickerWithIdleStateDetection
              value={answerValue}
              resetDate={this.resetDate}
              handleDayChange={this.handleDayChange}
              onFocus={() => {
                this.context.questionLockWrapper(this.props.questionId);
                this.setSelectRow(true);
              }}
              onBlur={() => {
                this.context.questionUnlockWrapper(this.props.questionId);
                this.setSelectRow(false);
              }}
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
            <MultiSelectWithIdleStateDetection
              placeholder={checkDisableFlag() ? '' : 'Click to answer'}
              items={finalOptions}
              onClick={this.onSelectValues}
              value={answerValueComplex}
              setSelectRow={this.setSelectRow}
              disabled={checkDisableFlag()}
              questionId={this.props.questionId}
              lastAnswer={lastAnswer}
              lockedBySelf={!!this.isQuestionLockedBySelf()}
              lockQuestionOnFocus
            />
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.PICKLIST_LOOKUP:
      case 'multi-select-lookup':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <AutoCompleteWithAddOptionWithIdleStateDetection
              // sectionName={sectionName}
              sfObject={sfObject}
              lov={finalOptions}
              sfField={sfField}
              multiple
              answer={answerValueComplex}
              onFocus={() => {
                this.context.questionLockWrapper(this.props.questionId);
                this.setSelectRow(true);
              }}
              onBlur={() => {
                this.context.questionUnlockWrapper(this.props.questionId);
                this.setSelectRow(false);
              }}
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
            <AutoCompleteWithAddOptionWithIdleStateDetection
              sfObject={sfObject}
              lov={finalOptions}
              sfField={sfField}
              onFocus={() => {
                this.context.questionLockWrapper(this.props.questionId);
                this.setSelectRow(true);
              }}
              onBlur={() => {
                console.log('blur lookup');
                this.context.questionUnlockWrapper(this.props.questionId);
                this.setSelectRow(false);
              }}
              onChange={this.handlePropsalChange}
              answer={answerValue || ''}
              multiple={false}
              loading={loading}
              disabled={checkDisableFlag()}
            />
          </SFAnswerValidationWrapper>
        );
      default:
        return <div id="no-configuration">Click to answer</div>;
    }
  };

  renderTags = (milestone, milestoneNew, ismilestoneavailable, lastAnswer) => {
    const lastAns = isString(lastAnswer) ? lastAnswer : '';
    if (milestoneNew && !isEmpty(milestoneNew)) {
      return (
        <div className="chipview">
          {milestoneNew ? (
            <ChipView label={milestoneNew} answer={lastAns} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="chipview">
        {milestone ? <ChipView label={milestone} answer={lastAns} /> : null}
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

  resize() {
    this.setState({ screenWidth: window.innerWidth });
  }

  isQuestionLocked = () => {
    return (
      this.props.questionLockInfo && this.props.questionLockInfo.get('userInfo')
    );
  };

  isQuestionLockedBySelf = () => {
    return (
      this.isQuestionLocked() &&
      this.props.userData.email === this.props.questionLockInfo.get('userInfo')
    );
  };

  isQuestionLockedByOther = () => {
    return (
      this.isQuestionLocked() &&
      this.props.userData.email !== this.props.questionLockInfo.get('userInfo')
    );
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
      events,
      questionData,
      proposalDetail,
      eventCategories
    } = this.props;
    const questionID = answers.get('questionId');
    const qvicon = questionId;
    let lastAnswer;
    let answerDate = 'Not Answered';
    let isAnswerPredicted = false;
    let integrationmatch;
    let checkSfAnswer;
    let integrationvalidation;
    let priceModelerIntegration;
    const sficon = sfField;
    let qvidIntegration = false;
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
    if (qvidianIntegration) {
      qvidIntegration = true;
    }
    priceModelerIntegration = has(PriceModel[0], qvicon);
    dateIsAfter
      ? (integrationmatch = qvidIntegration)
      : (integrationmatch = has(Qvidianquestions[0], qvicon)
          ? (integrationmatch = Qvidianquestions[0][qvicon])
          : null);
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
    const {
      selectedRow,
      iconColor,
      changeIcon,
      screenWidth,
      enableRichtext
    } = this.state;
    const smallScreenWidth = screenWidth < 641 ? [8, 4] : [10, 2];
    const mediumScreen =
      screenWidth < 950 ? [10, 2] : screenWidth < 900 ? [10, 2] : [11, 1];
    const gridColRatio = isNotepadOpen ? smallScreenWidth : mediumScreen;
    return (
      <div
        className={`task-table-row question-row ${
          selectedRow ? 'selected-task-table-row' : ''
        }`}
        style={{ margin: '2px 0px' }}
      >
        <Grid container className="question-title-grid">
          <Grid item xs={gridColRatio[0]} className="question-grid-item">
            {/* Question Text and Milestone */}
            <div
              className={classNames('question-label-container', {
                'has-richtext-icon': enableRichtext
              })}
              ref={this.quesTextContainerRef}
            >
              <div
                className="question-label-inner"
                ref={this.quesTextInnerLeftRef}
                style={{ minHeight: 'auto' }}
              >
                {/* Question Text */}
                <div className="questiontext-richtext">
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

                {/* Event Launcher Component */}
                <EventLauncher
                  questionData={questionData}
                  proposalDetail={proposalDetail}
                  eventCategories={eventCategories}
                  trackMatomoEventLauncher={this.trackMatomoEventLauncher}
                />

                {/* Edit Question Icon */}
                {isCustomQuestion && isCurrentBid && (
                  <div className="question-edit">
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
                  </div>
                )}

                {/* Question Hint */}
                {questionHint && (
                  <div className="question-hint">
                    <Tooltip
                      variant="light"
                      tabIndex={-1}
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
                  </div>
                )}
              </div>

              {/* Milestone Chip */}
              <div className="milestone-chip" ref={this.quesTextInnerRightRef}>
                {this.renderTags(
                  milestone,
                  milestoneNew,
                  ismilestoneavailable,
                  lastAnswer
                )}
              </div>
            </div>
            {this.isQuestionLockedByOther() ? (
              <Typography variant="subtitle1" className="status-txt">
                {this.props.questionLockInfo.get('userName')} is typing...
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={gridColRatio[1]} className="empty-grid-item">
            <></>
          </Grid>
        </Grid>
        <Grid container className="answer-grid">
          {/* Answer */}
          <Grid item xs={gridColRatio[0]} className="answer-grid-item">
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
            priceModelerIntegration={priceModelerIntegration}
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
          {/* Question Lock Info */}
          {/* {this.props.questionLockInfo &&
          this.props.questionLockInfo.get('userName') &&
          this.props.userData.email !==
            this.props.questionLockInfo.get('userInfo') ? (
            <div>
              {this.props.questionLockInfo.get('userName')} is typing...
            </div>
          ) : (
            ''
          )}
           */}
        </Grid>
      </div>
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
