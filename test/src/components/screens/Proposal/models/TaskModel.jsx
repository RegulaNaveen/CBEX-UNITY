// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Task from '../../../../../../src/components/screens/Proposal/Task';

export default class TaskModel {
  constructor(
    data: Array<Object>,
    complete: boolean,
    title: string,
    incomplete: number
  ) {
    const props = {
      data,
      complete,
      title,
      incomplete
    };
    this._wrapper = shallow(<Task {...props} />);
    this._receivedProps = props;
  }

  _wrapper: ShallowWrapper;

  _receivedProps: Object;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  getTitle = (): string =>
    this._getParagraphs()
      .at(0)
      .prop('children');

  _getTitleWrapper = (): ShallowWrapper =>
    this._wrapper.find('div.task-title-wrapper');

  _getTableWrapper = (): ShallowWrapper =>
    this._wrapper.find('div.task-table-wrapper');

  _getCollapseButton = (): ShallowWrapper =>
    this._wrapper.find('div.task-icon');

  _getQuestionRows = (): ShallowWrapper =>
    this._wrapper.find('div.task-table-row');

  hasTitleWrapper = (): boolean => this._getTitleWrapper().length === 1;

  hasTableWrapper = (): boolean => this._getTableWrapper().length === 1;

  hasQuestionRows = (): boolean =>
    this._getQuestionRows().length === this._receivedProps.data.length;
}
