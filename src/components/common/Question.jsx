/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// @flow
/* eslint-disable no-plusplus */
import React, { createRef } from 'react';
import { Map, List } from 'immutable';
import { connect } from 'react-redux';
import { isObject, isEqual, isEmpty, xor, has, isString } from 'lodash';
import IconButton from 'apollo-react/components/IconButton';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import Grid from 'apollo-react/components/Grid';
import InfoIcon from 'apollo-react-icons/Info';
import Popover from 'apollo-react/components/Popover';
import Typography from 'apollo-react/components/Typography';
import moment from 'moment';
import Tooltip from 'apollo-react/components/Tooltip';
import Checkbox from 'apollo-react/components/Checkbox';
import Highlighter from 'react-highlight-words';
import {
  EditorState,
  CompositeDecorator
} from 'apollo-react/node_modules/draft-js';
import { Edit } from '../svg';
import Dropdown from './atoms/inputs/Dropdown';
import TextArea from './atoms/inputs/TextArea';
import { formatTheDate, parseMomentDate } from '../../utils/DateUtils';
import Multiselect from './atoms/inputs/Multiselect';
import CheckBoxQuestions from './atoms/inputs/CheckBoxQuestions';
import Qvidianquestions from './qvidian';
import SystemIntegrations from './SystemIntegrations/SystemIntegrations';
import PriceModel from './PriceModel';
import {
  setProposalAnswerData,
  setEditQuestionData,
  setProposalAnswerLoading,
  deleteProposalUserFromDB,
  setNotApplicableQuestion,
  setNotApplicableLoader,
  widgetUpdate
} from '../../redux/actions/proposal-actions';
import {
  getUserData,
  getProposalDetails,
  getSelectedBid,
  getnoneditableField,
  getShowNaCheckbox,
  getIntegrations
} from '../../redux/selectors';
import {
  getCanUserTagInQuestion,
  getfetchAllFlags,
  getOpportunityData
} from '../../redux/selectors/proposal';
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
import CustomApolloRichText, {
  compositeDecorator
} from './CustomApolloRichText';
import { DEFAULT } from '../../constants/app';
import AutoCompleteWithAddOption from '../views/modals/AutoCompleteWithAddOption';
import { SocketContext } from '../../context/SocketContext';
import EventLauncher from '../screens/Opportunity/EventLauncher';
import { parseStringifyJson } from '../../utils/helpers';
import withIdleStateDetection from '../HOC/IdleStateDetector';
import RadioQuestion from './atoms/inputs/RadioQuestion';
import { getProposalAnswer } from '../../api/proposal';
import {
  selectAutoNavigatedToCurrentResult,
  selectCurrentSearchResult,
  selectPrevSearchResult,
  selectQuery
} from '../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../redux/actions/search-actions';

const DropdownWithIdleStateDetection = withIdleStateDetection(Dropdown);
const QuestionDatePickerWithIdleStateDetection = withIdleStateDetection(
  QuestionDatePicker
);
const MultiSelectWithIdleStateDetection = withIdleStateDetection(Multiselect);
const AutoCompleteWithAddOptionWithIdleStateDetection = withIdleStateDetection(
  AutoCompleteWithAddOption
);
const RadioQuestionIdleStateDetection = withIdleStateDetection(RadioQuestion);
const CheckBoxQuestionsIdleStateDetection = withIdleStateDetection(
  CheckBoxQuestions
);

// Regex Fix for HTML and plain text showing /span> at the end of question
type State = {
  selectedDay: string,
  selectedRow: Boolean,
  changeIcon: '',
  check: 'false',
  anchorEl: null
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
  setNotApplicable: Function,
  setNotApplicableLoading: Function,
  setAnswerLoading: Function,
  deleteProposalUser: Function,
  setQuestionToDisplayHistory: (answer: string) => void,
  eventCategories: any,
  trackEvent: any,
  proposalDetail: any,
  integrationsData: any,
  sfObject: string,
  sfField: string,
  milestone: any,
  milestoneNew: any[],
  ismilestoneavailable: string,
  loading: Boolean,
  NaLoading: Boolean,
  setEditQuestionData: (data: Object) => void,
  roleNames: Array<string>,
  isCustomQuestion: boolean,
  hasDifferentSFanswer: boolean,
  isNotepadOpen: boolean,
  events: Object,
  isNotApplicable: Boolean,
  canUserTagInQuestion: Boolean,
  allFlags: Boolean
};
export class TaskRow extends React.PureComponent<Props, State> {
  static contextType = SocketContext;

