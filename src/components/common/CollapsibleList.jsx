// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';
import Link from 'apollo-react/components/Link';
import Grid from 'apollo-react/components/Grid';
import Plus from 'apollo-react-icons/Plus';
import Box from 'apollo-react/components/Box';
import FolderOpen from 'apollo-react-icons/FolderOpen';
import {
  getSelectedSection,
  selectNotes,
  getProposalDetails
} from '../../redux/selectors';
import chevronRight from '../../../img/chevron-right.svg';
import chevronDown from '../../../img/chevron-down.svg';
import Question from './Question';
import MatomoHOC from '../HOC/MatomoHOC';

import { onHandleOpenClose, handleSelectedSection } from '../../redux/actions/sidebar-actions';

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
  changeSelectedSection:() => void,
  notes: Map,
  setTabFromQuestionNotes: (
    tabIndex: number,
    title: String,
    isHighlighted: boolean
  ) => void,
  onAddQuestion: (title: string) => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  proposalDetail: any,
  ismilestoneavailable?: any
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

  componentDidMount() {
    const { isCheckedAll } = this.props;
    this.setState({ isCollapsed: !!isCheckedAll });
  }

  componentDidUpdate(prevProps) {
    const { selectedSection, isCheckedAll } = this.props;
    const { id } = this.taskRef.current;

    // expand a section only if it's selected from sidebar
    if (prevProps.selectedSection !== selectedSection && id === selectedSection)
      // eslint-disable-next-line react/no-did-update-set-state
      setTimeout(
        () => this.setState({ isCollapsed: true }),
        0
      );

    if (prevProps.isCheckedAll !== isCheckedAll)
      // eslint-disable-next-line react/no-did-update-set-state
      setTimeout(() => this.setState({ isCollapsed: !!isCheckedAll }), 0);
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
    this.trackMatomoEventBladeToggle(!isCollapsed);
    const titleId = this.props.title.toLocaleLowerCase().split(' ').join('-');
    if(titleId === this.props.selectedSection){
      this.props.changeSelectedSection(null)
    }
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

  showNotesCount = title => {
    const { notes, handleOpenClose, setTabFromQuestionNotes } = this.props;
    if (notes && notes && notes.size && notes.size > 0) {
      const count = notes.filter(
        note => note.getIn(['section', 'sectionName'], '') === title
      );
      if (count.size > 0) {
        return (
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
              style={{ borderBottom: 'none' }}
              size="small"
            >
              <FolderOpen fontSize="extraSmall" />
              <span style={{ verticalAlign: 'top' }}>
                {' '}
                Notes ({count.size})
              </span>
            </Link>
          </span>
        );
      }
      return null;
    }
    return null;
  };

  trackMatomoEventBladeToggle = action => {
    const openOrclose = action ? 'Open' : 'Close';
    const {
      userActions,
      title,
      proposalDetail,
      eventCategories,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Question Section: ${userActions.click} To ${openOrclose} ${title}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  render() {
    const { isCollapsed } = this.state;
    const { onAddQuestion } = this.props;
    const {
      questions,
      title,
      milestone,
      setQuestionToDisplayHistory
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
            </div>

            <div className="task-table-row">
              <div className="task-subtitle">
                <p>Question</p>
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
                    ismilestoneavailable={milestone}
                    key={questionConfig.get('questionId')}
                    milestone={questionConfig.get('milestone')}
                    questionId={questionConfig.get('questionId')}
                    proposalId={questionConfig.get('proposalId')}
                    answers={questionConfig.get('answers')}
                    questionText={questionConfig.get('questionText')}
                    answerConfiguration={questionConfig.get(
                      'answerConfiguration'
                    )}
                    sfObject={questionConfig.get('sfObject')}
                    sfField={questionConfig.get('sfField')}
                    sectionName={title}
                    setQuestionToDisplayHistory={setQuestionToDisplayHistory}
                    loading={questionConfig.get('loading', false)}
                    questionHint={questionConfig.get('questionHint', '')}
                    roleNames={questionConfig.get('roleNames')}
                    isCustomQuestion={questionConfig.get('isCustomQuestion')}
                    hasDifferentSFanswer={questionConfig.get(
                      'hasDifferentSFanswer'
                    )}
                  />
                )
              );
            })}
            <div className="add-question">
              <Link
                style={{ borderBottom: 'none' }}
                onClick={() => onAddQuestion(title)}
                size="small"
              >
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
  const proposalDetail = getProposalDetails(state);
  return { selectedSection, notes, proposalDetail };
};

const mapDispatchToProps = {
  handleOpenClose: onHandleOpenClose,
  changeSelectedSection: handleSelectedSection
};

export default connect(mapStateToProps, mapDispatchToProps)(MatomoHOC(CollapsibleList));
