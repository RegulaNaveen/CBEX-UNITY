// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import FolderOpen from 'apollo-react-icons/FolderOpen';
import { getSelectedSection, selectNotes } from '../../redux/selectors';
import chevronRight from '../../../img/chevron-right.svg';
import chevronDown from '../../../img/chevron-down.svg';
import Question from './Question';

import { onHandleOpenClose } from '../../redux/actions/sidebar-actions';

type State = {
  isCollapsed: boolean
};

type Props = {
  questions: Map,
  title: string,
  selectedSection: string,
  isCheckedAll: boolean,
  setQuestionToDisplayHistory: (answer: string) => void,
  handleOpenClose: () => void,
  notes: Map,
  setTabFromQuestionNotes: (
    tabIndex: number,
    title: String,
    isHighlighted: boolean
  ) => void,
  onAddQuestion: (title: string) => void
};

class CollapsibleList extends Component<Props, State> {
  taskRef: any;

  constructor(props: Object) {
    super(props);

    this.taskRef = React.createRef();

    this.state = {
      isCollapsed: false
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedSection, isCheckedAll } = this.props;
    const { id } = this.taskRef.current;

    if (prevProps.selectedSection !== selectedSection)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isCollapsed: id === selectedSection });

    if (prevProps.isCheckedAll !== isCheckedAll)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isCollapsed: !!isCheckedAll });
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

  createId = () => {
    const { title } = this.props;

    const id = title
      .toLocaleLowerCase()
      .split(' ')
      .join('-');

    return id;
  };

  showNotesCount = (title) =>{
    const {notes, handleOpenClose, setTabFromQuestionNotes} = this.props;
    if(notes && notes && notes.size && notes.size > 0 ){
    const count = notes.filter(note=> note.getIn(['section', 'sectionName'], '') == title);
    if(count.size > 0){
      return(
        <span
          style={{
            paddingLeft: 10,
            fontSize: 12,
            verticalAlign: 'top'
          }}
        >
          <Link
            onClick={e => {
              e.stopPropagation();
              handleOpenClose(true);
              setTabFromQuestionNotes(1, title, true);
            }}
            size="small"
          >
            <FolderOpen fontSize="extraSmall" />
            <span style={{ verticalAlign: 'top' }}>
              {' '}
              Notes ({count.size})
            </span>
          </Link>
        </span>
      )
    }else (null)
    } else (null)
  }

  render() {
    const { isCollapsed } = this.state;
    const { notes, onAddQuestion } = this.props;
    const {
      questions,
      title,
      setQuestionToDisplayHistory,
      handleOpenClose,
      setTabFromQuestionNotes
    } = this.props;
    return (
      <div className="task-wrapper" ref={this.taskRef} id={this.createId()}>
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
                <p>
                  {title}
                  {this.showNotesCount(title)}
                </p>
              </div>
              <div className="task-subtitle task-subtitle-answer">
                <p>Answer</p>
              </div>
              <div className="task-subtitle task-subtitle-completion-date">
                <p>Date Completed</p>
              </div>
            </div>

            {questions.valueSeq().map(questionConfig => {
              const visible = questionConfig.get('visible');
              return (
                (visible || typeof visible === 'undefined') && (
                  <Question
                    key={questionConfig.get('questionId')}
                    questionId={questionConfig.get('questionId')}
                    proposalId={questionConfig.get('proposalId')}
                    answers={questionConfig.get('answers')}
                    questionText={questionConfig.get('questionText')}
                    answerConfiguration={questionConfig.get(
                      'answerConfiguration'
                    )}
                    sectionName={title}
                    setQuestionToDisplayHistory={setQuestionToDisplayHistory}
                  />
                )
              );
            })}
            <div className="task-table-row">
              <Link onClick={() => onAddQuestion(title)} size="small">
                <Plus fontSize="extraSmall" />
                <span style={{ verticalAlign: 'top' }}> Add New Question</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const selectedSection = getSelectedSection(state);
  const notes = selectNotes(state);
  return { selectedSection, notes };
};

export default connect(mapStateToProps, { handleOpenClose: onHandleOpenClose })(
  CollapsibleList
);
