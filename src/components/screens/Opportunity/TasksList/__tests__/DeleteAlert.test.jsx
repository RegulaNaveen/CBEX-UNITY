import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import DeleteAlert from '../DeleteAlert';
import { Provider } from 'react-redux';
import Sinon from 'sinon';
import * as TaskApis from '../../../../../api/tasksList';
import { store } from '../../../../../store';

const DeleteAlertWithRedux = props => (
  <Provider store={store}>
    <DeleteAlert {...props} />
  </Provider>
);

describe('DeleteAlert Unit Tests', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  test('should show alert msg on render', async () => {
    const { getByText } = render(
      <DeleteAlertWithRedux
        task={{ proposal_id: 'test', task_id: 'test' }}
        open
        onClose={() => {}}
      />
    );
    await waitFor(() => {
      expect(
        getByText('Are you sure you want to delete this task item?')
      ).toBeInTheDocument();
    });
  });

  test('should close modal without error on success', async () => {
    sinonSandbox.stub(TaskApis, 'deleteTaskApi').resolves({ status: 200 });
    const closeFn = jest.fn();
    const { getByText } = render(
      <DeleteAlertWithRedux
        task={{ proposal_id: 'test', task_id: 'test' }}
        open
        onClose={closeFn}
      />
    );
    await waitFor(() => {
      expect(
        getByText('Are you sure you want to delete this task item?')
      ).toBeInTheDocument();
    });
    const deleteBtn = getByText('Yes, Delete');
    await fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(closeFn).toHaveBeenCalled();
    });
  });

  test('should close modal without error on failure', async () => {
    sinonSandbox.stub(TaskApis, 'deleteTaskApi').rejects({ status: 500 });
    const closeFn = jest.fn();
    const { getByText } = render(
      <DeleteAlertWithRedux
        task={{ proposal_id: 'test', task_id: 'test' }}
        open
        onClose={closeFn}
      />
    );
    await waitFor(() => {
      expect(
        getByText('Are you sure you want to delete this task item?')
      ).toBeInTheDocument();
    });
    const deleteBtn = getByText('Yes, Delete');
    await fireEvent.click(deleteBtn);
    await waitFor(() => {
      expect(closeFn).toHaveBeenCalled();
    });
  });

  test('should close modal on clicking cancel', async () => {
    sinonSandbox.stub(TaskApis, 'deleteTaskApi').rejects({ status: 500 });
    const closeFn = jest.fn();
    const { getByText } = render(
      <DeleteAlertWithRedux
        task={{ proposal_id: 'test', task_id: 'test' }}
        open
        onClose={closeFn}
      />
    );
    await waitFor(() => {
      expect(
        getByText('Are you sure you want to delete this task item?')
      ).toBeInTheDocument();
    });
    const cancelBtn = getByText('Cancel');
    await fireEvent.click(cancelBtn);
    await waitFor(() => {
      expect(closeFn).toHaveBeenCalled();
    });
  });
});
