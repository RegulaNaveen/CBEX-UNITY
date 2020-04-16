// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Proposal from '../../../../../../src/components/screens/Proposal';
import ProposalInfo from '../../../../../../src/components/screens/Proposal/ProposalInfo';
import TaskList from '../../../../../../src/components/screens/Proposal/TasksList';
import { Add } from '../../../../../../src/components/svg';

export default class ProposalModel {
  constructor() {
    this._wrapper = shallow(<Proposal />);
  }

  _wrapper: ShallowWrapper;

  _proposalInfo = (): ShallowWrapper => this._wrapper.find(ProposalInfo);

  _getParagraph = (): ShallowWrapper => this._wrapper.find('p');

  _getAddIcon = (): ShallowWrapper => this._wrapper.find(Add);

  _taskList = (): ShallowWrapper => this._wrapper.find(TaskList);

  hasProposalInfo = (): boolean => this._proposalInfo().length === 1;

  hasParagraph = (): boolean => this._getParagraph().length === 1;

  hasAddIcon = (): boolean => this._getAddIcon().length === 1;

  getTitle = (): string => this._getParagraph().prop('children');

  hasTaskList = (): boolean => this._taskList().length === 1;
}
