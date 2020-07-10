import React, { Component } from 'react';
import Toolbar from '../../Toolbar';

export class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <Toolbar selected="dashboard" />
        <div>DASHBOARD COMPONENT</div>
      </div>
    );
  }
}

export default Dashboard;
