// @flow
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { getProposal } from '../../../actions/proposal-actions';
import {
  getQuestions,
  isProposalLoading,
  sortQuestions
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
  questions: Map,
  isLoading: boolean,
  getProposalInfo: Function,
  sortedQuestions: Map
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

  onClose = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  renderContent = (
    isLoading: boolean,
    questions: Map,
    sortedQuestions: Map,
    data: Object
  ) => {
    if (!isLoading && questions && sortedQuestions) {
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
          <SectionList tasks={questions} tasksQuestions={sortedQuestions} />
        </div>
      );
    }

    return (
      <div className="proposal-loader">
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
      </div>
    );
  };

  render() {
    const { showModal, data } = this.state;
    const { questions, isLoading, sortedQuestions } = this.props;

    return (
      <div className="proposal-wrapper">
        <Toolbar />
        {this.renderContent(isLoading, questions, sortedQuestions, data)}
        {showModal ? (
          <AddQuestionModalComponent onClose={this.onClose} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const questions = getQuestions(state);
  const isLoading = isProposalLoading(state);
  const sortedQuestions = sortQuestions(state);
  return { questions, isLoading, sortedQuestions };
};

export default connect(mapStateToProps, { getProposalInfo: getProposal })(
  Proposal
);
