import React from 'react';
import { mount } from 'enzyme';
import ProgressIndicator from '../ProgressIndicator';
import { store } from '../../../../../store';
import { Provider } from 'react-redux';

describe('ProgressIndicator', () => {
  it('should check for empty days', () => {
    const taskList = {};
    const wrapper = mount(
      <Provider store={store}>
        <ProgressIndicator tasksList={taskList} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const taskList = {
      1: {
        expanded: true,
        date: '2024-02-13T09:36:15.908Z',
        dateFormatted: '13 Feb',
        uncompletedCount: 2,
        completedCount: 2,
        dayDiffFromToday: -1,
        tasks: [
          {
            no_of_units: 1
          }
        ]
      },
      2: {
        expanded: false,
        date: '2024-02-14T09:36:15.908Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 2,
        completedCount: 0,
        dayDiffFromToday: 0,
        tasks: [
          {
            no_of_units: 2
          }
        ]
      },
      3: {
        expanded: false,
        date: '2024-02-15T09:36:15.908Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 1,
        tasks: [
          {
            no_of_units: 3
          }
        ]
      }
    };
    const wrapper = mount(
      <Provider store={store}>
        <ProgressIndicator tasksList={taskList} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('should check after bid creation date', () => {
    const taskList = {
      1: {
        expanded: true,
        date: '2024-02-13T09:36:15.908Z',
        dateFormatted: '13 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 3,
        tasks: [
          {
            no_of_units: 1
          }
        ]
      },
      2: {
        expanded: false,
        date: '2024-02-14T09:36:15.908Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 4,
        tasks: [
          {
            no_of_units: 2
          }
        ]
      },
      3: {
        expanded: false,
        date: '2024-02-15T09:36:15.908Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 2,
        completedCount: 0,
        dayDiffFromToday: 5,
        tasks: [
          {
            no_of_units: 3
          }
        ]
      }
    };
    const wrapper = mount(
      <Provider store={store}>
        <ProgressIndicator tasksList={taskList} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it('should check for previous bids', () => {
    const taskList = {
      1: {
        tasks: [
          {
            no_of_units: 1
          }
        ],
        expanded: false,
        date: '2024-02-14T12:14:07.989Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 4,
        dayDiffFromToday: -16
      },
      2: {
        tasks: [
          {
            no_of_units: 2
          }
        ],
        expanded: false,
        date: '2024-02-15T12:14:07.989Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 2,
        dayDiffFromToday: -15
      }
    };
    const wrapper = mount(
      <Provider store={store}>
        <ProgressIndicator tasksList={taskList} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should check total tasks count', () => {
    const taskList = {
      1: {
        tasks: [
          {
            no_of_units: 1
          }
        ],
        expanded: false,
        date: '2024-02-14T12:14:07.989Z',
        dateFormatted: '14 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: -1
      },
      2: {
        tasks: [
          {
            no_of_units: 2
          }
        ],
        expanded: false,
        date: '2024-02-15T12:14:07.989Z',
        dateFormatted: '15 Feb',
        uncompletedCount: 0,
        completedCount: 0,
        dayDiffFromToday: 0
      }
    };
    const wrapper = mount(
      <Provider store={store}>
        <ProgressIndicator tasksList={taskList} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should check for last Day', () => {
    const taskList = {
      1: {
        tasks: [],
        dayDiffFromToday: 0
      },
      2: {
        tasks: [],
        dayDiffFromToday: 1
      },
      3: {
        tasks: [],
        dayDiffFromToday: 2
      },
      4: {
        tasks: [],
        dayDiffFromToday: 5
      },
      5: {
        tasks: [],
        dayDiffFromToday: 6
      },
      6: {
        tasks: [],
        dayDiffFromToday: 7
      },
      7: {
        tasks: [],
        dayDiffFromToday: 8
      },
      8: {
        tasks: [],
        dayDiffFromToday: 9
      },
      9: {
        tasks: [],
        dayDiffFromToday: 12
      },
      10: {
        tasks: [],
        dayDiffFromToday: 13
      },
      11: {
        tasks: [],
        dayDiffFromToday: 14
      },
      12: {
        tasks: [],
        dayDiffFromToday: 15
      },
      13: {
        tasks: [],
        dayDiffFromToday: 16
      },
      14: {
        tasks: [],
        dayDiffFromToday: 19
      },
      15: {
        tasks: [],
        dayDiffFromToday: 20
      },
      16: {
        tasks: [],
        dayDiffFromToday: 21
      },
      17: {
        tasks: [],
        dayDiffFromToday: 22
      },
      18: {
        tasks: [],
        dayDiffFromToday: 23
      },
      19: {
        tasks: [],
        dayDiffFromToday: 26
      },
      20: {
        tasks: [
          {
            no_of_units: 20
          }
        ],
        dayDiffFromToday: 27
      }
    };
    const wrapper = mount(
      <Provider store={store}>
        <ProgressIndicator tasksList={taskList} />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
