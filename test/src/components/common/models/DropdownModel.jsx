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
    title: string
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
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getTitleParagraph = (): ShallowWrapper => this._wrapper.find('#dd-title');

  _getPlaceholder = (): ShallowWrapper =>
    this._wrapper.find('div.dd-header-placeholder');

  _getItemSelected = (): ShallowWrapper =>
    this._wrapper.find('div.dd-header-selected');

  _getItemsRows = (): ShallowWrapper =>
    this._wrapper.find('#dd-list-collapsed');

  _getList = (): ShallowWrapper => this._wrapper.find('ul');

  _getDropdownItem = (): ShallowWrapper => this._wrapper.find(DropdownItem);

  hasDropdownItem = (): boolean => this._getDropdownItem().length === 1;

  hasPlaceholder = (): boolean => this._getPlaceholder().length === 1;

  hasItemSelected = (): boolean => this._getItemSelected().length === 1;

  hasItemsRows = (questionsLength: number): boolean =>
    this._getItemsRows().length === questionsLength;

  getTitle = (): string => this._getTitleParagraph().prop('children');
}
