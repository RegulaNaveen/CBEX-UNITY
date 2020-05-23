// @flow
import React, { Component } from 'react';
import type { Map } from 'immutable';
import chevronRight from '../../../../img/chevron-right.svg';
import chevronDown from '../../../../img/chevron-down.svg';
import Question from './Question';

type State = {
  isCollapsed: boolean
};

type Props = {
  questions: Map,
  title: string
};

class CollapsibleList extends Component<Props, State> {
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
    const { questions, title } = this.props;
    return (
      <div className="task-wrapper">
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
          <div
            className="task-title-wrapper"
            role="button"
            onClick={this.handleCollapse}
            onKeyPress={this.handleKeyPress}
            tabIndex={-1}
          >
            <p id="task-title" className="task-title">
              {title}
            </p>
          </div>
        ) : (
          <div className="task-table-wrapper">
            <div
              className="task-table-headers"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              tabIndex={-1}
            >
              <div className="task-title">
                <p>{title}</p>
              </div>
              <div className="task-subtitle task-subtitle-answer">
                <p>Answer</p>
              </div>
              <div className="task-subtitle task-subtitle-owner">
                <p>Owner</p>
              </div>
              <div className="task-subtitle task-subtitle-completion-date">
                <p>Date Completed</p>
              </div>
            </div>
            {questions.valueSeq().map(questionConfig => (
              <Question
                key={questionConfig.get('questionId')}
                questionId={questionConfig.get('questionId')}
                proposalId={questionConfig.get('proposalId')}
                answers={questionConfig.get('answers')}
                questionText={questionConfig.get('questionText')}
                answerConfiguration={questionConfig.get('answerConfiguration')}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default CollapsibleList;
