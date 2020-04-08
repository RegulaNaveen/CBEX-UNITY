// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import { LinkButton } from '../../src/components/common/Button';

export default class LinkButtonModel {
  constructor(id: string, children: string, type: string, onChange: Function) {
    const props = {
      id,
      children,
      type,
      onChange
    };
    this._wrapper = shallow(<LinkButton {...props} />);
  }

  _wrapper: ShallowWrapper;

  _linkButton = (): ShallowWrapper => this._wrapper.find('button');

  getIdLinkButton = (): string => this._linkButton().prop('id');

  getChildrenLinkButton = (): string => this._linkButton().prop('children');

  getTypeLinkButton = (): Function => this._linkButton().prop('type');

  getOnChangeLinkButton = (): boolean => this._linkButton().prop('onChange');
}
