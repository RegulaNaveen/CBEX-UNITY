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

import chevronRight from '../../../img/chevron-right.svg';
import {
  handleSelectedSection,
  onHandleOpenClose
} from '../../redux/actions/sidebar-actions';
import { getIsOpen, selectNotes } from '../../redux/selectors';
import Notepad from './Notepad';


type Props = {
  sections: Map,
  notes: [],
  setSelectedSection: (selectedItem: string) => void,
  handleOpenClose: (isOpen: boolean) => void,
  isOpen: boolean,
  id: string
};

type State = {
  selectedSection: string
};

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
      handleOpenClose(false);
    }
  };

  handleItemsVisibility = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();

    const { isOpen, handleOpenClose } = this.props;

    handleOpenClose(!isOpen);
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

    this.setState({ selectedSection: id });
  };

  handleChangeTab = (event, activeTabIndex) => {
    this.setState({ activeTabIndex });
  };

  render() {
    const { sections, isOpen, notes, id, expandAll, AddNewQuestion, RefreshProposal } = this.props;
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
              <FixedBar title="Controls" size="small" onClose={this.handleItemsVisibility} />
            </div>
            <Button
              icon={<PlusIcon style={{ backgroundColor: neptunePrimaryDark, width: 20, height: 20, borderRadius: '50%', color: '#fff', padding: 3 }} />}
              fullWidth
              style={{ justifyContent: 'left', paddingLeft: '50px' }}
              onClick={(e)=>{ this.handleItemsVisibility(e); AddNewQuestion()}}
            >Add New Questions</Button>
            <Button
              icon={<CardIcon />}
              fullWidth
              style={{ justifyContent: 'left', paddingLeft: '50px' }}
              onClick={(e)=>{ this.handleItemsVisibility(e); expandAll()}}
            >Expand All Sections</Button>
            <Button
              icon={<SyncIcon style={{ backgroundColor: neptunePrimaryDark, width: 20, height: 20, borderRadius: '50%', color: '#fff', padding: 3 }} />}
              fullWidth
              style={{ justifyContent: 'left', paddingLeft: '50px' }}
              onClick={(e)=>{ this.handleItemsVisibility(e); RefreshProposal()}}
            >Refresh Proposal Sources</Button>
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
                    .map(question => question.get('visible'))
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
            {activeTabIndex === 1 && <Notepad sections={sections} id={id} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  isOpen: getIsOpen(state),
  notes: selectNotes(state)
});

export default connect(mapStateToProps, {
  setSelectedSection: handleSelectedSection,
  handleOpenClose: onHandleOpenClose
})(Sidebar);
