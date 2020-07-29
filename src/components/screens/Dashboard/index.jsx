// @flow
import React, { Component } from 'react';
import Toolbar from '../../Toolbar';
import Tabbar from '../../common/Tabbar';

export class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div id="dashboard">
        <Toolbar selected="dashboard" />
        <div>DASHBOARD COMPONENT</div>
        <div className="tab-wrapper">
          <Tabbar defaultSelected={0}>
            <div label="Active">Active unity records</div>
            <div label="Inactive">Inactive unity records</div>
            <div label="All">All unity records</div>
          </Tabbar>
        </div>
      </div>
    );
  }
}

export default Dashboard;
