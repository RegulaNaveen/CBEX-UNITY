// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import ProposalInfo from '../../../../../../src/components/screens/Proposal/ProposalInfo';

export default class ProposalInfoModel {
  constructor(data: Object) {
    const props = {
      data
    };
    this._wrapper = shallow(<ProposalInfo {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  hasParagraphs = (): boolean => this._getParagraphs().length === 20;

  getTitle = (): string =>
    this._getParagraphs()
      .at(0)
      .prop('children');

  getAccountExecutive = (): string =>
    this._getParagraphs()
      .at(3)
      .prop('children');

  getBusinessDevelopment = (): string =>
    this._getParagraphs()
      .at(5)
      .prop('children');

  getProposalDirector = (): string =>
    this._getParagraphs()
      .at(7)
      .prop('children');

  getLabs = (): string =>
    this._getParagraphs()
      .at(9)
      .prop('children');

  getSynopsis = (): string =>
    this._getParagraphs()
      .at(11)
      .prop('children');

  getPhase = (): string =>
    this._getParagraphs()
      .at(13)
      .prop('children');

  getSites = (): string =>
    this._getParagraphs()
      .at(15)
      .prop('children');

  getCountries = (): string =>
    this._getParagraphs()
      .at(17)
      .prop('children');

  getIndication = (): string =>
    this._getParagraphs()
      .at(19)
      .prop('children');
}
