// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import TaskModel from './models/TaskModel';

describe('Task component', () => {
  describe('rendering', () => {
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
    const incomplete = 8;

    it('should render proper Title text', () => {
      const wrapper = new TaskModel(data, complete, title, incomplete);
      expect(wrapper.getTitle()).toBe(title);
    });

    it('should render un-collapsed components', () => {
      const wrapper = new TaskModel(data, complete, title, incomplete);
      expect(wrapper.hasTitleWrapper()).toBe(true);
      expect(wrapper.hasTableWrapper()).toBe(false);
    });

    it('should render collapsed components', () => {
      const wrapper = new TaskModel(data, complete, title, incomplete);
      wrapper._getCollapseButton().simulate('click');
      expect(wrapper.hasTitleWrapper()).toBe(false);
      expect(wrapper.hasTableWrapper()).toBe(true);
      expect(wrapper.hasQuestionRows()).toBe(true);
    });
  });
});
