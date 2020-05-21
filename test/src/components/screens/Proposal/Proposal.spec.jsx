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
  const setQuestion = Map({});
  const hasQuestionError = false;
  const isQuestionLoading = false;
  describe('rendering', () => {
    it('should render Loader component when loading', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        isLoading,
        sortedQuestions,
        setQuestion,
        hasQuestionError,
        isQuestionLoading
      );
      expect(wrapper.hasLoader()).toBe(true);
    });

    it('should render Proposal Info component', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions,
        setQuestion,
        hasQuestionError,
        isQuestionLoading
      );
      expect(wrapper.hasProposalInfo()).toBe(true);
    });

    it('should render proper Title text', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions,
        setQuestion,
        hasQuestionError,
        isQuestionLoading
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
        sortedQuestions,
        setQuestion,
        hasQuestionError,
        isQuestionLoading
      );
      expect(wrapper.hasAddIcon()).toBe(true);
    });

    it('should render Task List component', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions,
        setQuestion,
        hasQuestionError,
        isQuestionLoading
      );
      expect(wrapper.hasTaskList()).toBe(true);
    });
  });
  describe('interactions', () => {
    it('should change state showModal on onClose call', () => {
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions,
        setQuestion,
        hasQuestionError,
        isQuestionLoading
      );
      expect(wrapper.getShowModal()).toBe(false);
      wrapper.doIconOnClose();
      expect(wrapper.getShowModal()).toBe(true);
      wrapper.doOnClose();
      expect(wrapper.getShowModal()).toBe(false);
    });

    it('should call onClose when component updates', () => {
      const newIsQuestionLoading = true;
      const newSetQuestion = undefined;
      const wrapper = new ProposalModel(
        match,
        questions,
        questionsList,
        !isLoading,
        sortedQuestions,
        newSetQuestion,
        !hasQuestionError,
        newIsQuestionLoading
      );
      expect(wrapper.getShowModal()).toBe(false);
      wrapper.doIconOnClose();
      expect(wrapper.getShowModal()).toBe(true);
      wrapper.doUpdate(isQuestionLoading, setQuestion, hasQuestionError);
      expect(wrapper.getShowModal()).toBe(false);
    });
  });
});
