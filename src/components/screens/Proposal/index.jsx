// @flow
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getProposal } from '../../../actions/proposal-actions';
import {
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
  showModal: boolean,
  data: Object
};

type Props = {
  match: Match,
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
      showModal: false,
      data: {
        title: 'RFP-1028',
        accountExecutive: 'Jan Levinson-Gould',
        businessDevelopment: 'Dwight Schrute',
        proposalDirector: 'Michael Scott',
        labs: 'Kevin Malone',
        synopsis: true,
        phase: 2,
        sites: 12,
        countries: ['France', 'UK', 'Italy', 'Spain'],
        indication: 'Myopia'
      }
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

  renderContent = (isLoading: boolean, sections: Map, data: Object) => {
    if (isLoading) {
      return (
        <div className="proposal-loader">
          <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        </div>
      );
    }

    return (
      <div>
        <ProposalInfo data={data} />
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
    const { showModal, data } = this.state;
    const { sections, isLoading } = this.props;

    return (
      <div className="proposal-wrapper">
        <Toolbar />
        {this.renderContent(isLoading, sections, data)}
        {showModal ? (
          <AddQuestionModalComponent onClose={this.onClose} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const sections = getSections(state);
  const isLoading = isProposalLoading(state);
  const isQuestionLoading = isSetQuestionLoading(state);
  const hasQuestionError = setQuestionError(state);
  const setQuestion = setQuestionData(state);
  return {
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
