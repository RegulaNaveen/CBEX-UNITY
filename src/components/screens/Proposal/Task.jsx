// @flow
import React, { Component } from 'react';
import arrowUpIcon from '../../../../img/arrow-right.svg';
import arrowDownIcon from '../../../../img/arrow-down.svg';
import checkIcon from '../../../../img/check.svg';
import editIcon from '../../../../img/edit.svg';
import { getRandomColor } from '../../../utils/colors';

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
      event.preventDefault();
      this.handleCollapse();
    }
  };

  render() {
    const { collapsed } = this.state;
    const { data, complete, title, incomplete } = this.props;
    return (
      <div
        className={complete ? 'task-wrapper complete' : 'task-wrapper'}
        onClick={this.handleCollapse}
        onKeyDown={this.handleKeyPress}
        role="button"
        tabIndex={-1}
      >
        <button
          id="arrow-icon"
          className="task-icon"
          onClick={this.handleCollapse}
          onKeyDown={this.handleKeyPress}
          type="button"
          tabIndex={0}
        >
          <img
            src={collapsed ? arrowDownIcon : arrowUpIcon}
            alt="question arrow"
          />
        </button>
        {!collapsed ? (
          <div className="task-title-wrapper">
            <p id="task-title" className="task-title">
              {title}
            </p>
            {complete ? (
              <div id="complete-status" className="task-status-wrapper">
                <img
                  src={checkIcon}
                  alt="check task"
                  className="task-status-checkmark"
                />
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
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-answer">
                <p>Answer</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-owner">
                <p>Owner</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-due-date">
                <p>Due Date</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
              <div className="task-subtitle task-subtitle-completion-date">
                <p>Date Completed</p>
                {/* TODO: Add filter feature */}
                {/* <div className="filter-icon">↑</div> */}
              </div>
            </div>
            {data &&
              data.map(item => (
                <div key={item.id} className="task-table-row">
                  {item.complete && (
                    <img
                      src={checkIcon}
                      alt="check task"
                      className="task-table-row-checkmark icon-highlight"
                    />
                  )}
                  <p className="task-table-row-question">{item.question}</p>
                  <div className="task-table-row-answer">{item.answer}</div>
                  <div className="task-table-row-owner">
                    {item.owner.map(owner => (
                      <p
                        key={owner}
                        className="task-table-row-owner-icon"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {owner.charAt(0).toUpperCase()}
                      </p>
                    ))}
                  </div>
                  <p className="task-table-row-due-date">{item.dueDate}</p>
                  <p className="task-table-row-completion-date">
                    {item.completionDate}
                  </p>
                  <img
                    src={editIcon}
                    alt="edit"
                    className="task-table-row-edit"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Task;
