// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setProposalTypeView } from '../../actions/proposals-actions';
import TabItem from './TabItem';
import SwitchView from './SwitchView';

type Props = {
  children: any,
  setProposalView: (typeView: 0 | 1) => void
};

type State = {
  selected: number
};

class Tabbar extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      selected: 0
    };
  }

  handleChange = (index: number) => this.setState({ selected: index });

  handleTypeView = (selectedTab: 0 | 1) => {
    const { setProposalView } = this.props;
    setProposalView(selectedTab);
  };

  render() {
    const { children } = this.props;
    const { selected } = this.state;

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
          </div>
        </div>
        <div className="tab-content-wrapper">{children[selected]}</div>
      </div>
    );
  }
}

export default connect(null, { setProposalView: setProposalTypeView })(Tabbar);
