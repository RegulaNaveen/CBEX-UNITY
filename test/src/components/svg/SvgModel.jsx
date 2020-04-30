// @flow
import React from 'react';
import type { ComponentType } from 'react';
import type { ShallowWrapper } from 'enzyme';
import { shallow } from 'enzyme';

export default class SvgModel {
  constructor(Svg: ComponentType<any>, className: string) {
    const props = { className };
    this._wrapper = shallow(<Svg {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getSvg = (): ShallowWrapper => this._wrapper.find('svg');

  hasSvg = (): boolean => this._getSvg().length === 1;
}
