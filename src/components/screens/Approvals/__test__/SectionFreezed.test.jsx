import React from 'react';
import { render } from '@testing-library/react';
import SectionFreezed from '../SectionFreezed';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';

const props = {
  id: '1',
  section_left_questions: [],
  section_right_questions: [],
  section_title: 'new section',
  archiveIndex: 0,
  section_id: '123'
};
describe('SectionFreezed', () => {
  test('render the component without crashing without props', async () => {
    const { container } = await render(
      <Provider store={store}>
        <SectionFreezed />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
  test('render the component without crashing with props', async () => {
    const { container, getByTestId } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <SectionFreezed {...props} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  test('check left question and right question', async () => {
    const { container, getByTestId } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <SectionFreezed
            ArchivedData={[]}
            ApprovalSectionTitle="Test-5"
            ApprovalSectionRightQuestions={
              ('8e89a496-c3c5-47ce-b193-b7406fbf9ae1',
              '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              '231be643-6814-4059-93bf-c9fb21b658f6')
            }
            ApprovalSectionOrder="15"
            ApprovalSectionId="f60eb2da-70a7-41e5-9fb3-37e02a6194d5"
            ApprovalSectionLeftQuestions={
              ('8e89a496-c3c5-47ce-b193-b7406fbf9ae1',
              '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              '231be643-6814-4059-93bf-c9fb21b658f6')
            }
          />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
});
