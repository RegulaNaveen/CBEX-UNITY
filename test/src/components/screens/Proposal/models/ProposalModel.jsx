// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import type { NavigationHistory } from 'react-router-dom';
import Proposal from '../../../../../../src/components/screens/Proposal';
import ProposalInfo from '../../../../../../src/components/screens/Proposal/ProposalInfo';
import TaskList from '../../../../../../src/components/screens/Proposal/TasksList';

export default class ProposalModel {
  constructor(history: NavigationHistory) {
    const props = { history };
    this._wrapper = shallow(<Proposal {...props} />);
  }

  _wrapper: ShallowWrapper;

  _proposalInfo = (): ShallowWrapper => this._wrapper.find(ProposalInfo);

  _taskList = (): ShallowWrapper => this._wrapper.find(TaskList);

  hasProposalInfo = (): boolean => this._proposalInfo().length === 1;

  hasTaskList = (): boolean => this._taskList().length === 1;
}
