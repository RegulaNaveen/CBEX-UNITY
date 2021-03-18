// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Add, Refresh } from '../../svg';
import CollapsibleList from './CollapsibleList';
import Checkbox from '../../common/atoms/inputs/Checkbox';
import ProposalInfo from './ProposalInfo';
import AddQuestionModalComponent from './AddQuestionModal';
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
import { getAllUsers } from '../../../redux/actions/auth-actions';

type Props = {
  match: Match,
  details: Map,
  sections: Map,
  filteredSections: Map,
  setQuestion: Map,
  hasQuestionError: boolean,
  isQuestionLoading: boolean,
  getProposalInfoUpdated: Function,
  fetchUsers: () => {}
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
      showModal: false,
      isChecked: false,
      isCheckedAll: false,
      selectedQuestionForHistory: '',
      isHistoryModalShown: false
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

    const question = allSections
      .valueSeq()
      .find(section => section.getIn(['questions', selectedAnswer]))
      .getIn(['questions', selectedAnswer]);

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
  };

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  handleIsCheckedAll = () => {
    const { isCheckedAll } = this.state;
    this.setState({ isCheckedAll: !isCheckedAll });
  };

  getProposalInfoUpdated = () => {
    const { getProposalInfoUpdated, match } = this.props;
    getProposalInfoUpdated(match.params.id);
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
        .map(question => question.get('visible'))
        .includes(true);

      const allQuestionsDontHaveLogin = questions.every(
        question => question.get('visible') === undefined
      );

      if (someQuestionsAreVisible || allQuestionsDontHaveLogin)
        return (
          <CollapsibleList
            questions={questions}
            title={sectionName}
            key={sectionName}
            isCheckedAll={isCheckedAll}
            setQuestionToDisplayHistory={this.setQuestionToDisplayHistory}
          />
        );

      return null;
    });
  }

  render() {
    const { details, sections, filteredSections } = this.props;
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

        <Sidebar sections={allSections} />

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
              onClick={this.onClose}
            >
              <Add className="tasksList-add-icon" />
            </div>
          </div>
        </div>
        <div className="tasksList-wrapper">{this.renderQuestions()}</div>

        {showModal && <AddQuestionModalComponent onClose={this.onClose} />}

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
  hasQuestionError: setQuestionError(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getProposalInfoUpdated: getProposalUpdated,
    fetchUsers: getAllUsers
  })
)(Questions);
