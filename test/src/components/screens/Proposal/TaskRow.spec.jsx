// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import TaskRowModel from './models/TaskRowModel';

describe('TaskRow component', () => {
  const questionId = 'fakequestionId';
  const proposalId = 'fakeproposalId';
  const answers = [
    {
      answer: 'testing answer',
      date: '2020-05-08T15:01:01.501Z',
      user: 'user@test.com'
    }
  ];
  const questionText = 'fakequestionText';
  const answerConfiguration = { options: [], type: 'text' };
  describe('rendering', () => {
    it('should render checkmark on answer.lenght', () => {
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        answerConfiguration
      );
      expect(wrapper.hasCheckmark()).toBe(true);
    });

    it('should not render checkmark on !answer.lenght', () => {
      const emptyAnswers = [];
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        emptyAnswers,
        questionText,
        answerConfiguration
      );
      expect(wrapper.hasCheckmark()).toBe(false);
    });

    it('should render proper questionText', () => {
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        answerConfiguration
      );
      expect(wrapper.hasQuestionParagraph(questionText)).toBe(true);
    });

    it('should render proper answer type "text"', () => {
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        answerConfiguration
      );
      expect(wrapper.hasTextArea()).toBe(true);
    });

    it('should render proper answer type "number"', () => {
      const customAnswerConfiguration = { options: [], type: 'number' };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      expect(wrapper.hasTextArea()).toBe(true);
    });

    it('should render proper answer type "y/n"', () => {
      const customAnswerConfiguration = { options: [], type: 'y/n' };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      expect(wrapper.hasDropDown()).toBe(true);
    });

    it('should render proper answer type "single-picklist"', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'single-picklist'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      expect(wrapper.hasDropDown()).toBe(true);
    });

    it('should render proper answer type "date"', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'date'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      expect(wrapper.hasDatePicker()).toBe(true);
    });

    it('should render proper answer type "multi-picklist"', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'multi-picklist'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      expect(wrapper.hasMultiselect()).toBe(true);
    });
  });

  // Interactions
  describe('interactions', () => {
    it('should change value state when handleTextChange is called', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'text'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      wrapper.doHandleTextChange();
    });

    it('should handle onClickChange event', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'y/n'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      wrapper.doOnClickChange();
      expect(wrapper.onSetProposalAnswerCalledOnce()).toBe(true);
    });

    it('should handle onSelectValues event', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'multi-picklist'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      wrapper.doOnSelectValues();
      expect(wrapper.onSetProposalAnswerCalledOnce()).toBe(true);
    });

    it('should change selectedDay state when handleDayChange is called', () => {
      const customAnswerConfiguration = {
        options: [],
        type: 'date'
      };
      const wrapper = new TaskRowModel(
        questionId,
        proposalId,
        answers,
        questionText,
        customAnswerConfiguration
      );
      expect(wrapper.getSelectedDay()).toBe('');
      wrapper.doHandleDayChange();
      expect(wrapper.getSelectedDay()).toBe('testDay');
    });
  });
});
