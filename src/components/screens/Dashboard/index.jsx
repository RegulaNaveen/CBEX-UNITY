// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Toolbar from '../../Toolbar';
import Tabbar from '../../common/Tabbar';
import TableView from '../../common/TableView';

type State = {
  users: [Object]
};

export class Dashboard extends Component<[], State> {
  constructor() {
    super();

    this.state = {
      users: [{}]
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    this.setState({ users: data });
  }

  render() {
    const { users } = this.state;

    return (
      <div id="dashboard">
        <Toolbar selected="dashboard" />
        <div>DASHBOARD COMPONENT</div>

        <div className="tab-wrapper">
          <Tabbar>
            <div label="Active">Active</div>
            <div label="Inactive">Inactive unity records</div>
            <div label="All">
              <TableView data={users} />
            </div>
          </Tabbar>
        </div>
      </div>
    );
  }
}

export default Dashboard;
