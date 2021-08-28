// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Badge from 'apollo-react/components/Badge';
import FixedBar from 'apollo-react/components/FixedBar';
import PlusIcon from 'apollo-react-icons/Plus';
import CardIcon from 'apollo-react-icons/Card';
import SyncIcon from 'apollo-react-icons/Sync';
import Button from 'apollo-react/components/Button';
import Typography from 'apollo-react/components/Typography';
import { neptunePrimaryDark } from 'apollo-react/colors';

import Notepad from './Notepad';
import chevronRight from '../../../img/chevron-right.svg';
import {
  handleSelectedSection,
  onHandleOpenClose
} from '../../redux/actions/sidebar-actions';
import {
  getIsOpen,
  selectNotes,
  getProposalDetails
} from '../../redux/selectors';
import { changeMode } from '../../redux/actions/notepad-actions';
import { REDUX_TYPES } from '../../constants';

import MatomoHOC from '../HOC/MatomoHOC';

type Props = {
  sections: Map,
  notes: [],
  setSelectedSection: (selectedItem: string) => void,
  handleOpenClose: (isOpen: boolean) => void,
  isOpen: boolean,
  id: string,
  change: Function,
  currentTab: mixed,
  setTabFromQuestionNotes: Function,
  selectedtitle: string,
  expandAll: () => void,
  AddNewQuestion: () => void,
  RefreshProposal: () => void,
  eventCategories: any,
  userActions: any,
  trackEvent: any,
  proposalDetail: any
};

type State = {
  selectedSection: string
};

const { MODE_DEFAULT } = REDUX_TYPES.NOTEPAD;

