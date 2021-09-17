// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  setProposalTypeView,
  onFilteringProposals
} from '../../redux/actions/proposals-actions';
import { SecondaryButton } from '../common/atoms/Buttons';
import TabItem from '../common/atoms/TabItem';
import SwitchView from '../common/SwitchView';
import DashboardFilters from '../common/DashboardFilters';
import { Filter } from '../svg';
import MatomoHOC from '../HOC/MatomoHOC';

type Props = {
  children: any,
  setProposalView: (typeView: 0 | 1) => void,
  filterProposals: Function,
  eventCategories: any,
  userActions: any,
  trackEvent: any
};

type State = {
  selected: number,
  showFilters: boolean,
  filters: Object
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

  componentDidMount() {
    const { filterProposals } = this.props;
    // Reset filters on page load
    this.setState({ showFilters: false }, () => filterProposals({}, false));
  }

  handleChange = (index: number) => {
    const { filterProposals } = this.props;
    this.trackMatomoEventTabs(index);
    this.setState({ selected: index });

    // Reset filters on tab switch
    this.setState({ showFilters: false }, () => filterProposals({}, false));
  };

  handleTypeView = (selectedTab: 0 | 1) => {
    const { setProposalView } = this.props;
    setProposalView(selectedTab);
  };

  onTextFilterChange = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { filters } = this.state;
    const { filterProposals } = this.props;
    const { id, value } = target;

    this.setState({ filters: { ...filters, [id]: value } }, () => {
      const { filters: newFilters } = this.state;
      filterProposals(newFilters, true);
    });
    this.trackMatomoEventFilterChange({ ...filters, [id]: value });
  };

  onDropDownFilterChange = (id: string, value: string) => {
    const { filters } = this.state;
    const { filterProposals } = this.props;

    this.setState({ filters: { ...filters, [id]: value } }, () => {
      const { filters: newFilters } = this.state;
      filterProposals(newFilters, true);
    });
    this.trackMatomoEventFilterChange({ ...filters, [id]: value });
  };

  onDateRangeChange = (id: string, range: Object) => {
    const { filters } = this.state;
    const { filterProposals } = this.props;

    this.setState({ filters: { ...filters, [id]: range } }, () => {
      const { filters: newFilters } = this.state;
      filterProposals(newFilters, true);
    });
    this.trackMatomoEventFilterChange({ ...filters, [id]: range });
  };

  toggleFilters = () => {
    const { filterProposals } = this.props;
    const { showFilters } = this.state;
    this.setState({ showFilters: !showFilters }, () =>
      filterProposals({}, false)
    );

    this.trackMatomoEventFilterToggle(!showFilters);
  };

  clearFilter = () => {
    const { filterProposals } = this.props;
    this.setState(
      {
        filters: {
          ...{
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
        }
      },
      () => {
        if (document.getElementById('opportunity number')) {
          document.getElementById('opportunity number').value = '';
        }
        if (document.getElementById('opportunityName')) {
          document.getElementById('opportunityName').value = '';
        }
        if (document.getElementById('customer')) {
          document.getElementById('customer').value = '';
        }
        if (document.getElementById('protocol number')) {
          document.getElementById('protocol number').value = '';
        }
        if (document.getElementById('product')) {
          document.getElementById('product').value = '';
        }
        if (document.getElementById('verbatim indication')) {
          document.getElementById('verbatim indication').value = '';
        }
        if (document.getElementById('lookup-wrapper-border>input')) {
          document.querySelector('.lookup-wrapper-border>input').value = '';
        }
        const htmlbtn = document.getElementsByClassName('filter-wrapper');
        if (htmlbtn && htmlbtn.length) {
          for (let i = 0; i < htmlbtn.length; i++) {
            const clearbtn = htmlbtn[i].getElementsByTagName('button');
            if (clearbtn && clearbtn.length) {
              clearbtn[0].click();
            }
          }
        }
        filterProposals(this.state.filters, true);
      }
    );
  };

  trackMatomoEventTabs = index => {
    const tabs = ['My Docket', 'Recent', 'All'];
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.dp,
      action: `Tab: ${userActions.click} On ${tabs[index]} Tab`
    });
  };

  trackMatomoEventFilterToggle = action => {
    const openOrclose = action ? 'Open' : 'Close';
    const { userActions, eventCategories, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.dp,
      action: `Filters: ${userActions.click} to ${openOrclose} Filters`
    });
  };

  trackMatomoEventFilterChange = filterValues => {
    const filStrings = [];
    const { eventCategories, trackEvent } = this.props;
    for (const key in filterValues) {
      if (filterValues[key])
        filStrings.push(
          `${key.toUpperCase()} = ${JSON.stringify(filterValues[key])}`
        );
    }
    if (filStrings.length > 0) {
      trackEvent({
        category: eventCategories.dp,
        action: `Filters: Filtering With ${filStrings.join(' And ')}`
      });
    }
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
          {showFilters && (
            <DashboardFilters
              onTextFilterChange={this.onTextFilterChange}
              onDropDownFilterChange={this.onDropDownFilterChange}
              onDateRangeChange={this.onDateRangeChange}
              clearFilter={() => this.clearFilter()}
            />
          )}
          {children[selected]}
        </div>
      </div>
    );
  }
}

export default connect(null, {
  setProposalView: setProposalTypeView,
  filterProposals: onFilteringProposals
})(MatomoHOC(Tabbar));
