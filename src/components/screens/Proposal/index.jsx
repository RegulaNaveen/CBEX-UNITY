// @flow
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getProposal } from '../../../actions/proposal-actions';
import {
  getProposalDetails,
  getSections,
  getFilteredSections,
  isProposalLoading,
  setQuestionData,
  isSetQuestionLoading,
  setQuestionError
} from '../../../selectors';
import ProposalInfo from './ProposalInfo';
import SectionList from './SectionList';
import Toolbar from '../../Toolbar';
import { Add, Refresh } from '../../svg';
import AddQuestionModalComponent from './AddQuestionModal';
import Checkbox from '../../common/Checkbox';

type State = {
  showModal: boolean,
  isChecked: boolean
};

type Props = {
  match: Match,
  details: Map,
  sections: Map,
  filteredSections: Map,
  isLoading: boolean,
  getProposalInfo: Function,
  setQuestion: Map,
  hasQuestionError: boolean,
  isQuestionLoading: boolean
};

export class Proposal extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      showModal: false,
      isChecked: false
    };
  }

  componentDidMount() {
    const { getProposalInfo, match } = this.props;
    getProposalInfo(match.params.id);
  }

  componentDidUpdate(prevProps: Map) {
    const { setQuestion, hasQuestionError } = this.props;
    if (prevProps.isQuestionLoading && setQuestion && !hasQuestionError) {
      this.onClose();
    }
  }

  onClose = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  renderContent = (
    isLoading: boolean,
    sections: Map,
    details: Object,
    isChecked: boolean
  ) => {
    if (isLoading) {
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );
    }

    return (
      <div>
        <ProposalInfo data={details} />
        <div className="tasksList-title-wrapper">
          <p className="tasksList-title">Questions</p>
          <div className="taskList-icon-wrapper">
            <div className="taskList-checkbox-wrapper">
              <Checkbox
                id="send-notification-checkbox"
                value="notification"
                name="notification"
                onChange={this.handleIsChecked}
                isChecked={isChecked}
              >
                Filter by User Role
              </Checkbox>
            </div>
            <div
              title="Refresh"
              className="tasksList-refresh-icon-wrapper"
              role="presentation"
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
        <SectionList sections={sections} />
      </div>
    );
  };

  render() {
    const { showModal, isChecked } = this.state;
    const { sections, filteredSections, isLoading, details } = this.props;
    return (
      <div className="proposal-wrapper">
        <Toolbar />
        {this.renderContent(
          isLoading,
          isChecked ? filteredSections : sections,
          details,
          isChecked
        )}
        {showModal ? (
          <AddQuestionModalComponent onClose={this.onClose} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const details = getProposalDetails(state);
  const sections = getSections(state);
  const filteredSections = getFilteredSections(state);
  const isLoading = isProposalLoading(state);
  const isQuestionLoading = isSetQuestionLoading(state);
  const hasQuestionError = setQuestionError(state);
  const setQuestion = setQuestionData(state);
  return {
    details,
    sections,
    filteredSections,
    isLoading,
    setQuestion,
    isQuestionLoading,
    hasQuestionError
  };
};

export default connect(mapStateToProps, { getProposalInfo: getProposal })(
  Proposal
);
