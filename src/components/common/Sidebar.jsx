// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import chevronRight from '../../../img/chevron-right.svg';
import handleSelectedSection from '../../actions/sidebar-actions';

type Props = {
  sections: Map,
  setSelectedSection: Function
};

type State = {
  isOpen: boolean
};

class Sidebar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = () => this.setState({ isOpen: false });

  handleItemsVisibility = (e: SyntheticEvent<EventTarget>) => {
    e.stopPropagation();

    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  scrollToSelectedElement = (e: SyntheticInputEvent<EventTarget>) => {
    e.stopPropagation();

    const {
      target: { textContent }
    } = e;

    const { setSelectedSection } = this.props;

    const itemToScroll = textContent
      .toLocaleLowerCase()
      .split(' ')
      .join('-');

    const item: ?HTMLElement = document.getElementById(itemToScroll);

    if (item) setTimeout(() => window.scrollTo(0, item.offsetTop - 20), 100);

    this.setState({ isOpen: false }, () => setSelectedSection(itemToScroll));
  };

  render() {
    const { sections } = this.props;
    const { isOpen } = this.state;

    return (
      <div id="sidebar" className={classNames({ 'is-open': isOpen })}>
        <div className="sidebar-content">
          <button
            onClick={this.handleItemsVisibility}
            onMouseEnter={this.handleItemsVisibility}
            type="button"
          >
            <img
              className="task-icon"
              src={chevronRight}
              alt="question arrow"
            />
          </button>
          <div className="sidebar-content-list">
            {sections.valueSeq().map(section => {
              const sectionName = section.get('sectionName');
              return (
                <p
                  key={sectionName}
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

export default connect(null, {
  setSelectedSection: handleSelectedSection
})(Sidebar);
