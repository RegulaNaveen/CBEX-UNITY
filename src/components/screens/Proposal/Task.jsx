// @flow
import React, { Component } from 'react';

type State = {
  collapsed: boolean
};

type Props = {
  data?: Array<Object>
};

class Task extends Component<Props, State> {
  static defaultProps = {
    data: [
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

  constructor(props: Object) {
    super(props);

    this.state = {
      collapsed: true
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
    const { data } = this.props;
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
            <p className="task-title">Resources</p>
            <div className="task-status-wrapper">
              <p className="task-status-description">8 Incomplete</p>
            </div>
          </div>
        ) : (
          <div className="task-table-wrapper">
            <div className="task-table-headers">
              <p className="task-title">Resources</p>
              <p className="task-subtitle task-subtitle-answer">Answer</p>
              <p className="task-subtitle task-subtitle-owner">Owner</p>
              <p className="task-subtitle task-subtitle-due-date">Due Date</p>
              <p className="task-subtitle task-subtitle-completion-date">
                Date Completed
              </p>
            </div>
            {data &&
              data.map(item => (
                <div className="task-table-row">
                  <div className="task-table-row-checkmark">✓</div>
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

export default Task;
