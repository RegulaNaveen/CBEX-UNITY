// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import type { NavigationHistory } from 'react-router-dom';
import ToolbarMenu from '../../../../../src/components/Toolbar/ToolbarMenu';

export default class ProposalInfoModel {
  constructor(name: string, email: string, history: NavigationHistory) {
    const props = { name, email, history };
    this._wrapper = shallow(<ToolbarMenu {...props} />);
    this._nameIndex = 0;
    this._emailIndex = 1;
    this._profileTextIndex = 2;
    this._settingsTextIndex = 3;
    this._helpTextIndex = 4;
  }

  _wrapper: ShallowWrapper;

  _nameIndex: number;

  _emailIndex: number;

  _profileTextIndex: number;

  _settingsTextIndex: number;

  _helpTextIndex: number;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  hasParagraphs = (): boolean => this._getParagraphs().length === 5;

  getName = (): string =>
    this._getParagraphs()
      .at(this._nameIndex)
      .prop('children');

  getEmail = (): string =>
    this._getParagraphs()
      .at(this._emailIndex)
      .prop('children');

  getProfileText = (): string =>
    this._getParagraphs()
      .at(this._profileTextIndex)
      .prop('children');

  getSettingsText = (): string =>
    this._getParagraphs()
      .at(this._settingsTextIndex)
      .prop('children');

  getHelpText = (): string =>
    this._getParagraphs()
      .at(this._helpTextIndex)
      .prop('children');
}
