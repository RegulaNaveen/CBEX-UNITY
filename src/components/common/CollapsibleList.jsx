// @flow
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import Link from 'apollo-react/components/Link';
import Plus from 'apollo-react-icons/Plus';
import FolderOpen from 'apollo-react-icons/FolderOpen';
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
const CollapsibleQuestionMapping = React.lazy(() =>
  import('./CollapsibleQuestionMapping')
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
  isNotepadOpen: boolean
};

class CollapsibleList extends Component<Props, State> {
  taskRef: any;

  constructor(props: Object) {
    super(props);
    this.taskRef = React.createRef();
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
  }

  componentDidUpdate(prevProps) {
    const { selectedSection, isCheckedAll } = this.props;
    const { id } = this.taskRef.current;

    if (prevProps.selectedSection !== selectedSection)
      // eslint-disable-next-line react/no-did-update-set-state
      setTimeout(
        () => this.setState({ isCollapsed: id === selectedSection }),
        0
      );

    if (prevProps.isCheckedAll !== isCheckedAll)
      // eslint-disable-next-line react/no-did-update-set-state
      setTimeout(() => this.setState({ isCollapsed: !!isCheckedAll }), 0);
  }

  handleCollapse = () => {
    const { isCollapsed } = this.state;
    const { title, selectedSection, changeSelectedSection } = this.props;
    this.setState({ isCollapsed: !isCollapsed });
    this.trackMatomoEventBladeToggle(!isCollapsed);
    const titleId = title
      .toLocaleLowerCase()
      .split(' ')
      .join('-');
    if (titleId === selectedSection) {
      changeSelectedSection(null);
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
    return title
      .toLocaleLowerCase()
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

  render() {
    const { isCollapsed } = this.state;
    const { onAddQuestion } = this.props;
    const {
      questions,
      title,
      milestone,
      setQuestionToDisplayHistory,
      selectedBid,
      isNotepadOpen
    } = this.props;
    return (
      <div className="task-wrapper" ref={this.taskRef} id={this.createId()}>
        {/* Expand Arrow Icon */}
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
            className="task-title-wrapper collapsed"
            role="button"
            onClick={this.handleCollapse}
            onKeyPress={this.handleKeyPress}
            tabIndex={-1}
          >
            <p className="task-title">{title}</p>
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
              <div className="task-title">
                <p>
                  {title}
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
    selectedBid: getSelectedBid(state)
  };
};

const mapDispatchToProps = {
  handleOpenClose: onHandleOpenClose,
  changeSelectedSection: handleSelectedSection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatomoHOC(CollapsibleList));
