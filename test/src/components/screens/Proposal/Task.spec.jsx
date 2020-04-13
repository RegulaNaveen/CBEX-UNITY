// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import TaskModel from './models/TaskModel';

describe('Task component', () => {
  const data = [
    {
      id: 1,
      question: 'Question',
      answer: 'Answer',
      owner: ['Owner', 'Pedro'],
      dueDate: '02-Apr-2020',
      completionDate: '02-Apr-2020',
      complete: true
    },
    {
      id: 2,
      question: 'Question',
      answer: 'Answer',
      owner: ['Awner', 'Homer', 'jesus'],
      dueDate: '02-Apr-2020',
      completionDate: '02-Apr-2020',
      complete: true
    }
  ];
  const complete = false;
  const title = 'Resources';
  const uncompletedQuestions = 8;

  describe('rendering', () => {
    it('should render proper Title text', () => {
      const wrapper = new TaskModel(
        data,
        complete,
        title,
        uncompletedQuestions
      );
      expect(wrapper.getTitle()).toBe(title);
    });

    it('should render un-collapsed components', () => {
      const wrapper = new TaskModel(
        data,
        complete,
        title,
        uncompletedQuestions
      );
      expect(wrapper.hasTitleWrapper()).toBe(true);
      expect(wrapper.hasTableWrapper()).toBe(false);
    });

    it('should render a Complete text when all questions has been answered', () => {
      const isCompleted = true;
      const incompleteQuestions = 0;
      const wrapper = new TaskModel(
        data,
        isCompleted,
        title,
        incompleteQuestions
      );
      expect(wrapper.getCompleteText()).toBe('Complete');
    });
  });

  describe('interactions', () => {
    it('should render collapsed components when row is clicked', () => {
      const wrapper = new TaskModel(
        data,
        complete,
        title,
        uncompletedQuestions
      );
      wrapper.doClick();
      expect(wrapper.hasTitleWrapper()).toBe(false);
      expect(wrapper.hasTableWrapper()).toBe(true);
      expect(wrapper.hasQuestionRows(data.length)).toBe(true);
    });

    it('should render collapsed components when button keyPress enter triggers', () => {
      const wrapper = new TaskModel(
        data,
        complete,
        title,
        uncompletedQuestions
      );
      wrapper.doEnterKeyPress();
      expect(wrapper.hasTitleWrapper()).toBe(false);
      expect(wrapper.hasTableWrapper()).toBe(true);
      expect(wrapper.hasQuestionRows(data.length)).toBe(true);
    });
  });
});
