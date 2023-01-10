/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
// @flow
// eslint-disable-next-line react/destructuring-assignment
import React, { createRef, createContext, Component, Suspense } from 'react';
import { withRouter, Match } from 'react-router-dom';
import { List, Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from 'apollo-react/components/Button';
import Link from 'apollo-react/components/Link';
import Filter from 'apollo-react-icons/Filter';
import ApolloCheckbox from 'apollo-react/components/Checkbox';
import classNames from 'classnames';
import Grid from 'apollo-react/components/Grid';
import Switch from 'apollo-react/components/Switch';
import Tooltip from 'apollo-react/components/Tooltip';
import InfoIcon from 'apollo-react-icons/Info';
import IconButton from 'apollo-react/components/IconButton';
import moment from 'moment';
import { Add, Refresh } from '../../svg';
import BidHistory from '../../common/Bidhistory';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import {
  getProposalUpdated,
  onApplyQuestionsFilter,
  resetQuestionsFilterAction,
  clearQuestionsFilterAction,
  expandAllSectionsAction,
  callPickListLookupSfData,
  setShowNaCheckbox,
  fetchUserTagFlagInQuestion,
  getPriceModelerData
} from '../../../redux/actions/proposal-actions';
import {
  getProposalDetails,
  setQuestionData,
  isSetQuestionLoading,
  setQuestionError,
  getQuestionsFilters,
  selectIsQuestionsFilterEnabled,
  selectSections,
  selectFilteredSections,
  selectActiveQuestionsFilterCount,
  getMilestoneSections,
  getEditQuestionData,
  getIsOpen,
  getSelectedBid,
  getShowNaCheckbox,
  getUserEmail,
  getUserRole,
  getfetchUserTagFlag
} from '../../../redux/selectors';
import {
  selectUniqueMilestones,
  selectAreAllSectionsExpanded,
  getBidList,
  getSelectedBid as getCurrentBid
} from '../../../redux/selectors/proposal';
import { selectUserRole } from '../../../redux/selectors/sso-auth';
import AnswerHistory from '../../views/modals/AnswerHistory';
import { getAllUsers } from '../../../redux/actions/sso-auth-actions';
import MatomoHOC from '../../HOC/MatomoHOC';
import {
  createMatomoObj,
  getCountriesNameForCode,
  saveDataInMatomo,
  throttle
} from '../../../utils/utils';
import { onHandleOpenClose } from '../../../redux/actions/sidebar-actions';
import ANSWER_TYPES from '../../../constants/answerTypes';
import moment from 'moment';
import ViewAboveVerticalTabs from '../../views/ViewAboveVerticalTabs';
import lazyWithRetry from '../../../utils/lazy';

export const QuestionsRefContext = createContext(null);
// import Sidebar from '../../views/Sidebar';
const Sidebar = React.lazy(() =>
  lazyWithRetry(() =>
    import(/* webpackChunkName: "Sidebar" */ '../../views/Sidebar')
  )
);

const QuestionsSectionMapping = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "questionsSectionMapping" */ './QuestionsSectionMapping'
    )
  )
);

type Props = {
  match: Match,
  details: Map,
  sections: Map,
  filteredSections: Map,
  setQuestion: Map,
  hasQuestionError: boolean,
  isQuestionLoading: boolean,
  getProposalInfoUpdated: Function,
  fetchUsers: () => {},
  selectedBid: Map,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  proposalDetail: any,
  userRole: string,
  questionsFilters: Map,
  applyQuestionsFilter: Function,
  resetQuestionsFilter: Function,
  clearQuestionsFilter: Function,
  isQuestionsFiltersEnabled: boolean,
  activeQuestionsFilterCount: Number,
  allSectionsExpanded: boolean,
  expandAllSections: Function,
  editQuestionsData: Map,
  setQuestion: Function,
  hasQuestionError: boolean
};

type State = {
  showModal: boolean,
  selectedQuestionForHistory: string,
  isHistoryModalShown: boolean,
  showFilter: boolean
};

const MANUAL_REFRESH = false;
class Questions extends Component {
  constructor(props: Object) {
    super(props);
    this.resizeObserver = null;

    this.state = {
      showModal: false,
      selectedQuestionForHistory: '',
      isHistoryModalShown: false,
      currentsection: '',
      currentTab: 0,
      selectedtitle: '',
      heighlightcard: false,
      showFilter: false,
      sidebarscroll: '',
      open: false,
      isNotepadOpen: true,
      totalWidth: '',
      proposalNoteRender: true
    };
    this.questionsRef = createRef(null);
  }

