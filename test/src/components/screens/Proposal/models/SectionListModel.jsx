// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import { Map } from 'immutable';
import SectionList from '../../../../../../src/components/screens/Proposal/SectionList';
import Task from '../../../../../../src/components/screens/Proposal/Task';

export default class TaskListModel {
  constructor(tasks: Map, tasksQuestions: Map) {
    const props = {
      tasks,
      tasksQuestions
    };
    this._wrapper = shallow(<SectionList {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getTasks = (): ShallowWrapper => this._wrapper.find(Task);

  hasTasks = (tasksLength: number): boolean =>
    this._getTasks().length === tasksLength;
}
