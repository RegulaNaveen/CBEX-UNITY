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
    this._titleIndex = 0;
    this._accountExecutiveIndex = 3;
    this._businessDevelopmentIndex = 5;
    this._proposalDirectorIndex = 7;
    this._labsIndex = 9;
    this._synopsisIndex = 11;
    this._phaseIndex = 13;
    this._sitesIndex = 15;
    this._countriesIndex = 17;
    this._indicationIndex = 19;
  }

  _wrapper: ShallowWrapper;

  _titleIndex: number;

  _accountExecutiveIndex: number;

  _businessDevelopmentIndex: number;

  _proposalDirectorIndex: number;

  _labsIndex: number;

  _synopsisIndex: number;

  _phaseIndex: number;

  _sitesIndex: number;

  _countriesIndex: number;

  _indicationIndex: number;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  hasParagraphs = (): boolean => this._getParagraphs().length === 20;

  getTitle = (): string =>
    this._getParagraphs()
      .at(this._titleIndex)
      .prop('children');

  getAccountExecutive = (): string =>
    this._getParagraphs()
      .at(this._accountExecutiveIndex)
      .prop('children');

  getBusinessDevelopment = (): string =>
    this._getParagraphs()
      .at(this._businessDevelopmentIndex)
      .prop('children');

  getProposalDirector = (): string =>
    this._getParagraphs()
      .at(this._proposalDirectorIndex)
      .prop('children');

  getLabs = (): string =>
    this._getParagraphs()
      .at(this._labsIndex)
      .prop('children');

  getSynopsis = (): string =>
    this._getParagraphs()
      .at(this._synopsisIndex)
      .prop('children');

  getPhase = (): string =>
    this._getParagraphs()
      .at(this._phaseIndex)
      .prop('children');

  getSites = (): string =>
    this._getParagraphs()
      .at(this._sitesIndex)
      .prop('children');

  getCountries = (): string =>
    this._getParagraphs()
      .at(this._countriesIndex)
      .prop('children');

  getIndication = (): string =>
    this._getParagraphs()
      .at(this._indicationIndex)
      .prop('children');
}
