// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import type { NavigationHistory } from 'react-router-dom';
import sinon from 'sinon';
import type { stub } from 'sinon';
import { ToolbarMenuComponent } from '../../../../../src/components/Toolbar/ToolbarMenu';
import { User, Help, Settings } from '../../../../../src/components/svg';

export default class ProposalInfoModel {
  constructor(name: string, email: string, history: NavigationHistory) {
    this._handleEventStub = sinon.stub();
    const props = {
      name,
      email,
      history,
      handleLogout: this._handleEventStub,
      handleKeyPress: this._handleEventStub
    };
    this._wrapper = shallow(<ToolbarMenuComponent {...props} />);
    this._nameIndex = 0;
    this._emailIndex = 1;
    this._profileTextIndex = 2;
    this._settingsTextIndex = 3;
    this._helpTextIndex = 4;
  }

  _wrapper: ShallowWrapper;

  _handleEventStub: stub;

  _nameIndex: number;

  _emailIndex: number;

  _profileTextIndex: number;

  _settingsTextIndex: number;

  _helpTextIndex: number;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getProfileIcon = (): ShallowWrapper => this._wrapper.find(User);

  _getSettingsIcon = (): ShallowWrapper => this._wrapper.find(Settings);

  _getHelpIcon = (): ShallowWrapper => this._wrapper.find(Help);

  _getButton = (): ShallowWrapper => this._wrapper.find('#logout-button');

  hasParagraphs = (): boolean => this._getParagraphs().length === 5;

  hasProfileIcon = (): boolean => this._getProfileIcon().length === 1;

  hasSettingsIcon = (): boolean => this._getSettingsIcon().length === 1;

  hasHelpIcon = (): boolean => this._getHelpIcon().length === 1;

  hasName = (): string =>
    this._getParagraphs()
      .at(this._nameIndex)
      .prop('children');

  hasEmail = (): string =>
    this._getParagraphs()
      .at(this._emailIndex)
      .prop('children');

  hasProfileText = (): string =>
    this._getParagraphs()
      .at(this._profileTextIndex)
      .prop('children');

  hasSettingsText = (): string =>
    this._getParagraphs()
      .at(this._settingsTextIndex)
      .prop('children');

  hasHelpText = (): string =>
    this._getParagraphs()
      .at(this._helpTextIndex)
      .prop('children');

  // Interactions
  handleEventOnClick = () => this._getButton().prop('onClick')();

  handleEventOnKeyPress = () => this._getButton().prop('onKeyPress')();

  onHandleEventCalledOnce = (): boolean =>
    this._handleEventStub.calledOnce === true;

  resetEventHandlers = () => {
    this._handleEventStub.reset();
  };
}
