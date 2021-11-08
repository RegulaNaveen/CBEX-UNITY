// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Badge from 'apollo-react/components/Badge';
import PlusIcon from 'apollo-react-icons/Plus';
import CardIcon from 'apollo-react-icons/Card';
import SyncIcon from 'apollo-react-icons/Sync';
import Close from 'apollo-react-icons/Close';
import IconButton from 'apollo-react/components/IconButton';
import Typography from 'apollo-react/components/Typography';
import Tooltip from 'apollo-react/components/Tooltip';
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
    const { activeTabIndex } = this.state;
    /**
     * prevent closing sidebar when click event happens inside sidebar
     * since sidebar is fixed positioned and rightmost of viewport
     * we can check for x start positions alone to get workaround on clicking scrollbar area
     */
    if (isOpen) {
      // prevent sidebar from closing while in notepad tab
      if (activeTabIndex === 1) {
        return;
      }
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
    this.trackMatomoEventTabSwitch(activeTabIndex);
  };

  trackMatomoEvent = ({ action }) => {
    const { proposalDetail, trackEvent, eventCategories } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify(proposalDetail)
        }
      ]
    });
  };

  trackMatomoEventScroll = action => {
    const { userActions } = this.props;
    this.trackMatomoEvent({
      action: `Blade: ${userActions.scroll} From Blade To ${action} Section`
    });
  };

  trackMatomoEventSidebarToggle = action => {
    const openOrclose = action ? 'Open' : 'Close';
    const { userActions } = this.props;
    this.trackMatomoEvent({
      action: `Blade: ${userActions.click} On Blade To ${openOrclose} Sidebar`
    });
  };

  trackMatomoEventTabSwitch = index => {
    const screen = index ? 'Notepad' : 'Index';
    const { userActions } = this.props;
    this.trackMatomoEvent({
      action: `Blade: ${userActions.click} On ${screen} Tab`
    });
  };

  trackMatomoEventIconClick = icon => {
    const { userActions } = this.props;
    this.trackMatomoEvent({
      action: `Blade: ${userActions.click} On ${icon} Icon`
    });
  };

  trackMatomoNoteSubmit = (section, note, mode = 'submit') => {
    const { text } = JSON.parse(note).blocks[0];
    const { userActions } = this.props;

    const actionString = section
      ? `Blade: ${userActions[mode]} A Note (${text}) Under Section ${section}`
      : `Blade: ${userActions[mode]} A Note (${text})`;

    this.trackMatomoEvent({
      action: actionString
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
        <Typography variant="body2" style={{ fontWeight: 'inherit' }}>
          Notepad
        </Typography>
      ) : (
        <Badge variant="dot">
          <Typography variant="body2" style={{ fontWeight: 'inherit' }}>
            Notepad
          </Typography>
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
            <div className="titlebar">
              <Typography variant="title1" gutterBottom>
                Controls
              </Typography>
              <IconButton size="small" onClick={this.handleItemsVisibility}>
                <Close fontSize="extraSmall" />
              </IconButton>
            </div>
            <div className="controls-wrapper">
              <Tooltip title="Add New Question" placement="left">
                <PlusIcon
                  style={{
                    backgroundColor: neptunePrimaryDark,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    color: '#fff',
                    padding: 3,
                    margin: 3,
                    cursor: 'pointer'
                  }}
                  onClick={e => {
                    const { onAddQuestion } = this.props;
                    onAddQuestion('');
                    this.trackMatomoEventIconClick('Add New Question');
                    this.handleItemsVisibility(e);
                    AddNewQuestion();
                  }}
                />
              </Tooltip>
              <Tooltip title="Expand All Sections" placement="top">
                <CardIcon
                  style={{
                    color: neptunePrimaryDark,
                    width: 20,
                    height: 20,
                    margin: 3,
                    cursor: 'pointer'
                  }}
                  onClick={e => {
                    this.trackMatomoEventIconClick('Expand All');
                    this.handleItemsVisibility(e);
                    expandAll();
                  }}
                />
              </Tooltip>
              <Tooltip title="Refresh Proposal Sources" placement="right">
                <SyncIcon
                  style={{
                    backgroundColor: neptunePrimaryDark,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    color: '#fff',
                    padding: 3,
                    margin: 3,
                    cursor: 'pointer'
                  }}
                  onClick={e => {
                    this.trackMatomoEventIconClick('Refresh');
                    this.handleItemsVisibility(e);
                    RefreshProposal();
                  }}
                />
              </Tooltip>
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
                trackMatomoNoteSubmit={this.trackMatomoNoteSubmit}
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
