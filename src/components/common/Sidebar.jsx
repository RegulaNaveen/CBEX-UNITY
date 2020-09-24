// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import chevronRight from '../../../img/chevron-right.svg';
import {
  handleSelectedSection,
  onHandleOpenClose
} from '../../actions/sidebar-actions';
import { getIsOpen } from '../../selectors';

type Props = {
  sections: Map,
  setSelectedSection: (selectedItem: string) => void,
  handleOpenClose: (isOpen: boolean) => void,
  isOpen: boolean
};

type State = {
  selectedSection: string
};

class Sidebar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selectedSection: ''
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = () => {
    const { handleOpenClose } = this.props;
    handleOpenClose(false);
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

  render() {
    const { sections, isOpen } = this.props;
    const { selectedSection } = this.state;

    return (
      <div id="sidebar" className={classNames({ 'is-open': isOpen })}>
        <div className="sidebar-content">
          <button onClick={this.handleItemsVisibility} type="button">
            <img
              className="task-icon"
              src={chevronRight}
              alt="question arrow"
            />
          </button>
          <div className="sidebar-content-list">
            <h1>Index</h1>
            {sections.valueSeq().map(section => {
              const sectionName = section.get('sectionName');

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
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  isOpen: getIsOpen(state)
});

export default connect(mapStateToProps, {
  setSelectedSection: handleSelectedSection,
  handleOpenClose: onHandleOpenClose
})(Sidebar);
