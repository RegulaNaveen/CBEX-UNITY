// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import TasksListModel from './models/TasksListModel';

describe('TasksList component', () => {
  describe('rendering', () => {
    const tasks = ['Document Availability'];
    const tasksQuestions = [
      {
        'Document Availability': [
          {
            answerConfiguration: { type: 'y/n', options: [] },
            answerDependence: 'Document Availability-B4X',
            answers: [],
            documentSource: 'BD Key, BD comp',
            logic: 'b4x = no',
            proposalId: '9b28f967-229c-4ca4-9ab6-74e8e681bd50',
            questionId: 'Document Availability-B4X',
            questionOrder: 1,
            questionText: 'Is the protocol synopsis available?',
            roleName: 'BD',
            section: { sectionOrder: 7, sectionName: 'Document Availability' },
            serviceDependence: 'n/a',
            supportRoles: 'PD'
          },
          {
            answerConfiguration: { type: 'date', options: [] },
            answerDependence: 'no',
            answers: [],
            proposalId: '9b28f967-229c-4ca4-9ab6-74e8e681bd50',
            questionId: 'Document Availability-X7B',
            questionOrder: 2,
            questionText: 'When will the protocol synopsis be available?',
            roleName: 'BD',
            section: { sectionOrder: 7, sectionName: 'Document Availability' },
            serviceDependence: 'n/a',
            sfObject: 'n/a',
            supportRoles: 'PD'
          }
        ]
      }
    ];

    it('should render proper ammount of Task components', () => {
      const wrapper = new TasksListModel(tasks, tasksQuestions);
      const tasksLength = tasks.length;
      expect(wrapper.hasTasks(tasksLength)).toBe(true);
    });
  });
});