  componentDidMount() {
    window.localStorage.setItem('enableFirstExpand', 'true');
    const {
      fetchUsers,
      callPickListLookupSfData,
      fetchUserTagFlag,
      getBid,
      getPriceModeler
    } = this.props;
    fetchUsers();
    callPickListLookupSfData();
    const bid = getBid?.toJS();
    const proposalID = bid?.id;
    if (proposalID) getPriceModeler(proposalID);
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    if (
      fetchUserTagFlag &&
      typeof fetchUserTagFlag === 'object' &&
      fetchUserTagFlag.answerUserTagFlag
    ) {
      this.props.fetchUserTagFlagInQuestion(
        fetchUserTagFlag.answerUserTagFlag || false
      );
    }
  }

  componentDidUpdate(prevProps: Map) {
    const {
      setQuestion,
      hasQuestionError,
      userRole,
      applyQuestionsFilter,
      editQuestionsData,
      userEmail,
      proposalDetail,
      trackEvent
    } = this.props;
    if (prevProps.isQuestionLoading && setQuestion && !hasQuestionError)
      this.onClose();

    // check for user role change
    if (prevProps.userRole !== userRole) {
      applyQuestionsFilter();
    }

    // on Edit question
    if (prevProps.editQuestionsData.size === 0 && editQuestionsData.size > 0) {
      this.setState({ showModal: true });
      this.trackMatomoEventToggleQModal(true);
    }

    // bid change check start
    const {
      match: { params },
      selectedBid
    } = this.props;
    const thisProposalId = selectedBid.get('id', '');
    const prevProposalId = prevProps.selectedBid.get('id', '');
    // Bid changed
    if (prevProposalId !== thisProposalId) {
      this.setState({ proposalNoteRender: false });
      setTimeout(() => {
        this.setState({ proposalNoteRender: true });
      }, 5000);
    }
    // bid change check ends

    // Resize Observer Matomo event for Notepad component
    this.resizeObserver = new ResizeObserver(
      throttle(entries => {
        const matamoObj = createMatomoObj(
          proposalDetail,
          userEmail,
          userRole,
          'drag event'
        );
        saveDataInMatomo(trackEvent, matamoObj);
      }, 3000)
    );
    if (
      this.resizeObserver &&
      document.querySelector('.notepad-classoverride')
    ) {
      this.resizeObserver.observe(
        document.querySelector('.notepad-classoverride')
      );
    }
  }

  componentWillUnmount() {
    const { proposalDetail, trackEvent, userEmail, userRole } = this.props;
    if (localStorage.getItem('notepadStartDuration')) {
      const matamoObj = {};
      matamoObj.category = `Proposal Detail (CRM#:${proposalDetail['CRM #']})`;
      matamoObj.action = `Event: Notepad ${proposalDetail['CRM #']}`;
      matamoObj.name = `Notepad: Duration ${localStorage.getItem(
        'notepadStartDuration'
      )} - ${moment()
        .utc()
        .format('MMMM Do YYYY, h:mm:ss a')}`;
      matamoObj.customDimensions = [
        JSON.stringify(proposalDetail),
        { user: userEmail },
        { role: userRole }
      ];
      saveDataInMatomo(trackEvent, matamoObj);
      localStorage.removeItem('notepadStartDuration');
    }
    const { handleOpenClose, resetQuestionsFilter } = this.props;
    if (handleOpenClose) handleOpenClose(false);

    if (resetQuestionsFilter) resetQuestionsFilter();
    if (this.resizeObserver && this.resizeObserver.disconnect) {
      this.resizeObserver.disconnect();
    }
    // this.state.wsInstance?.destroy();
  }

  handleIsCheckedAll = () => {
    const { allSectionsExpanded, expandAllSections } = this.props;
    expandAllSections(!allSectionsExpanded);
    this.trackMatomoEventForCheckBoxes('Expand All');
  };

  handleFilterClick() {
    this.setState(({ showFilter }) => ({
      showFilter: !showFilter
    }));
  }

  handleFilterChange(filterName, checked, groupName = '') {
    const { applyQuestionsFilter } = this.props;
    applyQuestionsFilter(filterName, checked, groupName);
  }

