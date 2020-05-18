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
import AddQuestionModal from './AddQuestionModal';

type State = {
  showModal: boolean,
  data: Object,
  items: Array<Object>,
  teams: Array<Object>
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
      },
      items: ['item 1', 'item 2', 'item 3'],
      teams: [
        {
          id: 0,
          name: 'Business Analyst Business'
        },
        {
          id: 1,
          name: 'Account Executive'
        },
        {
          id: 2,
          name: 'Business Analyst'
        },
        {
          id: 3,
          name: 'Account Executive'
        }
      ]
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

  onSave = () => {
    // TODO: Save new question functionality
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
    const { showModal, data, items, teams } = this.state;
    const { questions, isLoading, sortedQuestions } = this.props;

    return (
      <div className="proposal-wrapper">
        <Toolbar />
        {this.renderContent(isLoading, questions, sortedQuestions, data)}
        {showModal ? (
          <AddQuestionModal
            onClose={this.onClose}
            onSave={this.onSave}
            items={items}
            teams={teams}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const questions = getQuestions(state);
  const isLoading = isProposalLoading(state);
  const sortedQuestions = sortQuestions(state);
  console.log(sortedQuestions);

  return { questions, isLoading, sortedQuestions };
};

export default connect(mapStateToProps, { getProposalInfo: getProposal })(
  Proposal
);
