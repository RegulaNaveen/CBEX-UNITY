// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getProposalTypeView } from '../../../selectors';
import TableView from '../../common/TableView';
import GridView from '../../common/GridView';

type Props = {
  selectedViewType: 0 | 1
};

type State = {
  users: [Object]
};

class MyDocketTab extends Component<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      users: [{}]
    };
  }

  // TODO: remove axios request once redux implementation gets complete
  async componentDidMount() {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.setState({ users: data });
  }

  renderSelectedView = () => {
    const { users } = this.state;
    const { selectedViewType } = this.props;

    if (selectedViewType === 0) return <TableView data={users} />;
    return <GridView data={users} />;
  };

  render() {
    return (
      <section id="my-docket-tab" className="tab-content">
        {this.renderSelectedView()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  selectedViewType: getProposalTypeView(state)
});

export default connect(mapStateToProps)(MyDocketTab);
