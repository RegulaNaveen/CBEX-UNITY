// @flow
import React, { Component } from 'react';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { getProposal } from '../../../actions/proposal-actions';
import { getQuestions } from '../../../selectors';
import ProposalInfo from './ProposalInfo';
import TasksList from './TasksList';
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
  getProposalInfo: Function
};

class Proposal extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      showModal: true,
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
      items: [
        {
          id: 0,
          title: 'Item 1',
          selected: false,
          key: 'Item'
        },
        {
          id: 1,
          title: 'Item 2',
          selected: false,
          key: 'Item'
        },
        {
          id: 2,
          title: 'Item 3',
          selected: false,
          key: 'Item'
        },
        {
          id: 3,
          title: 'Item 4',
          selected: false,
          key: 'Item'
        }
      ],
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

  render() {
    const { showModal, data, items, teams } = this.state;
    const { questions } = this.props;
    return (
      <div className="proposal-wrapper">
        <Toolbar />
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
        <TasksList tasks={questions} />
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
  return { questions };
};

export default connect(mapStateToProps, { getProposalInfo: getProposal })(
  Proposal
);
