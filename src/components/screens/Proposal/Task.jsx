// @flow
import React, { Component } from 'react';

type State = {
  collapsed: boolean
};

type Props = {
  testArray?: Array<Object>
};

class Task extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  handleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleCollapse();
    }
  };

  render() {
    const { collapsed } = this.state;
    const { testArray } = this.props;
    return (
      <div className="task-wrapper">
        <div
          className="task-icon"
          onClick={this.handleCollapse}
          onKeyDown={this.handleKeyPress}
          role="button"
          tabIndex={0}
        >
          {'>'}
        </div>
        {!collapsed ? (
          <div className="task-title-wrapper">
            <div className="task-title">Resources</div>
            <div className="task-status-wrapper">
              <div className="task-status-description">8 Incomplete</div>
            </div>
          </div>
        ) : (
          <div className="task-table-wrapper">
            <div className="task-table-headers">
              <div className="task-title">Resources</div>
              <div className="task-subtitle task-subtitle-answer">Answer</div>
              <div className="task-subtitle task-subtitle-owner">Owner</div>
              <div className="task-subtitle task-subtitle-due-date">
                Due Date
              </div>
              <div className="task-subtitle task-subtitle-completion-date">
                Date Completed
              </div>
            </div>
            {testArray.map(item => (
              <div className="task-table-row">
                <div className="task-table-row-question">{item.question}</div>
                <div className="task-table-row-answer">{item.answer}</div>
                <div className="task-table-row-owner">{item.owner}</div>
                <div className="task-table-row-due-date">{item.dueDate}</div>
                <div className="task-table-row-completion-date">
                  {item.completionDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Task.defaultProps = {
  testArray: [
    {
      question: 'Question',
      answer: 'Answer',
      owner: 'Owner',
      dueDate: '02-Apr-2020',
      completionDate: '02-Apr-2020'
    },
    {
      question: 'Question',
      answer: 'Answer',
      owner: 'Owner',
      dueDate: '02-Apr-2020',
      completionDate: '02-Apr-2020'
    }
  ]
};

export default Task;
