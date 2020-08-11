// @flow
import React, { Component } from 'react';
import axios from 'axios';
import TableView from '../../common/TableView';

type Props = {};

type State = {
  users: [Object]
};

class RecentTab extends Component<Props, State> {
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

  render() {
    const { users } = this.state;

    return (
      <section id="all-tab" className="tab-content">
        <h1>Recent Proposals</h1>
        <TableView data={users} />
      </section>
    );
  }
}

export default RecentTab;
