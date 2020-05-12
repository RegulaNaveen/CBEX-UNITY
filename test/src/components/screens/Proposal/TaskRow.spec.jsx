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

  // TODO: Add interactions testing
  // describe('interactions', () => {
  //   it('should render collapsed components when row is clicked', () => {
  //     const wrapper = new TaskModel(
  //       data,
  //       complete,
  //       title,
  //       uncompletedQuestions
  //     );
  //     wrapper.doClick();
  //     expect(wrapper.hasTitleWrapper()).toBe(false);
  //     expect(wrapper.hasTableWrapper()).toBe(true);
  //     expect(wrapper.hasQuestionRows(data.length)).toBe(true);
  //   });
  // });
});