  constructor(props: Object) {
    super(props);
    const { integrationsData } = this.props;
    this.quesTextContainerRef = React.createRef();
    this.quesTextInnerLeftRef = React.createRef();
    this.quesTextInnerRightRef = React.createRef();
    this.questionTextRef1 = React.createRef();
    this.questionTextRef2 = React.createRef();
    this.questionTextTitleRef = React.createRef(null);

    this.state = {
      selectedDay: '',
      selectedRow: false,
      iconColor: '#00c221',
      screenWidth: '',
      enableRichtext: false,
      focusedSpan: false,
      blurredSpan: false,
      anchorEl: null
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

  componentDidUpdate(prevProps) {
    const {
      query,
      currentSearchResult,
      prevSearchResult,
      questionId,
      autoNavigatedToCurrentResult,
      autoNavigationDone,
      sectionName
    } = this.props;
    if (
      currentSearchResult !== null &&
      this.questionTextTitleRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      if (
        currentSearchResult.searchIndex === questionId &&
        ((currentSearchResult.sectionName !== null &&
          currentSearchResult.sectionName === sectionName) ||
          currentSearchResult.sectionName === null)
      ) {
        // allow others to collapse before scrollIntoView
        setTimeout(() => {
          if (this.questionTextTitleRef.current) {
            this.questionTextTitleRef.current.scrollIntoView({
              behaviour: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
            this.setSelectRow(true);
          }
          autoNavigationDone();
        }, 700);
      }
    } else if (
      prevSearchResult !== null &&
      prevSearchResult.searchIndex === questionId &&
      autoNavigatedToCurrentResult
    ) {
      if (sectionName === 'Proposal Team' && prevSearchResult.vTab === 2) {
        this.setSelectRow(false);
      } else if (
        (currentSearchResult !== null &&
          currentSearchResult.searchIndex !== prevSearchResult.searchIndex) ||
        currentSearchResult === null
      ) {
        this.setSelectRow(false);
      }
    }
    // Removing logic to fix highlight issue. need to rework in logic part
    // else if (
    //   currentSearchResult === null ||
    //   (currentSearchResult !== null &&
    //     currentSearchResult.searchIndex !== questionId) ||
    //   (currentSearchResult.sectionName !== null &&
    //     currentSearchResult.sectionName !== sectionName)
    // ) {
    //   this.setSelectRow(false);
    // }

    // updating question text with decorators
    if (this.questionTextRef1.current !== null) {
      const { editorState } = this.questionTextRef1.current.state;
      const newEditorState = EditorState.set(editorState, {
        decorator: compositeDecorator
      });
      this.questionTextRef1.current.setState({ editorState: newEditorState });
    }
  }

  handlePropsalChange = (textValue, multiSelectRef = '', lastValue, reason) => {
    try {
      const {
        setProposalAnswer,
        proposalId,
        questionId,
        userData,
        section,
        setAnswerLoading,
        deleteProposalUser
      } = this.props;
      if (multiSelectRef && multiSelectRef?.current) {
        multiSelectRef?.current?.blur();
      }
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        textValue,
        userData
      ).then(() => {
        const [deletedVal] = xor(
          textValue?.trim() ? textValue?.trim().split(',') : [],
          lastValue?.trim() ? lastValue?.trim().split(',') : []
        );
        const [deletedEmail] = String(deletedVal).match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
        );
        if (reason === 'remove-option' && deletedEmail) {
          setAnswerLoading(questionId, false);
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
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  handleCheckboxPropsalChange = (textValue, lastValue, reason) => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      section,
      setAnswerLoading,
      deleteProposalUser
    } = this.props;
    setProposalAnswer(
      this.context,
      proposalId,
      questionId,
      textValue,
      userData
    );
  };

  handleTextChange = (textValue, lastAnswer, editorData) => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      sfField,
      oppNo
    } = this.props;
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
        if (sfField && this.context) {
          this.context.updateDashboardSFValueWrapper(
            oppNo,
            sfField,
            String(textValue).trim()
          );
        }
      }
    } else if (!textValue.trim() && lastAnswer.trim()) {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        ' ',
        userData,
        editorData
      );
      if (sfField && this.context) {
        this.context.updateDashboardSFValueWrapper(oppNo, sfField, ' ');
      }
    }
    this.context.questionUnlockWrapper(questionId);

    this.trackMatomoEventSubmitAnswer(textValue);
    this.setSelectRow(false);
  };

