// @flow
import React, { Component } from 'react';

type State = {
  collapsed: boolean
};

type Props = {
  data: Array<Object>,
  complete: boolean,
  title: string,
  incomplete: number
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
    const { data, complete, title, incomplete } = this.props;
    return (
      <div className={complete ? 'task-wrapper complete' : 'task-wrapper'}>
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
            <p className="task-title">{title}</p>
            {complete ? (
              <div className="task-status-wrapper">
                <div className="task-status-checkmark">✓</div>
                <p className="task-status-description">Complete</p>
              </div>
            ) : (
              <div className="task-status-wrapper">
                <p className="task-status-description">
                  {`${incomplete.toString()} Incomplete`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="task-table-wrapper">
            <div className="task-table-headers">
              <div className="task-title">
                <p>{title}</p>
                <div className="filter-icon">↑</div>
              </div>
              <div className="task-subtitle task-subtitle-answer">
                <p>Answer</p>
                <div className="filter-icon">↑</div>
              </div>
              <div className="task-subtitle task-subtitle-owner">
                <p>Owner</p>
                <div className="filter-icon">↑</div>
              </div>
              <div className="task-subtitle task-subtitle-due-date">
                <p>Due Date</p>
                <div className="filter-icon">↑</div>
              </div>
              <div className="task-subtitle task-subtitle-completion-date">
                <p>Date Completed</p>
                <div className="filter-icon">↑</div>
              </div>
            </div>
            {data &&
              data.map(item => (
                <div key={item.id} className="task-table-row">
                  {item.complete ? (
                    <div className="task-table-row-checkmark icon-highlight">
                      ✓
                    </div>
                  ) : null}
                  <p className="task-table-row-question">{item.question}</p>
                  <div className="task-table-row-answer">{item.answer}</div>
                  <div className="task-table-row-owner">
                    {item.owner.map(owner => (
                      <p key={owner} className="task-table-row-owner-icon">
                        {owner.charAt(0).toUpperCase()}
                      </p>
                    ))}
                  </div>
                  <p className="task-table-row-due-date">{item.dueDate}</p>
                  <p className="task-table-row-completion-date">
                    {item.completionDate}
                  </p>
                  <div className="task-table-row-edit">✏</div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Task;
