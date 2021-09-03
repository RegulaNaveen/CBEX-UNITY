// @flow
// eslint-disable-next-line react/destructuring-assignment
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { List, Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Add, Refresh } from '../../svg';
import CollapsibleList from '../../common/CollapsibleList';
import Checkbox from '../../common/atoms/inputs/Checkbox';
import ProposalInfo from './ProposalInfo';
import AddQuestionModalComponent from '../../views/modals/AddQuestionModal';
import { getProposalUpdated } from '../../../redux/actions/proposal-actions';
import {
  getProposalDetails,
  getSections,
  getFilteredSections,
  setQuestionData,
  isSetQuestionLoading,
  setQuestionError
} from '../../../redux/selectors';
import Sidebar from '../../views/Sidebar';
import AnswerHistory from '../../views/modals/AnswerHistory';
import { getAllUsers } from '../../../redux/actions/sso-auth-actions';
import MatomoHOC from '../../HOC/MatomoHOC';
import { getCountriesNameForCode } from '../../../utils/utils';

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
  proposalID: string,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  proposalDetail: any
};

type State = {
  showModal: boolean,
  isChecked: boolean,
  isCheckedAll: boolean,
  selectedQuestionForHistory: string,
  isHistoryModalShown: boolean
};

class Questions extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      showModal: true,
      isChecked: false,
      isCheckedAll: false,
      selectedQuestionForHistory: '',
      isHistoryModalShown: false,
      currentsection: '',
      currentTab: 0,
      selectedtitle: '',
      heighlightcard: false
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  componentDidUpdate(prevProps: Map) {
    const { setQuestion, hasQuestionError } = this.props;
    if (prevProps.isQuestionLoading && setQuestion && !hasQuestionError)
      this.onClose();
  }

  setQuestionToDisplayHistory = (selectedAnswer: string) => {
    const { sections, filteredSections } = this.props;
    const { isChecked } = this.state;

    const allSections = isChecked ? filteredSections : sections;

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
      answerConfigType === 'picklist' &&
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

  closeAnswerHistoryModal = () => {
    this.setState({ isHistoryModalShown: false });
  };

  onClose = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
    this.trackMatomoEventToggleQModal(!showModal);
  };

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
    this.trackMatomoEventForCheckBoxes('Filter By Role');
  };

  handleIsCheckedAll = () => {
    const { isCheckedAll } = this.state;
    this.setState({ isCheckedAll: !isCheckedAll });
    this.trackMatomoEventForCheckBoxes('Expand All');
  };

  getProposalInfoUpdated = () => {
    const { getProposalInfoUpdated, match } = this.props;
    getProposalInfoUpdated(match.params.id);
    this.trackMatomoEventRefreshInfo();
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

  renderQuestions() {
    const { isChecked, isCheckedAll } = this.state;
    const { sections, filteredSections } = this.props;

    const allSections = isChecked ? filteredSections : sections;

    return allSections.valueSeq().map(section => {
      const sectionName = section.get('sectionName');
      const questions = section.get('questions');
      const someQuestionsAreVisible = questions
        .valueSeq()
        .map(question => question.get('visible', true))
        .includes(true);

      if (someQuestionsAreVisible)
        return (
          <CollapsibleList
            questions={questions}
            title={sectionName}
            key={sectionName}
            setTabFromQuestionNotes={(val, title, flag) =>
              this.setTabFromQuestionNotes(val, title, flag)
            }
            onAddQuestion={value => {
              this.setState({ currentsection: value });
              this.onClose();
            }}
            isCheckedAll={isCheckedAll}
            setQuestionToDisplayHistory={this.setQuestionToDisplayHistory}
          />
        );

      return null;
    });
  }

  render() {
    const { details, sections, filteredSections, proposalID } = this.props;
    const {
      showModal,
      isCheckedAll,
      isChecked,
      selectedQuestionForHistory,
      isHistoryModalShown
    } = this.state;

    const allSections = isChecked ? filteredSections : sections;

    return (
      <>
        <ProposalInfo data={details} />

        <Sidebar
          sections={allSections}
          id={proposalID}
          expandAll={this.handleIsCheckedAll}
          AddNewQuestion={this.onClose}
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

        <div className="tasksList-title-wrapper">
          <div className="taskList-icons-wrapper">
            <div className="taskList-checkbox-wrapper">
              <Checkbox
                id="filter-checkbox"
                value="notification"
                name="notification"
                onChange={this.handleIsChecked}
                isChecked={isChecked}
              >
                Filter by User Role
              </Checkbox>
            </div>
            <div className="taskList-checkbox-wrapper">
              <Checkbox
                id="collapsed-all-checkbox"
                value="notification"
                name="notification"
                onChange={this.handleIsCheckedAll}
                isChecked={isCheckedAll}
              >
                Expand All
              </Checkbox>
            </div>
            <div
              title="Refresh"
              className="tasksList-refresh-icon-wrapper"
              role="presentation"
              onClick={this.getProposalInfoUpdated}
            >
              <Refresh className="tasksList-add-icon" />
            </div>
            <div
              title="Add New Question"
              className="tasksList-add-icon-wrapper"
              role="presentation"
              onClick={() => {
                this.setState({ currentsection: '' });
                this.onClose();
              }}
            >
              <Add className="tasksList-add-icon" />
            </div>
          </div>
        </div>
        <div className="tasksList-wrapper">{this.renderQuestions()}</div>

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
  details: getProposalDetails(state),
  sections: getSections(state),
  filteredSections: getFilteredSections(state),
  setQuestion: setQuestionData(state),
  isQuestionLoading: isSetQuestionLoading(state),
  hasQuestionError: setQuestionError(state),
  proposalDetail: getProposalDetails(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getProposalInfoUpdated: getProposalUpdated,
    fetchUsers: getAllUsers
  })
)(MatomoHOC(Questions));
