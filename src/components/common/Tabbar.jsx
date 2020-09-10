// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  setProposalTypeView,
  onFilteringProposals
} from '../../actions/proposals-actions';
import { SecondaryButton } from './Buttons';
import TabItem from './TabItem';
import SwitchView from './SwitchView';
import DashboardFilters from './DashboardFilters';
import { Filter } from '../svg';

type Props = {
  children: any,
  setProposalView: (typeView: 0 | 1) => void,
  filterProposals: Function
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
      showFilters: false,
      filters: {
        opportunityNumber: '',
        opportunityName: '',
        customer: '',
        protocolNumber: '',
        phase: '',
        product: '',
        therapeuticArea: '',
        indication: '',
        bidDueDate: '',
        opportunityStatus: '',
        teamMember: ''
      }
    };
  }

  handleChange = (index: number) => this.setState({ selected: index });

  handleTypeView = (selectedTab: 0 | 1) => {
    const { setProposalView } = this.props;
    setProposalView(selectedTab);
  };

  onChangeValue = ({ target }: SyntheticEvent<EventTarget>) => {
    const { filters } = this.state;
    const { filterProposals } = this.props;
    const { id, value } = target;
    this.setState({ filters: { ...filters, [id]: value } }, () => {
      const { filters: newFilters } = this.state;
      filterProposals(newFilters, true);
    });
  };

  toggleFilters = () => {
    const { filterProposals } = this.props;
    const { showFilters } = this.state;
    this.setState({ showFilters: !showFilters }, () => {
      const { showFilters: newVisibility } = this.state;
      if (newVisibility) filterProposals({}, false);
    });
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
            <SwitchView getSelectedTab={this.handleTypeView} />
            <SecondaryButton
              className="filter-toggle"
              onClick={this.toggleFilters}
            >
              <Filter className="filter-icon" />
              Filter
            </SecondaryButton>
          </div>
        </div>
        <div className="tab-content-wrapper">
          {showFilters && <DashboardFilters onChange={this.onChangeValue} />}
          {children[selected]}
        </div>
      </div>
    );
  }
}

export default connect(null, {
  setProposalView: setProposalTypeView,
  filterProposals: onFilteringProposals
})(Tabbar);
