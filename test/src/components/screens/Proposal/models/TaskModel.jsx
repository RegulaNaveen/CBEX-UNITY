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
  }

  _wrapper: ShallowWrapper;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getTitleParagraph = (): ShallowWrapper => this._wrapper.find('#task-title');

  _getCompleteStatus = (): ShallowWrapper =>
    this._wrapper.find('#complete-status');

  _getTableWrapper = (): ShallowWrapper =>
    this._wrapper.find('div.task-table-wrapper');

  _getCollapseButton = (): ShallowWrapper => this._wrapper.find('#arrow-icon');

  _getQuestionRows = (): ShallowWrapper =>
    this._wrapper.find('div.task-table-row');

  getTitle = (): string => this._getTitleParagraph().prop('children');

  getCompleteText = (): string =>
    this._getCompleteStatus()
      .find('p')
      .prop('children');

  hasTitleWrapper = (): boolean => this._getTitleParagraph().length === 1;

  hasTableWrapper = (): boolean => this._getTableWrapper().length === 1;

  hasQuestionRows = (questionsLength: number): boolean =>
    this._getQuestionRows().length === questionsLength;

  // Interactions
  doClick = () => this._getCollapseButton().simulate('click');
}
