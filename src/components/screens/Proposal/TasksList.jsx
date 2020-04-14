// @flow
import React, { PureComponent } from 'react';
import Task from './Task';
import { Add } from '../../svg';
import ModalProposal from './ModalProposal';

type Props = {
  tasks: Array<Object>
};

type State = {
  showModal: boolean
};

class TasksList extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // TODO: Create and then use the action to handle modal
      this.handleModal();
    }
  };

  handleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  render() {
    const { tasks } = this.props;
    const { showModal } = this.state;
    return (
      <div className="tasksList-wrapper">
        <div className="tasksList-title-wrapper">
          <p className="tasksList-title">Questions</p>
          <div
            className="tasksList-add-icon-wrapper"
            role="presentation"
            onClick={this.handleModal}
          >
            <Add className="tasksList-add-icon" />
          </div>
        </div>
        {tasks.map(task => {
          const { complete, data, title, incomplete } = task;
          return (
            <Task
              data={data}
              title={title}
              isComplete={complete}
              uncompletedQuestions={incomplete}
              key={title}
            />
          );
        })}
        <ModalProposal showModal={showModal} />
      </div>
    );
  }
}

export default TasksList;
