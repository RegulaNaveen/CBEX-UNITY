/* eslint-disable react/prop-types */
// @flow
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import FolderOpen from 'apollo-react-icons/FolderOpen';
import Highlighter from 'react-highlight-words';
import {
  getSelectedSection,
  selectNotes,
  getProposalDetails,
  getSelectedBid
} from '../../redux/selectors';
import chevronRight from '../../../img/chevron-right.svg';
import chevronDown from '../../../img/chevron-down.svg';
import MatomoHOC from '../HOC/MatomoHOC';
import {
  onHandleOpenClose,
  handleSelectedSection
} from '../../redux/actions/sidebar-actions';
import lazyWithRetry from '../../utils/lazy';
import {
  selectAutoNavigatedToCurrentResult,
  selectCurrentSearchResult,
  selectQuery
} from '../../redux/selectors/search';
import { autoNavigationCompletedAction } from '../../redux/actions/search-actions';

const CollapsibleQuestionMapping = React.lazy(() =>
  lazyWithRetry(() =>
    import(
      /* webpackChunkName: "collapsibleQuestionMapping" */ './CollapsibleQuestionMapping'
    )
  )
);
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
  changeSelectedSection: () => void,
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
  milestone: any,
  selectedBid: Map,
  isNotepadOpen: boolean,
  listIndex: number,
  query: string
};

class CollapsibleList extends Component<Props, State> {
  taskRef: any;

  constructor(props: Object) {
    super(props);
    this.taskRef = React.createRef();
    this.collapseTriggerRef = React.createRef(null);
    this.titleRef = React.createRef(null);
    this.state = { isCollapsed: false };
  }

  componentDidMount() {
    const { isCheckedAll, isFirstSection } = this.props;
    const enableFirstExpand = window.localStorage.getItem('enableFirstExpand');
    let setIsCollapsed;
    if (enableFirstExpand === 'true') {
      setIsCollapsed = { isCollapsed: !!isFirstSection || !!isCheckedAll };
      window.localStorage.setItem('enableFirstExpand', 'false');
    } else setIsCollapsed = { isCollapsed: !!isCheckedAll };

    setTimeout(() => this.setState(setIsCollapsed), 0);
    document.addEventListener(
      'keydown',
      this.keyboardShortcutListener.bind(this)
    );
  }

