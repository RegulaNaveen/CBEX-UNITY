// @flow
import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
import TasksList from './TasksList';
import Toolbar from '../../Toolbar';
import { Add } from '../../svg';
import AddQuestionModal from './AddQuestionModal';

type State = {
  showModal: boolean,
  data: Object,
  tasks: Array<Object>,
  items: Array<Object>,
  teams: Array<Object>
};

type Props = {};

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
      tasks: [
        {
          data: [
            {
              id: 1,
              question: 'Question',
              answer: 'Answer',
              owner: ['Owner', 'Pedro'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: true
            },
            {
              id: 2,
              question: 'Question',
              answer: 'Answer',
              owner: ['Awner', 'Homer', 'jesus'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: true
            }
          ],
          complete: false,
          title: 'Resources',
          incomplete: 8
        },
        {
          data: [
            {
              id: 1,
              question: 'Question',
              answer: 'Answer',
              owner: ['Owner', 'Pedro'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: false
            },
            {
              id: 2,
              question: 'Question',
              answer: 'Answer',
              owner: ['Awner', 'Homer', 'jesus'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: false
            },
            {
              id: 3,
              question: 'Question',
              answer: 'Answer',
              owner: ['Awner', 'Homer', 'jesus'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: true
            },
            {
              id: 4,
              question: 'Question',
              answer: 'Answer',
              owner: ['Awner', 'Homer', 'jesus'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: true
            }
          ],
          complete: false,
          title: 'Labs',
          incomplete: 2
        },
        {
          data: [
            {
              id: 1,
              question: 'Question',
              answer: 'Answer',
              owner: ['Owner', 'Pedro'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: true
            },
            {
              id: 2,
              question: 'Question',
              answer: 'Answer',
              owner: ['Awner', 'Homer', 'jesus'],
              dueDate: '02-Apr-2020',
              completionDate: '02-Apr-2020',
              complete: true
            }
          ],
          complete: true,
          title: 'Medical',
          incomplete: 0
        }
      ],
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

  onClose = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  onSave = () => {
    // TODO: Save new question functionality
  };

  render() {
    const { showModal, data, tasks, items, teams } = this.state;

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
        <TasksList tasks={tasks} />
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

export default Proposal;
