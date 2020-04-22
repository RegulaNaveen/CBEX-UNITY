// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import Dropdown from '../../../../../src/components/common/Dropdown';
import DropdownItem from '../../../../../src/components/common/DropdownItem';

export default class DropdownModel {
  constructor(
    id: string,
    placeholder: string,
    items: Array<Object>,
    title: string,
    fakeValue: string = ''
  ) {
    this._onClickStub = sinon.stub();
    const props = {
      id,
      placeholder,
      items,
      title,
      onClick: this._onClickStub
    };
    this._wrapper = shallow(<Dropdown {...props} />);
    this._firstItemIndex = 0;
    this._fakeValue = fakeValue;
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _firstItemIndex: number;

  _fakeValue: String;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getTitleParagraph = (): ShallowWrapper => this._wrapper.find('.dd-title');

  _getPlaceholder = (): ShallowWrapper =>
    this._wrapper.find('.dd-header-placeholder');

  _getSelectedValue = (): ShallowWrapper =>
    this._wrapper.find('.dd-header-selected');

  _getCollapseButton = (): ShallowWrapper => this._wrapper.find('.dd-header');

  _getList = (): ShallowWrapper => this._wrapper.find('ul');

  _getDropdownItem = (): ShallowWrapper => this._wrapper.find(DropdownItem);

  hasItemsRows = (itemsLength: number): boolean =>
    this._getDropdownItem().length === itemsLength;

  getPlaceholder = (): boolean => this._getPlaceholder().prop('children');

  getSelectedItem = (): boolean => this._getSelectedValue().prop('children');

  getTitle = (): string => this._getTitleParagraph().prop('children');

  isCollapsed = (): boolean => this._wrapper.state('isCollapsed');

  // Interactions
  doClick = () => this._getCollapseButton().simulate('click');

  doClickOnItem = () =>
    this._getDropdownItem()
      .at(this._firstItemIndex)
      .props()
      .onClick(this._fakeValue);
}