  scrollToSelectedElement = title => {
    setTimeout(() => {
      const item = document.getElementById(
        `notepad-${String(title).toLocaleLowerCase()}`
      );
      if (item) {
        item.scrollIntoView();
      }
    }, 1000);
  };

  setTabFromQuestionNotes = (tabid, title, flag) => {
    this.setState(
      { currentTab: tabid, selectedtitle: title, heighlightcard: flag },
      () => {
        this.scrollToSelectedElement(title);
      }
    );
  };

  onAddQuestion = value => {
    this.setState({ currentsection: value, showModal: true });
  };

  trackMatomoEventForCheckBoxes = item => {
    const {
      userActions,
      eventCategories,
      proposalDetail,
      trackEvent
    } = this.props;

    trackEvent({
      category: eventCategories.pd(this.props),
      action: `CheckBoxes: ${userActions.click} On ${item} Checkbox`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  trackMatomoEvent = ({ action }) => {
    const { proposalDetail, trackEvent, eventCategories } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  trackMatomoEventSidebarToggle = action => {
    const openOrclose = action ? 'Open' : 'Close';
    const { userActions } = this.props;
    this.trackMatomoEvent({
      action: `Blade: ${userActions.click} On Blade To ${openOrclose} Sidebar`
    });
  };

  handleItemsVisibility = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();
    const { isOpen, handleOpenClose } = this.props;
    this.setState({ activeTabIndex: 0 });
    this.setTabFromQuestionNotes(0, '', true);
    handleOpenClose(!isOpen);
    if (isOpen) this.setState({ activeTabIndex: 0 });
    this.trackMatomoEventSidebarToggle(!isOpen);
  };

  trackMatomoEventToggleQModal = action => {
    const openOrclose = action ? 'Open' : 'Close';
    const {
      userActions,
      eventCategories,
      proposalDetail,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Round Buttons: ${userActions.click} To ${openOrclose} Add New Question Modal`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  trackMatomoEventRefreshInfo = () => {
    const {
      userActions,
      eventCategories,
      proposalDetail,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Round Buttons: ${userActions.click} On Refresh Button`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  getProposalInfoUpdated = () => {
    const { getProposalInfoUpdated, getBidList } = this.props;
    const currentbid = getBidList.filter(v => v.isCurrent === true);
    getProposalInfoUpdated(currentbid[0].bidId);
    this.trackMatomoEventRefreshInfo();
  };

  onClose = () => {
    const { showModal } = this.state;
    this.setState({ showModal: false });
    this.trackMatomoEventToggleQModal(!showModal);
  };

  closeAnswerHistoryModal = () => {
    this.setState({ isHistoryModalShown: false });
  };

  handleOnChangeNaSwitch = (e, checked) => {
    this.props.handleShowNaCheckbox(checked);
  };

  setQuestionToDisplayHistory = (selectedAnswer: string) => {
    const {
      sections,
      filteredSections,
      isQuestionsFiltersEnabled
    } = this.props;

    const allSections = isQuestionsFiltersEnabled ? filteredSections : sections;

    let question = allSections
      .valueSeq()
      .find(section => section.getIn(['questions', selectedAnswer]))
      .getIn(['questions', selectedAnswer]);

    const answerConfigType = question
      .get('answerConfiguration', Map({ type: '' }))
      .get('type', '');
    const sfObject = question.get('sfObject', '');
    const sfField = question.get('sfField', '');

    if (
      answerConfigType === ANSWER_TYPES.PICKLIST &&
      (sfObject === 'Bid_History__c' ||
        sfObject === 'Apttus__APTS_Agreement__c') &&
      sfField === 'Targeted_Countries__c'
    ) {
      let newAnswers = question.get('answers', List());
      const questionId = newAnswers.get('questionId');

      if (questionId) newAnswers = newAnswers.getIn(['answers', 'answers']);
      if (newAnswers) {
        newAnswers = newAnswers.map(ans => {
          const newAns = getCountriesNameForCode(ans.get('answer', List()));
          return ans.set('answer', newAns);
        });
        question = question.set('answers', newAnswers);
      }
    }

    this.setState({
      selectedQuestionForHistory: question,
      isHistoryModalShown: true
    });
  };

  setIsNotepadOpen = (value: boolean) => {
    this.setState({ isNotepadOpen: value });
  };

  expandsection = e => {
    const { expandAllSections } = this.props;
    expandAllSections(false);
    this.setState({ sidebarscroll: e });
  };

  resize() {
    this.setState({ totalWidth: window.innerWidth });
  }

  renderFilter() {
    const { showFilter } = this.state;
    const { questionsFilters, clearQuestionsFilter } = this.props;
    if (showFilter) {
      return (
        <div className="questions-filter__container">
          <div className="questions-filter__grid column_style">
            <div className="filtertitle">Filters</div>
            <div>
              <Link
                className="clear-all"
                size="small"
                onClick={() => clearQuestionsFilter()}
              >
                Clear All
              </Link>
            </div>
            {questionsFilters.entrySeq().map(([groupName, group]) => (
              <Grid container spacing={2} key={groupName} className={groupName}>
                {group
                  .entrySeq()
                  .filter(value => value[0] !== 'logic')
                  .map(([key, filter]) => (
                    <Grid
                      item
                      xs={3}
                      key={key}
                      className={classNames(
                        'questions-filter__item',
                        filter.get('className'),
                        { 'questions-filter__auto': !filter.get('className') }
                      )}
                    >
                      <ApolloCheckbox
                        size="small"
                        label={filter.get('label')}
                        checked={filter.get('checked')}
                        onChange={(e, checked) =>
                          this.handleFilterChange(key, checked, groupName)
                        }
                      />
                    </Grid>
                  ))}
              </Grid>
            ))}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      details,
      sections,
      filteredSections,
      selectedBid,
      isQuestionsFiltersEnabled,
      activeQuestionsFilterCount,
      allSectionsExpanded,
      isOpen,
      showNaCheckbox
    } = this.props;
    const {
      showModal,
      selectedQuestionForHistory,
      isHistoryModalShown
    } = this.state;
    const allSections = isQuestionsFiltersEnabled ? filteredSections : sections;
    const minPixelToExclude = 20;
    const notepadMinWidthPx =
      (window.innerWidth - minPixelToExclude) * (30 / 100); // 30% of the total screen size
    const notepadMaxWidthPx = isOpen
      ? notepadMinWidthPx
      : (window.innerWidth - minPixelToExclude) * (47 / 100); // 50% of the total screen size
    return (
      <>
        <ViewAboveVerticalTabs>
          <div className="opportunity-details">
            <BidHistory />
          </div>
        </ViewAboveVerticalTabs>

        <div id="panelwrapper">
          {/* Question list */}
          <div id="panel-questions-list">
            <div className="tasksList-title-wrapper">
              <div className="N/A na-toggle-switch">
                <span style={{ padding: '10px' }}>Mark N/A</span>
                <Switch
                  style={{ marginRight: '-2px' }}
                  checked={showNaCheckbox}
                  onChange={this.handleOnChangeNaSwitch}
                  size="small"
                />
                <Tooltip
                  variant="light"
                  disableTouchListener
                  title={showNaCheckbox ? 'NA ON' : 'NA OFF'}
                  placement="top"
                >
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="tasklist-mid-menu-separator" />
              <div className="taskList-icons-wrapper">
                <ApolloCheckbox
                  label="Expand All"
                  checked={allSectionsExpanded}
                  onChange={(e, checked) => {
                    this.setState({ sidebarscroll: '' }, () => {
                      this.handleIsCheckedAll(checked);
                    });
                    if (!checked) {
                      const clearsidebarselectsection = new CustomEvent(
                        'clearsidebarselectsection',
                        {
                          detail: true
                        }
                      );
                      document.dispatchEvent(clearsidebarselectsection);
                    }
                  }}
                />
                {MANUAL_REFRESH && (
                  <div
                    title="Refresh"
                    className="tasksList-refresh-icon-wrapper"
                    role="presentation"
                    onClick={this.getProposalInfoUpdated}
                  >
                    <Refresh className="tasksList-add-icon" />
                  </div>
                )}
                {selectedBid.get('isCurrent') && (
                  <div
                    title="Add New Question"
                    className="tasksList-add-icon-wrapper"
                    role="presentation"
                    onClick={() => {
                      this.setState({ currentsection: '', showModal: true });
                      this.trackMatomoEventToggleQModal(true);
                    }}
                  >
                    <Add className="tasksList-add-icon" />
                  </div>
                )}
                <Button
                  variant="secondary"
                  size="small"
                  icon={<Filter fontSize="extraSmall" />}
                  onClick={() => this.handleFilterClick()}
                >
                  {activeQuestionsFilterCount
                    ? `Filter (${activeQuestionsFilterCount})`
                    : 'Filter'}
                </Button>
              </div>
            </div>
            {this.renderFilter()}
            <div className="tasksList-wrapper" ref={this.questionsRef}>
              <Suspense fallback={<div>Loading...</div>}>
                <QuestionsRefContext.Provider value={this.questionsRef}>
                  <QuestionsSectionMapping
                    {...this.props}
                    {...this.state}
                    setQuestionToDisplayHistory={
                      this.setQuestionToDisplayHistory
                    }
                    setTabFromQuestionNotes={this.setTabFromQuestionNotes}
                    onAddQuestion={this.onAddQuestion}
                  />
                </QuestionsRefContext.Provider>
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar
            sections={allSections}
            id={selectedBid.get('id')}
            onAddQuestion={value => {
              this.setState({ currentsection: value });
            }}
            onscrollelement={e => this.expandsection(e)}
            expandAll={e => {
              this.setState({ sidebarscroll: '' }, () => {
                this.handleIsCheckedAll();
              });
              if (!e) {
                const clearsidebarselectsection = new CustomEvent(
                  'clearsidebarselectsection',
                  {
                    detail: true
                  }
                );
                document.dispatchEvent(clearsidebarselectsection);
              }
            }}
            AddNewQuestion={() => {
              this.setState({ showModal: true });
              this.trackMatomoEventToggleQModal(true);
            }}
            RefreshProposal={this.getProposalInfoUpdated}
            // eslint-disable-next-line react/destructuring-assignment
            currentTab={this.state.currentTab}
            // eslint-disable-next-line react/destructuring-assignment
            selectedtitle={this.state.selectedtitle}
            // eslint-disable-next-line react/destructuring-assignment
            heighlightcard={this.state.heighlightcard}
            setTabFromQuestionNotes={(val, title, flag) =>
              this.setTabFromQuestionNotes(val, title, flag)
            }
          />
        </Suspense>
        {showModal && (
          <AddQuestionModalComponent
            onClose={this.onClose}
            // eslint-disable-next-line react/destructuring-assignment
            currentsection={this.state.currentsection || ''}
          />
        )}

        {isHistoryModalShown && (
          <AnswerHistory
            question={selectedQuestionForHistory}
            closeModal={this.closeAnswerHistoryModal}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  isOpen: getIsOpen(state),
  details: getProposalDetails(state),
  filterMilestone: getMilestoneSections(state),
  sections: selectSections(state),
  filteredSections: selectFilteredSections(state),
  setQuestion: setQuestionData(state),
  isQuestionLoading: isSetQuestionLoading(state),
  hasQuestionError: setQuestionError(state),
  proposalDetail: getProposalDetails(state),
  questionsFilters: getQuestionsFilters(state),
  isQuestionsFiltersEnabled: selectIsQuestionsFilterEnabled(state),
  activeQuestionsFilterCount: selectActiveQuestionsFilterCount(state),
  milestones: selectUniqueMilestones(state),
  userRole: selectUserRole(state),
  allSectionsExpanded: selectAreAllSectionsExpanded(state),
  editQuestionsData: getEditQuestionData(state),
  selectedBid: getSelectedBid(state),
  getBidList: getBidList(state),
  userEmail: getUserEmail(state),
  userRole: getUserRole(state),
  getBid: getCurrentBid(state),
  fetchUserTagFlag: getfetchUserTagFlag(state),
  showNaCheckbox: getShowNaCheckbox(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getProposalInfoUpdated: getProposalUpdated,
    fetchUsers: getAllUsers,
    applyQuestionsFilter: onApplyQuestionsFilter,
    resetQuestionsFilter: resetQuestionsFilterAction,
    clearQuestionsFilter: clearQuestionsFilterAction,
    expandAllSections: expandAllSectionsAction,
    handleOpenClose: onHandleOpenClose,
    handleShowNaCheckbox: setShowNaCheckbox,
    callPickListLookupSfData,
    fetchUserTagFlagInQuestion,
    getPriceModeler: getPriceModelerData
  })
)(MatomoHOC(Questions));