  /**
   * Func to save data onBlur RichText Editor
   */
  handleRichTextChange = async editorData => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      sfField,
      widgetUpdates,
      oppNo
    } = this.props;
    const { value, html, text, htmlExport } = editorData;

    if (isEmpty(text)) this.setState({ changeIcon: '#b7b7b7' });
    else this.setState({ changeIcon: '#00c221' });

    const editorText = text.trim() || ' ';

    await setProposalAnswer(
      this.context,
      proposalId,
      questionId,
      String(editorText),
      userData,
      {
        value,
        html,
        htmlExport
      }
    );
    if (sfField && this.context) {
      this.context.updateDashboardSFValueWrapper(
        oppNo,
        sfField,
        String(editorText)
      );
    }
    if (sfField === 'Total_Bid_Value_Labor_Direct_Discount__c') {
      if (editorText && editorText?.length > 0)
        widgetUpdates(proposalId, 'Bid_Cost');
    }
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

  onClickChange = async (selectedValue: string, lastAnswer: string) => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      sfField,
      widgetUpdates,
      oppNo
    } = this.props;
    if (lastAnswer !== selectedValue) {
      const dataResponse = await setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        selectedValue,
        userData
      );
      if (sfField && this.context) {
        this.context.updateDashboardSFValueWrapper(
          oppNo,
          sfField,
          selectedValue
        );
      }
      if (sfField === 'StageName' && selectedValue) {
        const stage = parseInt(selectedValue.match(/\d+/)[0]) >= 4;
        if (stage) widgetUpdates(proposalId, 'Bid_Cost');
      }
      this.trackMatomoEventSubmitAnswer(selectedValue);
      return dataResponse;
      // eslint-disable-next-line no-else-return
    } else {
      this.context.questionUnlockWrapper(questionId);
      this.trackMatomoEventSubmitAnswer(selectedValue);
      return null;
    }
  };

  handleDayChange = (selectedDay: string, lastAnswer: Date) => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      sfField,
      oppNo
    } = this.props;

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
          formatTheDate(selectedDay),
          userData
        );
      if (sfField && this.context) {
        this.context.updateDashboardSFValueWrapper(
          oppNo,
          sfField,
          formatTheDate(selectedDay)
        );
      }
    });
    this.trackMatomoEventSubmitAnswer(selectedDay);
  };

  handleUncheckNaQuestion = async type => {
    const { setProposalAnswer, proposalId, questionId, userData } = this.props;

    const answersData = await getProposalAnswer(proposalId, questionId);

    if (answersData[answersData.length - 1]?.answer === 'N/A') {
      answersData.pop();
    }

    const lastAnswer = answersData[answersData.length - 1];
    if (type === 'text') {
      const formattedAnswer =
        has(lastAnswer, 'formattedAnswer') && lastAnswer.formattedAnswer;

      const parseFormattedData =
        !formattedAnswer || isObject(formattedAnswer)
          ? formattedAnswer
          : parseStringifyJson(formattedAnswer);

      const richTextData = parseFormattedData || {
        html: '',
        value: { blocks: [] },
        htmlExport: ''
      };

      const editorData = {
        text: lastAnswer?.answer || '',
        value: richTextData.value,
        html: richTextData.html,
        htmlExport: richTextData.htmlExport
      };

      this.handleRichTextChange(editorData);
    } else if (type === 'number') {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        lastAnswer?.answer ? String(lastAnswer?.answer).trim() : ' ',
        userData
      );
    } else {
      setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        lastAnswer?.answer || ' ',
        userData
      );
    }
  };

  onSelectValues = async (
    selectedValues: Array<string>,
    lastAnswer: Array<string>
  ) => {
    const {
      setProposalAnswer,
      proposalId,
      questionId,
      userData,
      sfField,
      oppNo
    } = this.props;
    if (!isEqual(lastAnswer, selectedValues) && selectedValues !== undefined) {
      await setProposalAnswer(
        this.context,
        proposalId,
        questionId,
        selectedValues,
        userData
      );
      if (sfField && this.context) {
        this.context.updateDashboardSFValueWrapper(
          oppNo,
          sfField,
          selectedValues
        );
      }
    }
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

  renderNACheckbox = (checkDisableFlag, type) => {
    if (this.props.showNaCheckbox) {
      const {
        setProposalAnswer,
        proposalId,
        questionId,
        userData,
        setNotApplicable,
        NaLoading,
        isNotApplicable,
        loading,
        setNotApplicableLoading
      } = this.props;

      return (
        <div style={{ width: '10px', marginRight: '30px' }}>
          N/A
          <Checkbox
            style={{
              cursor: `${checkDisableFlag() ? 'not-allowed' : 'pointer'}`
            }}
            checked={isNotApplicable}
            disabled={checkDisableFlag() || NaLoading}
            onClick={async () => {
              if (checkDisableFlag()) return;
              setNotApplicableLoading(questionId);
              if (!isNotApplicable) {
                await setProposalAnswer(
                  this.context,
                  proposalId,
                  questionId,
                  'N/A',
                  userData
                );
                setNotApplicable(
                  proposalId,
                  questionId,
                  !isNotApplicable,
                  this.context
                );
              } else {
                await this.handleUncheckNaQuestion(type);
                setNotApplicable(
                  proposalId,
                  questionId,
                  !isNotApplicable,
                  this.context
                );
              }
            }}
          />
        </div>
      );
    }
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
      loading,
      isNotApplicable,
      NaLoading,
      canUserTagInQuestion,
      allFlags,
      query
    } = this.props;

    const { selectedRow } = this.state;
    const isCurrentBid = selectedBid.get('isCurrent');

    const optionsYN = ['Yes', 'No'];
    const answer = lastAnswer && lastAnswer?.get('answer');

    let answerValue = '';
    let answerValueComplex;
    let finalOptions = options;

    const checkDisableFlagRadio = () => {
      if (NaLoading) return true;

      return (
        checkNonEditableFields(noneditableField, sfField, sfObject) ||
        !isCurrentBid
      );
    };
    const checkDisableFlag = () => {
      if (this.isQuestionLockedByOther()) return true;
      if (NaLoading) return true;

      return (
        checkNonEditableFields(noneditableField, sfField, sfObject) ||
        !isCurrentBid
      );
    };
    // onFocus for question concurrency
    const concurrencyFocusHandler = () => {
      this.context.questionLockWrapper(this.props.questionId);
      this.setSelectRow(true);
    };
    // onBlur for question concurrency
    const concurrencyBlurHandler = () => {
      this.context.questionUnlockWrapper(this.props.questionId);
      this.setSelectRow(false);
    };
    const onFocusCheckBox = () => {
      this.setState({ focusedSpan: true, blurredSpan: false });
    };

    const onBlurCheckBox = () => {
      this.setState({ focusedSpan: false, blurredSpan: true });
    };

    const focusState = this.state.focusedSpan;
    const blurState = this.state.blurredSpan;
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
          <span
            style={
              `${this.props.showNaCheckbox}`
                ? {
                    display: 'flex',
                    alignItems: 'stretch'
                    // border: '1px solid blue',
                  }
                : ''
            }
          >
            <span
              className={this.props.showNaCheckbox ? 'markNaAutoActive' : ''}
            >
              {this.renderNACheckbox(checkDisableFlag, 'Autocomplete')}
            </span>
            <span
              style={`${this.props.showNaCheckbox}` ? { flexGrow: 10 } : ''}
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
                disabled={checkDisableFlag() || isNotApplicable}
              />
            </span>
          </span>
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
      value: { blocks: [] },
      htmlExport: ''
    };

    if (!richTextData.htmlExport && richTextData.html) {
      richTextData.htmlExport = richTextData.html;
    }

    // Richtext Props
    const richTextAnswerField = {
      // questionId: this.props.questionId,
      canUserTagInQuestion,
      allFlags,
      richTextString: getConvertedAnsString(answerValue),
      richTextVal: richTextData.value,
      richTextHtml: richTextData.html,
      richTextHtmlExport: richTextData.htmlExport,
      enableFocus: true,
      isEditable: false,
      placeholder: checkDisableFlag() ? '' : DEFAULT.CLICK_TO_ANS,
      disabled: checkDisableFlag() || isNotApplicable,
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
        ) {
          const prevAnswerBlocks = richTextData?.value?.blocks.filter(
            block => block.text.length > 0
          );
          const answerBlocks = data?.value?.blocks.filter(
            block => block.text.length > 0
          );
          if (isEqual(prevAnswerBlocks, answerBlocks)) {
            saveDate = false;
          } else if (
            isEmpty(richTextData?.value?.blocks) &&
            lastAnswerJS?.answer.trim() === data.text.trim()
          ) {
            saveDate = false;
          } else saveDate = true;
        }
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

        if (this.quesTextInnerLeftRef.current) {
          // Change title style for richEdit icon
          const {
            style: quesTitleLStyle,
            firstChild
          } = this.quesTextInnerLeftRef.current;
          quesTitleLStyle.minHeight = 'auto';
          firstChild.style.maxWidth = 'none';
        }
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
            <span
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex',
                      alignItems: 'stretch'
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'text')}
              </span>
              <span
                style={`${this.props.showNaCheckbox}` ? { flexGrow: 10 } : ''}
              >
                <CustomApolloRichText {...richTextAnswerField} />
              </span>
            </span>
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
            <span
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex'
                      // alignItems: 'stretch',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'number')}
              </span>
              <TextArea
                className="proposal-text-area"
                placeholder={checkDisableFlag() ? '' : 'Click to answer'}
                type="number"
                onBlur={this.handleTextChange}
                onFocus={e => this.onChildInputFocus(e)}
                value={answerValue || ''}
                disabled={checkDisableFlag() || isNotApplicable}
                highlightQuery={query !== null ? query : ''}
              />
            </span>
          </SFAnswerValidationWrapper>
        );
      case 'y/n':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              id="y/n-question-answer"
              tabIndex={-1}
              onBlur={() => {
                concurrencyBlurHandler();
              }}
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex'
                      // alignItems: 'stretch',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'y/n')}
              </span>
              <DropdownWithIdleStateDetection
                id="dd-proposal-answer"
                placeholder={checkDisableFlag() ? '' : 'Click to answer'}
                items={optionsYN}
                onClick={val => this.onClickChange(val, answerValue)}
                value={answerValue}
                setSelectRow={this.setSelectRow}
                disabled={checkDisableFlag() || isNotApplicable}
                questionId={this.props.questionId}
                lockedBySelf={!!this.isQuestionLockedBySelf()}
                highlightQuery={query !== null ? query : ''}
                lockQuestionOnFocus
              />
            </span>
          </SFAnswerValidationWrapper>
        );
      case 'select':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              id="select-question-answer"
              tabIndex={-1}
              onBlur={() => {
                concurrencyBlurHandler();
              }}
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex'
                      // alignItems: 'stretch',
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'select')}
              </span>
              <DropdownWithIdleStateDetection
                id="dd-proposal-answer"
                placeholder={checkDisableFlag() ? '' : 'Click to answer'}
                items={finalOptions}
                onClick={val => this.onClickChange(val, answerValue)}
                value={answerValue}
                setSelectRow={this.setSelectRow}
                disabled={checkDisableFlag() || isNotApplicable}
                questionId={this.props.questionId}
                lockedBySelf={!!this.isQuestionLockedBySelf()}
                highlightQuery={query !== null ? query : ''}
                lockQuestionOnFocus
              />
            </span>
          </SFAnswerValidationWrapper>
        );

      case 'date':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex',
                      alignItems: 'stretch'
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'date')}
              </span>
              <span
                style={`${this.props.showNaCheckbox}` ? { flexGrow: 10 } : ''}
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
                  disabled={checkDisableFlag() || isNotApplicable}
                />
              </span>
            </span>
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.PICKLIST:
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex'
                      // alignItems: 'stretch',
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'picklist')}
              </span>
              <MultiSelectWithIdleStateDetection
                placeholder={checkDisableFlag() ? '' : 'Click to answer'}
                items={finalOptions}
                onClick={this.onSelectValues}
                value={answerValueComplex}
                setSelectRow={this.setSelectRow}
                disabled={checkDisableFlag() || isNotApplicable}
                questionId={this.props.questionId}
                lastAnswer={lastAnswer}
                lockedBySelf={!!this.isQuestionLockedBySelf()}
                lockQuestionOnFocus
              />
            </span>
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.PICKLIST_LOOKUP:
      case 'multi-select-lookup':
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex',
                      alignItems: 'stretch'
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(
                  checkDisableFlag,

                  'multi-select-lookup'
                )}
              </span>
              <span
                style={
                  `${this.props.showNaCheckbox}` ? { minWidth: '100%' } : ''
                }
              >
                <AutoCompleteWithAddOptionWithIdleStateDetection
                  // sectionName={sectionName}
                  sfObject={sfObject}
                  lov={finalOptions}
                  sfField={sfField}
                  multiple
                  answer={answerValueComplex}
                  onFocus={concurrencyFocusHandler}
                  onBlur={concurrencyBlurHandler}
                  disabled={checkDisableFlag() || isNotApplicable}
                  onChange={this.handlePropsalChange}
                />
              </span>
            </span>
          </SFAnswerValidationWrapper>
        );
      case 'select-lookup':
        // Count max no of strings in single select lookup
        const multilineFlag = answerValue.length > 42;

        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex',
                      alignItems: 'stretch'
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(
                  checkDisableFlag,

                  'select-lookup'
                )}
              </span>
              <span
                style={
                  `${this.props.showNaCheckbox}` ? { minWidth: '100%' } : ''
                }
              >
                <AutoCompleteWithAddOptionWithIdleStateDetection
                  sfObject={sfObject}
                  lov={finalOptions}
                  sfField={sfField}
                  onFocus={concurrencyFocusHandler}
                  onBlur={concurrencyBlurHandler}
                  onChange={this.handlePropsalChange}
                  answer={answerValue || ''}
                  multilineFlag={multilineFlag}
                  multiple={false}
                  loading={loading}
                  disabled={checkDisableFlag() || isNotApplicable}
                />
              </span>
            </span>
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.RADIO:
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              id="radio-question-answer"
              tabIndex={-1}
              onBlur={() => {
                concurrencyBlurHandler();
              }}
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex'
                      // alignItems: 'stretch',
                      // border: '1px solid blue',
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'radio')}
              </span>
              <RadioQuestionIdleStateDetection
                id="dd-proposal-answer"
                items={finalOptions}
                onClick={val => {
                  this.onClickChange(val, answerValue).then(dataResponse => {
                    if (dataResponse && dataResponse.success) {
                      concurrencyBlurHandler();
                    }
                  });
                }}
                value={answerValue}
                disabled={checkDisableFlagRadio() || isNotApplicable}
                onFocus={concurrencyFocusHandler}
                onBlur={concurrencyBlurHandler}
              />
            </span>
          </SFAnswerValidationWrapper>
        );
      case ANSWER_TYPES.CHECKBOX:
        return (
          <SFAnswerValidationWrapper
            hasDifferentSFanswer={hasDifferentSFanswer && isCurrentBid}
            sfObject={sfObject}
          >
            <span
              id="checkbox-question-answer"
              tabIndex={-1}
              onBlur={() => {
                concurrencyBlurHandler();
              }}
              style={
                `${this.props.showNaCheckbox}`
                  ? {
                      display: 'flex'
                    }
                  : ''
              }
            >
              <span className={this.props.showNaCheckbox ? 'markNaActive' : ''}>
                {this.renderNACheckbox(checkDisableFlag, 'checkbox')}
              </span>
              <div
                className="checkboxwrapper"
                tabIndex={0}
                onFocus={onFocusCheckBox}
                onBlur={onBlurCheckBox}
              >
                <CheckBoxQuestionsIdleStateDetection
                  answerValue={answerValueComplex || ''}
                  finalOptions={finalOptions}
                  disabled={checkDisableFlag() || isNotApplicable}
                  currentSFanswer={this.props.currentSFanswer}
                  sfField={sfField}
                  sfObject={sfObject}
                  onOpen={() => concurrencyFocusHandler()}
                  onClose={() => {
                    concurrencyBlurHandler();
                  }}
                  onChange={e => this.handleCheckboxPropsalChange(e)}
                  focusSpan={focusState}
                  blurSpan={blurState}
                />
              </div>
            </span>
          </SFAnswerValidationWrapper>
        );
      default:
        return <div id="no-configuration">Click to answer</div>;
    }
  };

  renderTags = (milestone, milestoneNew, ismilestoneavailable, lastAnswer) => {
    if (Array.isArray(milestoneNew.toJS()) && milestoneNew.toJS().length > 0) {
      return milestoneNew.toJS().map(({ Name, Color }) => (
        <Tooltip title={Name} placement="top">
          <div className="tag">
            <span className="tag-box" style={{ backgroundColor: Color }}></span>
          </div>
        </Tooltip>
      ));
    } else {
      return null;
    }
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

  handleQuestionHintRef = questionHintRef => {
    this.questionTextRef2.current = questionHintRef;
    setTimeout(() => {
      // updating question hint with decorators
      if (this.questionTextRef2.current !== null) {
        const { editorState } = this.questionTextRef2.current.state;
        const newEditorState = EditorState.set(editorState, {
          decorator: compositeDecorator
        });
        this.questionTextRef2.current.setState({ editorState: newEditorState });
      }
    }, 700);
  };

  render() {
    const {
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
      integrationsData,
      questionData,
      proposalDetail,
      eventCategories,
      NaLoading,
      showNaCheckbox,
      bidAnswerCopy,
      bidType,
      latestAnsweredBidNo,
      questionDataDestinations
    } = this.props;
    let { answers } = this.props;
    let conditionBlankPredicted = false;
    answers = answers.reverse();
    answers.forEach((_answer, index) => {
      const currentAnswer =
        isObject(answers?.get(index)?.get('answer')) &&
        answers?.get(index)?.get('answer').size === 0
          ? ' '
          : answers?.get(index)?.get('answer');
      conditionBlankPredicted =
        answers.size &&
        isString(currentAnswer) &&
        isEmpty(currentAnswer.trim()) &&
        answers?.get(index + 1)?.get('userName') === 'UnityPredictedAnswer';
      if (conditionBlankPredicted) {
        answers = answers.delete(index).delete(index);
      }
    });
    answers = answers.reverse();
    const questionID = answers.get('questionId');
    const quesData = questionData?.toJS();
    const hasEvent = quesData?.events && !isEmpty(quesData?.events);
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
    let destinationArray;
    const currentBidID = selectedBid.toJS().id;
    const oppordata = oppdata.toJS();
    const deploymentDate = '2022-08-05';
    const proposalTimeStamp = oppordata[currentBidID]?.proposal?.proposalDate;
    const proposalCreationDate = proposalTimeStamp
      ? proposalTimeStamp.substring(0, proposalTimeStamp.indexOf('T'))
      : '';
    const integrationLocked = !!this.isQuestionLockedByOther();
    const dateIsAfter = moment(proposalCreationDate).isAfter(
      moment(deploymentDate)
    );
    const answerText = answers?.toJS()[0]?.answer;

    const dateIsBefore = moment(proposalCreationDate).isBefore(
      moment(deploymentDate)
    );
    if (
      typeof currentSFanswer !== 'undefined' &&
      isEmpty(currentSFanswer) !== true
    ) {
      checkSfAnswer = currentSFanswer.toJS().value;
    }
    if (dateIsAfter) {
      integrationvalidation = true;
    }
    const integrationsArray =
      questionDataDestinations && questionDataDestinations.split(',');

    integrationvalidation = integrationsArray?.includes(qvicon);

    if (qvidianIntegration) {
      qvidIntegration = true;
    }
    integrationmatch = integrationvalidation;
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
      anchorEl,
      enableRichtext,
      focusedSpan,
      blurredSpan
    } = this.state;
    const smallScreenWidth = screenWidth < 641 ? [8, 4] : [10, 2];
    const mediumScreen =
      screenWidth < 950 ? [10, 2] : screenWidth < 900 ? [10, 2] : [11, 1];
    const gridColRatio = isNotepadOpen ? smallScreenWidth : mediumScreen;
    return (
      <div
        className={`task-table-row question-row ${
          selectedRow ? 'selected-task-table-row' : ''
        } ${NaLoading ? 'fade-area' : ''} `}
        style={{ margin: '2px 0px' }}
        data-testid="strategy-development-question"
      >
        <Grid container className="question-title-grid">
          <Grid item xs={gridColRatio[0]} className="question-grid-item">
            {/* Question Text and Milestone */}
            <div
              className="question-label-container"
              ref={this.quesTextContainerRef}
            >
              <div
                className="question-label-inner"
                ref={this.quesTextInnerLeftRef}
                style={{ minHeight: 'auto' }}
              >
                {/* Question Text */}
                <div className="questiontext-richtext">
                  <div
                    className="question-title-txt"
                    ref={this.questionTextTitleRef}
                  >
                    {questionJSON ? (
                      <RichTextEditor
                        style={{ minHeight: '0px' }}
                        variant="view"
                        defaultValue={JSON.parse(questionJSON)}
                        ref={this.questionTextRef1}
                      />
                    ) : (
                      <p>{questionText}</p>
                    )}
                  </div>
                </div>

                {/* Event Launcher Component */}
                {hasEvent && (
                  <EventLauncher
                    questionData={questionData}
                    proposalDetail={proposalDetail}
                    eventCategories={eventCategories}
                    trackMatomoEventLauncher={this.trackMatomoEventLauncher}
                  />
                )}

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
                    <IconButton
                      data-testid="question-tooltip-button"
                      color="primary"
                      size="small"
                      className="question-tooltip-icon"
                      onClick={e =>
                        this.setState({ anchorEl: e.currentTarget })
                      }
                    >
                      <InfoIcon className="info-icon" />
                    </IconButton>
                    <Popover
                      data-testid="question-popover"
                      className="popover-strategy-question"
                      open={!!anchorEl}
                      anchorEl={anchorEl}
                      onClose={() => this.setState({ anchorEl: null })}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                      }}
                      PaperProps={{
                        style: {
                          borderColor: '#e9e9e9',
                          boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.08)',
                          padding: 10,
                          maxInlineSize: '300px'
                        }
                      }}
                    >
                      <Typography>
                        {questionHintJSON ? (
                          <RichTextEditor
                            variant="view"
                            defaultValue={JSON.parse(questionHintJSON)}
                            ref={this.handleQuestionHintRef}
                          />
                        ) : (
                          <div>{questionHint}</div>
                        )}
                      </Typography>
                    </Popover>
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
            destinationArray={destinationArray}
            answers={answers}
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
            NaLoading={NaLoading}
            showNaCheckbox={showNaCheckbox}
            isNotepadOpen={isNotepadOpen}
            changeIcon={changeIcon}
            isCurrentBid={isCurrentBid}
            sfObject={sfObject}
            answer={answerValue}
            answerText={answerText}
            handleVerifyPredictedAnsClick={this.handleVerifyPredictedAnsClick}
            hasDifferentSFanswer={hasDifferentSFanswer}
            disabled={integrationLocked}
            bidAnswerCopy={bidAnswerCopy}
            bidType={bidType}
            latestAnsweredBidNo={latestAnsweredBidNo}
            questionId={qId}
            questionDataDestinations={this.props.questionDataDestinations}
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
  integrationsData: getIntegrations(state),
  selectedBid: getSelectedBid(state),
  oppdata: getOpportunityData(state),
  noneditableField: getnoneditableField(state),
  showNaCheckbox: getShowNaCheckbox(state),
  canUserTagInQuestion: getCanUserTagInQuestion(state),
  allFlags: getfetchAllFlags(state),
  query: selectQuery(state),
  currentSearchResult: selectCurrentSearchResult(state),
  prevSearchResult: selectPrevSearchResult(state),
  autoNavigatedToCurrentResult: selectAutoNavigatedToCurrentResult(state)
});

export default connect(mapStateToProps, {
  widgetUpdates: widgetUpdate,
  setProposalAnswer: setProposalAnswerData,
  setAnswerLoading: setProposalAnswerLoading,
  deleteProposalUser: deleteProposalUserFromDB,
  setNotApplicable: setNotApplicableQuestion,
  setNotApplicableLoading: setNotApplicableLoader,
  setEditQuestionData,
  autoNavigationDone: () => dispatch =>
    dispatch(autoNavigationCompletedAction())
})(MatomoHOC(TaskRow));
