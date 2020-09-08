// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setProposalTypeView } from '../../actions/proposals-actions';
import { SecondaryButton } from './Buttons';
import TabItem from './TabItem';
import SwitchView from './SwitchView';
import DashboardFilters from './DashboardFilters';

type Props = {
  children: any,
  setProposalView: (typeView: 0 | 1) => void
};

type State = {
  selected: number,
  showFilters: boolean
};

class Tabbar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selected: 0,
      showFilters: false
    };
  }

  handleChange = (index: number) => this.setState({ selected: index });

  handleTypeView = (selectedTab: 0 | 1) => {
    const { setProposalView } = this.props;
    setProposalView(selectedTab);
  };

  toggleFilters = () => {
    const { showFilters } = this.state;
    this.setState({ showFilters: !showFilters });
  };

  render() {
    const { children } = this.props;
    const { selected, showFilters } = this.state;

    return (
      <div className="tab-wrapper">
        <div className="tabs-items">
          <ul className="tabs">
            {children &&
              children.map((item, index) => (
                <TabItem
                  key={uuidv4()}
                  index={index}
                  item={item}
                  selected={selected}
                  onClick={this.handleChange}
                />
              ))}
          </ul>
          <div className="tab-filters">
            <SecondaryButton
              className="filter-toggle"
              onClick={this.toggleFilters}
            >
              Filter
            </SecondaryButton>
            <SwitchView getSelectedTab={this.handleTypeView} />
          </div>
        </div>
        <div className="tab-content-wrapper">
          {showFilters && <DashboardFilters />}
          {children[selected]}
        </div>
      </div>
    );
  }
}

export default connect(null, { setProposalView: setProposalTypeView })(Tabbar);
