/**
 * jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import QuestionItem from '../QuestionItem';

const props = {
  questionId: '3065f3b8-2540-48f8-937f-cd6ae377426a',
  approvalSectionTitle: 'new section',
  disabled: false,
  isQuesFreezed: true,
  archivedQuestion: {
    proposalId: '',
    questionId: '',
    questionText: 'Data Business Rule',
    answerConfiguration: {
      type: 'number'
    },
    answers: [],
    visible: true,
    active: true,
    questionHint: 'Adding the tool tip',
    questionHintJSON:
      '{"blocks":[{"key":"8eoaj","text":"Adding the tool tip","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
  },
  eventCategories: {
    dp: 'Unity Dashboard',
    plainPd: 'Proposal Detail',
    tb: 'ToolBar Menu',
    pg: 'Pagination',
    crmNo: 'Proposal Detail (CRM#: HAB72371)'
  },
  highlightQuestionId:
    '3065f3b8-2540-48f8-937f-cd6ae377426a-approval-91ecf807-94cd-4fb2-86db-9dd16172a3c2-left-ques'
};

describe('testing question item component in approval', () => {
  test('render the component without crashing without props', async () => {
    const { container } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <QuestionItem />
        </SocketContext.Provider>
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
          <QuestionItem {...props} />
        </SocketContext.Provider>
      </Provider>
    );
    expect(container).toBeInTheDocument();
    const iconButton = getByTestId('approval-icon-button');
    expect(iconButton).toBeInTheDocument();

    fireEvent.click(iconButton);
    const popover = getByTestId('popover-approval');
    expect(popover).toBeInTheDocument();
  });
});
