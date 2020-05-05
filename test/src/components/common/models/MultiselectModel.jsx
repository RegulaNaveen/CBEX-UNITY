// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import Multiselect from '../../../../../src/components/common/Multiselect';
import MultiselectItemModel from '../../../../../src/components/common/MultiselectItem';

export default class MultiselectModel {
  constructor(
    id: string,
    placeholder: string,
    items: Array<Object>,
    title: string,
    fakeValue: Array<string> = []
  ) {
    this._onClickStub = sinon.stub();
    const props = {
      id,
      placeholder,
      items,
      title,
      onClick: this._onClickStub
    };
    this._wrapper = shallow(<Multiselect {...props} />);
    this._firstItemIndex = 0;
    this._fakeValue = fakeValue;
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _firstItemIndex: number;

  _fakeValue: Array<string>;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getTitleParagraph = (): ShallowWrapper =>
    this._wrapper.find('.multiselect-title');

  _getPlaceholder = (): ShallowWrapper =>
    this._wrapper.find('.multiselect-header-placeholder');

  _getSelectedValue = (): ShallowWrapper =>
    this._wrapper.find('.multiselect-header-selected');

  _getCollapseButton = (): ShallowWrapper =>
    this._wrapper.find('.multiselect-header');

  _getList = (): ShallowWrapper => this._wrapper.find('ul');

  _getMultiselectItem = (): ShallowWrapper =>
    this._wrapper.find(MultiselectItemModel);

  hasItemsRows = (itemsLength: number): boolean =>
    this._getMultiselectItem().length === itemsLength;

  getPlaceholder = (): boolean => this._getPlaceholder().prop('children');

  getSelectedItem = (): boolean => this._getSelectedValue().prop('children');

  getTitle = (): string => this._getTitleParagraph().prop('children');

  isCollapsed = (): boolean => this._wrapper.state('isCollapsed');

  // Interactions
  doClick = () => this._getCollapseButton().simulate('click');

  doClickOnItem = () =>
    this._getMultiselectItem()
      .at(this._firstItemIndex)
      .props()
      .onClick(this._fakeValue);
}
