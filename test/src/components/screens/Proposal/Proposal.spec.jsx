// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import { Map } from 'immutable';
import ProposalModel from './models/ProposalModel';

describe('Proposal component', () => {
  const match = { params: { id: 'Test Id' } };
  const questions = Map({});
  const sortedQuestions = Map({});
  const questionsList = Map({});
  const isLoading = true;
  describe('rendering', () => {
    it('should render Loader component when loading', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        isLoading,
        sortedQuestions
      );
      expect(wrapper.hasLoader()).toBe(true);
    });

    it('should render Proposal Info component', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions
      );
      expect(wrapper.hasProposalInfo()).toBe(true);
    });

    it('should render proper Title text', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions
      );
      expect(wrapper.hasParagraph()).toBe(true);
      expect(wrapper.getTitle()).toBe('Questions');
    });

    it('should render proper Add icon', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions
      );
      expect(wrapper.hasAddIcon()).toBe(true);
    });

    it('should render Task List component', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions
      );
      expect(wrapper.hasTaskList()).toBe(true);
    });
  });
});
