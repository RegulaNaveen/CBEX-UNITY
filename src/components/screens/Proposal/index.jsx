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
  isProposalLoading,
  setQuestionData,
  isSetQuestionLoading,
  setQuestionError
} from '../../../selectors';
import ProposalInfo from './ProposalInfo';
import SectionList from './SectionList';
import Toolbar from '../../Toolbar';
import { Add } from '../../svg';
import AddQuestionModalComponent from './AddQuestionModal';

type State = {
  showModal: boolean
};

type Props = {
  match: Match,
  details: Map,
  sections: Map,
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
      showModal: false
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

  renderContent = (
    isLoading: boolean,
    sections: Map,
    details: Object,
    title: string
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
        <ProposalInfo data={details} title={title} />
        <div className="tasksList-title-wrapper">
          <p className="tasksList-title">Questions</p>
          <div
            className="tasksList-add-icon-wrapper"
            role="presentation"
            onClick={this.onClose}
          >
            <Add className="tasksList-add-icon" />
          </div>
        </div>
        <SectionList sections={sections} />
      </div>
    );
  };

  render() {
    const { showModal } = this.state;
    const { sections, isLoading, details } = this.props;
    const title = 'RFP-1028';

    return (
      <div className="proposal-wrapper">
        <Toolbar />
        {this.renderContent(isLoading, sections, details, title)}
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
  const isLoading = isProposalLoading(state);
  const isQuestionLoading = isSetQuestionLoading(state);
  const hasQuestionError = setQuestionError(state);
  const setQuestion = setQuestionData(state);
  return {
    details,
    sections,
    isLoading,
    setQuestion,
    isQuestionLoading,
    hasQuestionError
  };
};

export default connect(mapStateToProps, { getProposalInfo: getProposal })(
  Proposal
);
