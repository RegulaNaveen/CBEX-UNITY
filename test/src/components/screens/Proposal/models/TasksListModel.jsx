// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import TaskList from '../../../../../../src/components/screens/Proposal/TasksList';
import Task from '../../../../../../src/components/screens/Proposal/Task';

export default class TaskListModel {
  constructor(tasks: Array<Object>) {
    const props = {
      tasks
    };
    this._wrapper = shallow(<TaskList {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getTasks = (): ShallowWrapper => this._wrapper.find(Task);

  hasTasks = (tasksLength: number): boolean =>
    this._getTasks().length === tasksLength;
}
