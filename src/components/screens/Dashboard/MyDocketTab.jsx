// @flow
import React, { Component } from 'react';
import axios from 'axios';
import TableView from '../../common/TableView';
import ProposalCard from '../../common/ProposalCard';

type Props = {};

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

  render() {
    const { users } = this.state;

    return (
      <section id="all-tab" className="tab-content">
        <h1>My Docket</h1>
        <ProposalCard
          title="Title"
          opportunityName="Opportunity Name"
          daysRemain={8}
          dueDate="Due Date"
          account="Eli Acccount"
          protocolNumber={123456789}
          phase={2}
          therapeuticArea="Neurology"
          verbatimIndication="Prostate Cancer"
        />
        <TableView data={users} />
      </section>
    );
  }
}

export default MyDocketTab;
