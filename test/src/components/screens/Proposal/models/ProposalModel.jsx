// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import sinon from 'sinon';
import type { stub } from 'sinon';
import Loader from 'react-loader-spinner';
import { Proposal } from '../../../../../../src/components/screens/Proposal';
import ProposalInfo from '../../../../../../src/components/screens/Proposal/ProposalInfo';
import TaskList from '../../../../../../src/components/screens/Proposal/TasksList';
import { Add } from '../../../../../../src/components/svg';

export default class ProposalModel {
  constructor(
    match: Match,
    questions: Map,
    questionsList: Map,
    isLoading: boolean,
    sortedQuestions: Map
  ) {
    this._onEventStub = sinon.stub();
    const props = {
      match,
      questions,
      questionsList,
      isLoading,
      sortedQuestions,
      getProposalInfo: this._onEventStub
    };
    this._wrapper = shallow(<Proposal {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onEventStub: stub;

  _getLoader = (): ShallowWrapper => this._wrapper.find(Loader);

  _proposalInfo = (): ShallowWrapper => this._wrapper.find(ProposalInfo);

  _getParagraph = (): ShallowWrapper => this._wrapper.find('p');

  _getAddIcon = (): ShallowWrapper => this._wrapper.find(Add);

  _taskList = (): ShallowWrapper => this._wrapper.find(TaskList);

  hasLoader = (): boolean => this._getLoader().length === 1;

  hasProposalInfo = (): boolean => this._proposalInfo().length === 1;

  hasParagraph = (): boolean => this._getParagraph().length === 1;

  hasAddIcon = (): boolean => this._getAddIcon().length === 1;

  getTitle = (): string => this._getParagraph().prop('children');

  hasTaskList = (): boolean => this._taskList().length === 1;
}
