import React from 'react';
import { mount } from 'enzyme';
import ProgressIndicator from '../ProgressIndicator';

describe('ProgressIndicator', () => {
  it('renders without crashing', () => {
    const taskList = {
      1: {
        expanded: true,
        date: '2024-02-13T09:36:15.908Z',
        dateFormatted: '13 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -2
      },
      2: {
        expanded: false,
        date: '2024-02-14T09:36:15.908Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -1
      },
      3: {
        expanded: false,
        date: '2024-02-15T09:36:15.908Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 0
      },
      4: {
        expanded: false,
        date: '2024-02-16T09:36:15.908Z',
        dateFormatted: '16 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 1
      },
      5: {
        expanded: false,
        date: '2024-02-17T09:36:15.908Z',
        dateFormatted: '17 Feb',
        uncompletedCount: 10,
        completedCount: 0,
        dayDiffFromToday: 2
      },
      6: {
        expanded: false,
        date: '2024-02-18T09:36:15.908Z',
        dateFormatted: '18 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 3
      },
      7: {
        expanded: false,
        date: '2024-02-19T09:36:15.908Z',
        dateFormatted: '19 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 4
      },
      8: {
        expanded: false,
        date: '2024-02-20T09:36:15.908Z',
        dateFormatted: '20 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 5
      },
      9: {
        expanded: false,
        date: '2024-02-21T09:36:15.908Z',
        dateFormatted: '21 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 6
      },
      10: {
        expanded: false,
        date: '2024-02-22T09:36:15.908Z',
        dateFormatted: '22 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 7
      }
    };
    const wrapper = mount(<ProgressIndicator tasksList={taskList} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should check till day 10 with all completed and uncompleted tasks', () => {
    const taskList = {
      1: {
        expanded: true,
        date: '2024-02-13T09:36:15.908Z',
        dateFormatted: '13 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -9
      },
      2: {
        expanded: false,
        date: '2024-02-14T09:36:15.908Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -8
      },
      3: {
        expanded: false,
        date: '2024-02-15T09:36:15.908Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -7
      },
      4: {
        expanded: false,
        date: '2024-02-16T09:36:15.908Z',
        dateFormatted: '16 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -6
      },
      5: {
        expanded: false,
        date: '2024-02-17T09:36:15.908Z',
        dateFormatted: '17 Feb',
        uncompletedCount: 10,
        completedCount: 0,
        dayDiffFromToday: -5
      },
      6: {
        expanded: false,
        date: '2024-02-18T09:36:15.908Z',
        dateFormatted: '18 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -4
      },
      7: {
        expanded: false,
        date: '2024-02-19T09:36:15.908Z',
        dateFormatted: '19 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -3
      },
      8: {
        expanded: false,
        date: '2024-02-20T09:36:15.908Z',
        dateFormatted: '20 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -2
      },
      9: {
        expanded: false,
        date: '2024-02-21T09:36:15.908Z',
        dateFormatted: '21 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -1
      },
      10: {
        expanded: false,
        date: '2024-02-22T09:36:15.908Z',
        dateFormatted: '22 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 0
      }
    };
    const wrapper = mount(<ProgressIndicator tasksList={taskList} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should check for previous bids', () => {
    const taskList = {
      1: {
        expanded: true,
        date: '2024-02-13T09:36:15.908Z',
        dateFormatted: '13 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -9
      },
      2: {
        expanded: false,
        date: '2024-02-14T09:36:15.908Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -8
      },
      3: {
        expanded: false,
        date: '2024-02-15T09:36:15.908Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -7
      },
      4: {
        expanded: false,
        date: '2024-02-16T09:36:15.908Z',
        dateFormatted: '16 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -6
      },
      5: {
        expanded: false,
        date: '2024-02-17T09:36:15.908Z',
        dateFormatted: '17 Feb',
        uncompletedCount: 10,
        completedCount: 0,
        dayDiffFromToday: -5
      },
      6: {
        expanded: false,
        date: '2024-02-18T09:36:15.908Z',
        dateFormatted: '18 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -4
      },
      7: {
        expanded: false,
        date: '2024-02-19T09:36:15.908Z',
        dateFormatted: '19 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -3
      },
      8: {
        expanded: false,
        date: '2024-02-20T09:36:15.908Z',
        dateFormatted: '20 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -2
      },
      9: {
        expanded: false,
        date: '2024-02-21T09:36:15.908Z',
        dateFormatted: '21 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -1
      },
      10: {
        expanded: false,
        date: '2024-02-22T09:36:15.908Z',
        dateFormatted: '22 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -3
      }
    };
    const wrapper = mount(<ProgressIndicator tasksList={taskList} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should check No Tasks Assigned Till Date', () => {
    const taskList = {
      1: {
        expanded: true,
        date: '2024-02-13T09:36:15.908Z',
        dateFormatted: '13 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 1
      },
      2: {
        expanded: false,
        date: '2024-02-14T09:36:15.908Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 2
      },
      3: {
        expanded: false,
        date: '2024-02-15T09:36:15.908Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 1
      },
      4: {
        expanded: false,
        date: '2024-02-16T09:36:15.908Z',
        dateFormatted: '16 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 2
      },
      5: {
        expanded: false,
        date: '2024-02-17T09:36:15.908Z',
        dateFormatted: '17 Feb',
        uncompletedCount: 10,
        completedCount: 0,
        dayDiffFromToday: 3
      },
      6: {
        expanded: false,
        date: '2024-02-18T09:36:15.908Z',
        dateFormatted: '18 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 4
      },
      7: {
        expanded: false,
        date: '2024-02-19T09:36:15.908Z',
        dateFormatted: '19 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 5
      },
      8: {
        expanded: false,
        date: '2024-02-20T09:36:15.908Z',
        dateFormatted: '20 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 6
      },
      9: {
        expanded: false,
        date: '2024-02-21T09:36:15.908Z',
        dateFormatted: '21 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 7
      },
      10: {
        expanded: false,
        date: '2024-02-22T09:36:15.908Z',
        dateFormatted: '22 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 8
      }
    };
    const wrapper = mount(<ProgressIndicator tasksList={taskList} />);
    expect(wrapper.exists()).toBe(true);
  });
});
