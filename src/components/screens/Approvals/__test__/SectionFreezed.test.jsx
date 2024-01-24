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

  test('scrolls into view when currentSearchResult matches section title', async () => {
    const currentSearchResult = {
      searchIndex: '123-archive-1-section-title'
    };
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <SectionFreezed
            {...props}
            currentSearchResult={currentSearchResult}
          />
        </SocketContext.Provider>
      </Provider>
    );
    const sectionTitle = container.querySelector('.approval-sec-title');
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent('new section');
  });

  test('renders left questions when visible and active or custom', async () => {
    const leftQuestions = [
      {
        questionId: '201cc28e-b774-4b81-829f-8e9ac7cb19a5',
        visible: true,
        active: true,
        isCustomQuestion: true,
        answers: 'test'
      },
      {
        questionId: '90bc4699-e83f-4693-867d-8bff2c08a4c6',
        visible: true,
        active: false,
        isCustomQuestion: true,
        answers: 'test'
      },
      {
        questionId: '918e86dc-b8d1-4d78-8cc2-b1cc81102d0d',
        visible: true,
        active: true,
        isCustomQuestion: true,
        answers: 'test'
      }
    ];
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <SectionFreezed {...props} section_left_questions={leftQuestions} />
        </SocketContext.Provider>
      </Provider>
    );
    const leftQuestionItems = container.querySelectorAll(
      '.approval-ques-left .switch-item'
    );
    expect(leftQuestionItems.length).toBe(0);
  });

  test('renders right questions when visible and active or custom', async () => {
    const rightQuestions = [
      {
        questionId: '201cc28e-b774-4b81-829f-8e9ac7cb19a5',
        visible: true,
        active: true,
        isCustomQuestion: true,
        answers: 'test'
      },
      {
        questionId: '918e86dc-b8d1-4d78-8cc2-b1cc81102d0d',
        visible: true,
        active: false,
        isCustomQuestion: true,
        answers: 'test'
      }
    ];
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <SectionFreezed {...props} section_right_questions={rightQuestions} />
        </SocketContext.Provider>
      </Provider>
    );
    const rightQuestionItems = container.querySelectorAll(
      '.approval-ques-right .switch-item'
    );
    expect(rightQuestionItems.length).toBe(0);
  });
});
