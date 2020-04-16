// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import SelectTeam from '../../../../../src/components/common/SelectTeam';
import CloseCircle from '../../../../../src/components/svg/CloseCircle';

export default class SelectTeamModel {
  constructor(children: string) {
    this._onClickStub = sinon.stub();
    const props = {
      children,
      onClick: this._onClickStub
    };
    this._wrapper = shallow(<SelectTeam {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onClickStub: stub;

  _getParagraph = (): ShallowWrapper => this._wrapper.find('p');

  _getIconWrapper = (): ShallowWrapper =>
    this._wrapper.find('div.delete-team-icon');

  _getCloseCircle = (): ShallowWrapper => this._wrapper.find(CloseCircle);

  getTitleClassName = (): string => this._getParagraph().prop('className');

  getChildren = (): string => this._getParagraph().prop('children');

  hasIcon = (): boolean => this._getCloseCircle().length === 1;

  hasDivs = (): boolean => this._getIconWrapper().length === 1;

  doOnChange = () => this._getIconWrapper().prop('onChange')();

  onChangeCalledOnce = (): boolean => this._onClickStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onClickStub.reset();
  };
}
