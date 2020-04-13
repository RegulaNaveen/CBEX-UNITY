// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import TasksListModel from './models/TasksListModel';

describe('TasksList component', () => {
  describe('rendering', () => {
    const tasks = [
      {
        data: [
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Owner', 'Pedro'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          },
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Awner', 'Homer', 'jesus'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          }
        ],
        complete: false,
        title: 'Resources',
        incomplete: 8
      },
      {
        data: [
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Owner', 'Pedro'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: false
          },
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Awner', 'Homer', 'jesus'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: false
          },
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Awner', 'Homer', 'jesus'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          },
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Awner', 'Homer', 'jesus'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          }
        ],
        complete: false,
        title: 'Labs',
        incomplete: 2
      },
      {
        data: [
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Owner', 'Pedro'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          },
          {
            question: 'Question',
            answer: 'Answer',
            owner: ['Awner', 'Homer', 'jesus'],
            dueDate: '02-Apr-2020',
            completionDate: '02-Apr-2020',
            complete: true
          }
        ],
        complete: true,
        title: 'Medical',
        incomplete: 0
      }
    ];

    it('should render proper Title text', () => {
      const wrapper = new TasksListModel(tasks);
      expect(wrapper.hasParagraph()).toBe(true);
      expect(wrapper.getTitle()).toBe('Questions');
    });

    it('should render proper ammount of Task components', () => {
      const wrapper = new TasksListModel(tasks);
      const tasksLength = tasks.length;
      expect(wrapper.hasTasks(tasksLength)).toBe(true);
    });
  });
});
