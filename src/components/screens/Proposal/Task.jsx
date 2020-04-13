// @flow
import React, { Component } from 'react';
import chevronRight from '../../../../img/chevron-right.svg';
import chevronDown from '../../../../img/chevron-down.svg';
import { Checkmark, Edit } from '../../svg';
import { getRandomColor } from '../../../utils/colors';

type State = {
  isCollapsed: boolean
};

type Props = {
  data: Array<Object>,
  isComplete: boolean,
  title: string,
  uncompletedQuestions: number
};

class Task extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isCollapsed: false
    };
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleCollapse();
    }
  };

  render() {
    const { isCollapsed } = this.state;
    const { data, isComplete, title, uncompletedQuestions } = this.props;
    return (
      <div
        className={isComplete ? 'task-wrapper complete' : 'task-wrapper'}
        onClick={this.handleCollapse}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex={-1}
      >
        <button
          id="arrow-icon"
          className="task-icon-wrapper"
          onClick={this.handleCollapse}
          onKeyPress={this.handleKeyPress}
          type="button"
          tabIndex={0}
        >
          <img
            className="task-icon"
            src={isCollapsed ? chevronDown : chevronRight}
            alt="question arrow"
          />
        </button>
        {!isCollapsed ? (
          <div className="task-title-wrapper">
            <p id="task-title" className="task-title">
              {title}
            </p>
            {isComplete ? (
              <div id="complete-status" className="task-status-wrapper">
                <Checkmark className="task-status-checkmark" />
                <p className="task-status-description">Complete</p>
              </div>
            ) : (
              <div className="task-status-wrapper">
                <p className="task-status-description">
                  {`${uncompletedQuestions.toString()} Incomplete`}
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
                    <Checkmark className="task-table-row-checkmark icon-highlight" />
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
                  <Edit className="task-table-row-edit icon-highlight" />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Task;