class Sidebar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedSection: '',
      activeTabIndex: 0
    };
    this.sidebarRef = React.createRef(null);
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (prevProps.currentTab !== this.state.activeTabIndex) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ activeTabIndex: prevProps.currentTab });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = e => {
    const { isOpen } = this.props;
    /**
     * prevent closing sidebar when click event happens inside sidebar
     * since sidebar is fixed positioned and rightmost of viewport
     * we can check for x start positions alone to get workaround on clicking scrollbar area
     */
    if (isOpen) {
      if (this.sidebarRef && this.sidebarRef.current) {
        const sidebarPos = this.sidebarRef.current.getBoundingClientRect();
        if (
          e.clientX >= sidebarPos.left &&
          e.clientY >= sidebarPos.top &&
          e.clientY <= sidebarPos.bottom
        ) {
          return;
        }
      }
      const { handleOpenClose } = this.props;
      this.setState({ activeTabIndex: 0 });
      handleOpenClose(false);
    }
  };

  handleItemsVisibility = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();

    const { isOpen, handleOpenClose, setTabFromQuestionNotes } = this.props;
    this.setState({ activeTabIndex: 0 });
    setTabFromQuestionNotes(0, '', true);
    handleOpenClose(!isOpen);
    if (isOpen) this.setState({ activeTabIndex: 0 });
    this.trackMatomoEventSidebarToggle(!isOpen);
  };

  scrollToSelectedElement = (event: SyntheticInputEvent<EventTarget>) => {
    event.stopPropagation();

    const {
      target: { textContent, id }
    } = event;

    const { setSelectedSection, handleOpenClose } = this.props;

    const itemToScroll = textContent
      .toLocaleLowerCase()
      .split(' ')
      .join('-');

    const item: ?HTMLElement = document.getElementById(itemToScroll);

    if (item) setTimeout(() => window.scrollTo(0, item.offsetTop - 20), 100);

    handleOpenClose(false);
    setSelectedSection(itemToScroll);
    this.trackMatomoEventScroll(itemToScroll);

    this.setState({ selectedSection: id, activeTabIndex: 0 });
  };

  handleChangeTab = (event, activeTabIndex) => {
    const { setTabFromQuestionNotes, selectedtitle } = this.props;
    if (activeTabIndex === 1) {
      const { change } = this.props;
      // always open notepad tab in default mode
      change(MODE_DEFAULT);
    }
    this.setState({ activeTabIndex });
    setTabFromQuestionNotes(activeTabIndex, selectedtitle || '', false);
  };

  trackMatomoEventScroll = action => {
    const {
      userActions,
      eventCategories,
      proposalDetail,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Blade: ${userActions.scroll} From Blade To ${action} Section`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  trackMatomoEventSidebarToggle = action => {
    const openOrclose = action ? 'Open' : 'Close';
    const {
      userActions,
      eventCategories,
      proposalDetail,
      trackEvent
    } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Blade: ${userActions.click} On Blade To ${openOrclose} Sidebar`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  render() {
    const {
      sections,
      isOpen,
      notes,
      id,
      selectedtitle,
      expandAll,
      AddNewQuestion,
      RefreshProposal
    } = this.props;
    const { selectedSection, activeTabIndex } = this.state;

    const NotepadTab = () =>
      notes.size === 0 ? (
        <Typography variant="body2">Notepad</Typography>
      ) : (
        <Badge variant="dot">
          <Typography variant="body2">Notepad</Typography>
        </Badge>
      );

    return (
      <div
        id="sidebar"
        ref={this.sidebarRef}
        className={classNames({ 'is-open': isOpen })}
      >
        <div className="sidebar-content">
          <button onClick={this.handleItemsVisibility} type="button">
            <img
              className="task-icon"
              src={chevronRight}
              alt="question arrow"
            />
          </button>
          <div>
            <div style={{ background: 'none' }}>
              <FixedBar
                title="Controls"
                size="small"
                onClose={this.handleItemsVisibility}
              />
            </div>
            <div className="controls-wrapper">
              <Button
                icon={
                  <PlusIcon
                    style={{
                      backgroundColor: neptunePrimaryDark,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      color: '#fff',
                      padding: 3
                    }}
                  />
                }
                fullWidth
                style={{ justifyContent: 'left', paddingLeft: '40px' }}
                onClick={e => {
                  this.handleItemsVisibility(e);
                  AddNewQuestion();
                }}
                size="small"
              >
                Add New Questions
              </Button>
              <Button
                icon={
                  <CardIcon
                    style={{
                      color: neptunePrimaryDark,
                      width: 20,
                      height: 20
                    }}
                  />
                }
                fullWidth
                style={{ justifyContent: 'left', paddingLeft: '40px' }}
                onClick={e => {
                  this.handleItemsVisibility(e);
                  expandAll();
                }}
                size="small"
              >
                Expand All Sections
              </Button>
              <Button
                icon={
                  <SyncIcon
                    style={{
                      backgroundColor: neptunePrimaryDark,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      color: '#fff',
                      padding: 3
                    }}
                  />
                }
                fullWidth
                style={{ justifyContent: 'left', paddingLeft: '40px' }}
                onClick={e => {
                  this.handleItemsVisibility(e);
                  RefreshProposal();
                }}
                size="small"
              >
                Refresh Proposal Sources
              </Button>
            </div>
            <Tabs
              value={activeTabIndex}
              onChange={this.handleChangeTab}
              size="small"
              truncate
            >
              <Tab label="Index" />
              <Tab label={<NotepadTab />} style={{ paddingRight: '8px' }} />
            </Tabs>
            {activeTabIndex === 0 && (
              <div className="sidebar-content-list">
                {sections.valueSeq().map(section => {
                  const sectionName = section.get('sectionName');
                  const questions = section.get('questions');
                  const someQuestionsAreVisible = questions
                    .valueSeq()
                    .map(question => question.get('visible', true))
                    .includes(true);

                  if (someQuestionsAreVisible)
                    return (
                      <p
                        key={sectionName}
                        id={sectionName}
                        className={classNames({
                          'is-selected': selectedSection === sectionName
                        })}
                        role="presentation"
                        onClick={this.scrollToSelectedElement}
                      >
                        {sectionName}
                      </p>
                    );
                  return null;
                })}
              </div>
            )}
            {activeTabIndex === 1 && (
              <Notepad
                sections={sections}
                id={id}
                selectedtitle={selectedtitle || ''}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  isOpen: getIsOpen(state),
  notes: selectNotes(state),
  proposalDetail: getProposalDetails(state)
});

export default connect(mapStateToProps, {
  setSelectedSection: handleSelectedSection,
  handleOpenClose: onHandleOpenClose,
  change: changeMode
})(MatomoHOC(Sidebar));
