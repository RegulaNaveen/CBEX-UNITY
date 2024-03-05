import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HistoryModal from '../HistoryModal';
import { Provider } from 'react-redux';
import { store } from '../../../../../store';
import * as TaskApis from '../../../../../api/tasksList';
import Sinon from 'sinon';

const HistoryModalWithRedux = props => (
  <Provider store={store}>
    <HistoryModal {...props} />
  </Provider>
);

describe('HistoryModal', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });
  it('should show modal on render with useEffect if condition', () => {
    sinonSandbox.stub(TaskApis, 'getTaskHistoryApi').resolves({
      result: [
        {
          id: 450,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'description',
          value: {
            newValue: '',
            oldValue: 'Task 2'
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T08:52:03.688Z',
          updated_date: '2024-03-04T08:52:03.688Z'
        },
        {
          id: 445,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'reorder',
          value: {
            newValue: {
              no_of_units: 1
            },
            oldValue: {
              no_of_units: 1
            }
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T11:11:58.967Z',
          updated_date: '2024-03-04T11:11:58.967Z'
        },
        {
          id: 448,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'task_role',
          value: {
            newValue: [
              {
                name: 'Srinivas Manchikatla',
                email: 'srinivas.manchikatla@iqvia.com'
              },
              {
                name: 'Sushil Munda',
                email: 'sushil.munda@iqvia.com'
              }
            ],
            oldValue: [
              {
                name: 'Srinivas Manchikatla',
                email: 'srinivas.manchikatla@iqvia.com'
              },
              {
                name: 'Test User',
                email: 'test@iqvia.com'
              }
            ]
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T11:11:58.967Z',
          updated_date: '2024-03-04T11:11:58.967Z'
        },
        {
          id: 445,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'reorder',
          value: {
            newValue: {
              no_of_units: 2
            },
            oldValue: {
              no_of_units: 1
            }
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T11:11:58.967Z',
          updated_date: '2024-03-04T11:11:58.967Z'
        },
        {
          id: 444,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'is_completed',
          value: {
            newValue: true,
            oldValue: true
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T11:11:58.967Z',
          updated_date: '2024-03-04T11:11:58.967Z'
        },
        {
          id: 443,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'is_completed',
          value: {
            newValue: true,
            oldValue: false
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T11:11:55.747Z',
          updated_date: '2024-03-04T11:11:55.747Z'
        },
        {
          id: 425,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'description',
          value: {
            newValue: 'Task 2.1',
            oldValue: 'Task 2'
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T08:52:03.688Z',
          updated_date: '2024-03-04T08:52:03.688Z'
        },
        {
          id: 424,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'is_completed',
          value: {
            newValue: false,
            oldValue: true
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T08:51:46.627Z',
          updated_date: '2024-03-04T08:51:46.627Z'
        },
        {
          id: 349,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'is_completed',
          value: {
            newValue: true,
            oldValue: false
          },
          updated_by: 'Srinivas Manchikatla',
          updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
          created_date: '2024-03-04T04:43:16.719Z',
          updated_date: '2024-03-04T04:43:16.719Z'
        },
        {
          id: 321,
          task_list_id: 793,
          proposal_id: 'a39cda60-19a9-45bf-9a52-dd78df5dfa55',
          task_id: '5a803fb3-3089-40b8-95e0-63f0ff598d7f',
          action: 'task_created',
          value: {
            newValue: {
              order: 5,
              description: 'Task 2',
              no_of_units: 1
            },
            oldValue: null
          },
          updated_by: 'Pooja Chahar',
          updated_by_email: 'pooja.chahar@iqvia.com',
          created_date: '2024-03-01T14:16:27.633Z',
          updated_date: '2024-03-01T14:16:27.633Z'
        }
      ]
    });
    const wrapper = render(
      <HistoryModalWithRedux
        isHistoryModalOpen={true}
        closeHistoryModal={() => {}}
        taskId={'1'}
        proposalId={'1'}
      />
    );
    expect(wrapper.getByText('History')).toBeInTheDocument();
  });
  it('should check useEffect else condition', () => {
    const wrapper = render(
      <HistoryModalWithRedux
        isHistoryModalOpen={true}
        closeHistoryModal={() => {}}
        taskId={''}
        proposalId={'1'}
      />
    );
    expect(wrapper.getByText('History')).toBeInTheDocument();
  });
  it('should check taskHistory is empty', () => {
    sinonSandbox.stub(TaskApis, 'getTaskHistoryApi').resolves({
      result: []
    });
    const wrapper = render(
      <HistoryModalWithRedux
        isHistoryModalOpen={true}
        closeHistoryModal={() => {}}
        taskId={'1'}
        proposalId={'1'}
      />
    );
    const closeBtn = wrapper.getByText('Close');
    fireEvent.click(closeBtn);
    const closeBtn1 = wrapper.getByTestId('close-history-modal');
    fireEvent.click(closeBtn1);
  });
  it('should check taskHistory is empty', () => {
    const wrapper = render(
      <HistoryModalWithRedux
        isHistoryModalOpen={false}
        closeHistoryModal={() => {}}
        taskId={'1'}
        proposalId={'1'}
      />
    );
    expect(wrapper.queryByText('History')).toBeNull();
  });
});
