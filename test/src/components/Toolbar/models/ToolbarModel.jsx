// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import type { NavigationHistory } from 'react-router-dom';
import Toolbar from '../../../../../src/components/Toolbar';
import ToolbarMenu from '../../../../../src/components/Toolbar/ToolbarMenu';

export default class ProposalInfoModel {
  constructor(history: NavigationHistory) {
    const props = { history };
    this._wrapper = shallow(<Toolbar {...props} />);
    this._titleOneIndex = 0;
    this._titleTwoIndex = 1;
    // TODO: Uncomment and test when navigation is implemented
    // this._navigationHomeTitle = 2;
    this._navigationProposalsTitle = 2;
    // TODO: Uncomment and test when navigation is implemented
    // this._navigationQATitle = 4;
  }

  _wrapper: ShallowWrapper;

  _titleOneIndex: number;

  _titleTwoIndex: number;

  _navigationHomeTitle: number;

  _navigationProposalsTitle: number;

  _navigationQATitle: number;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getCollapseButton = (): ShallowWrapper => this._wrapper.find('#menu-title');

  _getToolbarMenu = (): ShallowWrapper => this._wrapper.find(ToolbarMenu);

  hasParagraphs = (): boolean => this._getParagraphs().length === 4;

  hasToolbarMenu = (): boolean => this._getToolbarMenu().length === 1;

  getTitleOne = (): string =>
    this._getParagraphs()
      .at(this._titleOneIndex)
      .prop('children');

  getTitleTwo = (): string =>
    this._getParagraphs()
      .at(this._titleTwoIndex)
      .prop('children');

  // TODO: Uncomment and test when navigation is implemented
  // getNavigationHome = (): string =>
  //   this._getParagraphs()
  //     .at(this._navigationHomeTitle)
  //     .prop('children');

  getNavigationProposals = (): string =>
    this._getParagraphs()
      .at(this._navigationProposalsTitle)
      .prop('children');

  // TODO: Uncomment and test when navigation is implemented
  // getNavigationQA = (): string =>
  //   this._getParagraphs()
  //     .at(this._navigationQATitle)
  //     .prop('children');

  // Interactions
  doClick = () => this._getCollapseButton().simulate('click');

  doEnterKeyPress = () =>
    this._getCollapseButton().simulate('keypress', {
      key: 'Enter',
      preventDefault: () => {}
    });
}
