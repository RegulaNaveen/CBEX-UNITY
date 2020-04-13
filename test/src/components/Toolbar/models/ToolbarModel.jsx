// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import Toolbar from '../../../../../src/components/Toolbar';

export default class ProposalInfoModel {
  constructor() {
    this._wrapper = shallow(<Toolbar />);
    this._titleOneIndex = 0;
    this._titleTwoIndex = 1;
    this._navigationHomeTitle = 2;
    this._navigationProposalsTitle = 3;
    this._navigationQATitle = 4;
  }

  _wrapper: ShallowWrapper;

  _titleOneIndex: number;

  _titleTwoIndex: number;

  _navigationHomeTitle: number;

  _navigationProposalsTitle: number;

  _navigationQATitle: number;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  hasParagraphs = (): boolean => this._getParagraphs().length === 5;

  getTitleOne = (): string =>
    this._getParagraphs()
      .at(this._titleOneIndex)
      .prop('children');

  getTitleTwo = (): string =>
    this._getParagraphs()
      .at(this._titleTwoIndex)
      .prop('children');

  getNavigationHome = (): string =>
    this._getParagraphs()
      .at(this._navigationHomeTitle)
      .prop('children');

  getNavigationProposals = (): string =>
    this._getParagraphs()
      .at(this._navigationProposalsTitle)
      .prop('children');

  getNavigationQA = (): string =>
    this._getParagraphs()
      .at(this._navigationQATitle)
      .prop('children');
}
