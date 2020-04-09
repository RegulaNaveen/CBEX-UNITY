// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import ProposalInfoModel from './models/ProposalInfoModel';

describe('ProposalInfo component', () => {
  describe('rendering', () => {
    const data = {
      title: 'RFP-1028',
      accountExecutive: 'Jan Levinson-Gould',
      businessDevelopment: 'Dwight Schrute',
      proposalDirector: 'Michael Scott',
      labs: 'Kevin Malone',
      synopsis: true,
      phase: 2,
      sites: 12,
      countries: ['France', 'UK', 'Italy', 'Spain'],
      indication: 'Myopia'
    };

    it('should render all Paragraphs component', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.hasParagraphs()).toBe(true);
    });

    it('should render Title text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getTitle()).toBe(data.title);
    });

    it('should render Account Executive text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getAccountExecutive()).toBe(data.accountExecutive);
    });

    it('should render Business Development text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getBusinessDevelopment()).toBe(data.businessDevelopment);
    });

    it('should render Proposal Director text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getProposalDirector()).toBe(data.proposalDirector);
    });

    it('should render Labs text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getLabs()).toBe(data.labs);
    });

    it('should render Synopsis text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getSynopsis()).toBe(data.synopsis ? 'Yes' : 'No');
    });

    it('should render Phase text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getPhase()).toBe(data.phase);
    });

    it('should render Sites text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getSites()).toBe(data.sites);
    });

    it('should render Countries text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getCountries()).toBe(data.countries.join(', '));
    });

    it('should render Indication text', () => {
      const wrapper = new ProposalInfoModel(data);
      expect(wrapper.getIndication()).toBe(data.indication);
    });
  });
});