  componentDidUpdate(prevProps) {
    const {
      selectedSection,
      isCheckedAll,
      title,
      currentSearchResult,
      questions,
      autoNavigationDone,
      autoNavigatedToCurrentResult
    } = this.props;
    const { id } = this.taskRef.current;

    let shouldBeCollapsed = this.state.isCollapsed;

    if (
      prevProps.selectedSection !== selectedSection &&
      id === selectedSection
    ) {
      shouldBeCollapsed = true;
    }

    if (prevProps.isCheckedAll !== isCheckedAll) {
      shouldBeCollapsed = !!isCheckedAll;
    }

    if (
      currentSearchResult !== null &&
      this.titleRef.current !== null &&
      !autoNavigatedToCurrentResult
    ) {
      const questionIds = questions.toArray().map(question => question[0]);
      if (currentSearchResult.searchIndex === title) {
        // allow other collapsibleList to collapse before scrollIntoView
        setTimeout(() => {
          this.titleRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          autoNavigationDone();
        }, 500);
      } else if (questionIds.includes(currentSearchResult.searchIndex)) {
        shouldBeCollapsed = true;
      } else {
        shouldBeCollapsed = false;
      }
    }

    if (isCheckedAll) {
      shouldBeCollapsed = true;
    }

    if (this.state.isCollapsed !== shouldBeCollapsed) {
      // eslint-disable-next-line react/no-did-update-set-state
      setTimeout(() => this.setState({ isCollapsed: shouldBeCollapsed }), 0);
    }
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.keyboardShortcutListener.bind(this)
    );
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    const { title, selectedSection, changeSelectedSection } = this.props;
    this.trackMatomoEventBladeToggle(!isCollapsed);
    const titleId = title
      .toLocaleLowerCase()
      .split(' ')
      .join('-');
    if (titleId === selectedSection) {
      changeSelectedSection(null);
    }
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
    return title
      ?.toLocaleLowerCase()
      .split(' ')
      .join('-');
  };

  showNotesCount = title => {
    const { notes, handleOpenClose, setTabFromQuestionNotes } = this.props;
    if (notes && notes.size && notes.size > 0) {
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

  keyboardShortcutListener = e => {
    const { listIndex, questionsRef } = this.props;
    const altKeyPressed = e.altKey;
    if (altKeyPressed && String(e.key).toLowerCase() === 'q') {
      if (this.taskRef.current.contains(document.activeElement)) {
        this.collapseTriggerRef.current.focus();
      } else if (!questionsRef.current.contains(document.activeElement)) {
        if (listIndex === 0) {
          this.collapseTriggerRef.current.focus();
        }
      }
    }
  };

  render() {
    const { isCollapsed } = this.state;
    const {
      questions,
      title,
      milestone,
      setQuestionToDisplayHistory,
      selectedBid,
      isNotepadOpen,
      onAddQuestion,
      query,
      currentSearchResult
    } = this.props;
    return (
      <div
        className="task-wrapper"
        ref={this.taskRef}
        id={this.createId()}
        data-testid="collapsible-list"
      >
        {/* Expand Arrow Icon */}
        <button
          id={`arrow-icon-${this.createId()}`}
          className="task-icon-wrapper"
          onClick={this.handleCollapse}
          onKeyPress={this.handleKeyPress}
          type="button"
          tabIndex={0}
          ref={this.collapseTriggerRef}
        >
          <img
            className="task-icon"
            src={isCollapsed ? chevronDown : chevronRight}
            alt="question arrow"
          />
        </button>

        {!isCollapsed ? (
          <div
            className="task-title-wrapper collapsed"
            role="button"
            onClick={this.handleCollapse}
            onKeyPress={this.handleKeyPress}
            tabIndex={-1}
          >
            <p className="task-title" ref={this.titleRef}>
              <Highlighter
                searchWords={[
                  `${
                    currentSearchResult !== null &&
                    currentSearchResult.searchIndex === title &&
                    query !== null
                      ? query
                      : ''
                  }`
                ]}
                autoEscape={true}
                textToHighlight={title}
                highlightClassName="search-highlight"
              />
            </p>
          </div>
        ) : (
          <div className="task-table-wrapper">
            {/* Section Header */}
            <div
              className="task-table-headers"
              role="button"
              onClick={this.handleCollapse}
              onKeyPress={this.handleKeyPress}
              tabIndex={-1}
            >
              <div className="task-title" ref={this.titleRef}>
                <p>
                  <Highlighter
                    searchWords={[
                      `${
                        currentSearchResult !== null &&
                        currentSearchResult.searchIndex === title &&
                        query !== null
                          ? query
                          : ''
                      }`
                    ]}
                    autoEscape={true}
                    textToHighlight={title}
                    highlightClassName="search-highlight"
                  />
                  {this.showNotesCount(title)}
                </p>
              </div>
            </div>

            {/* Question List */}
            <Suspense fallback={<div>Loading...</div>}>
              <CollapsibleQuestionMapping
                questions={questions}
                milestone={milestone}
                title={title}
                setQuestionToDisplayHistory={setQuestionToDisplayHistory}
                isNotepadOpen={isNotepadOpen}
              />
            </Suspense>

            {/* Add New Question Button */}
            {selectedBid.get('isCurrent') && (
              <div className="add-question">
                <Link
                  style={{ borderBottom: 'none' }}
                  onClick={() => onAddQuestion(title)}
                  size="small"
                >
                  <Plus fontSize="extraSmall" />
                  <span style={{ verticalAlign: 'top' }}>
                    {' '}
                    Add New Question
                  </span>
                </Link>
              </div>
            )}
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
  return {
    selectedSection,
    notes,
    proposalDetail,
    selectedBid: getSelectedBid(state),
    query: selectQuery(state),
    currentSearchResult: selectCurrentSearchResult(state),
    autoNavigatedToCurrentResult: selectAutoNavigatedToCurrentResult(state)
  };
};

const mapDispatchToProps = {
  handleOpenClose: onHandleOpenClose,
  changeSelectedSection: handleSelectedSection,
  autoNavigationDone: () => dispatch =>
    dispatch(autoNavigationCompletedAction())
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatomoHOC(CollapsibleList));
