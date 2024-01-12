/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import {
  cleanup,
  screen,
  render,
  waitFor,
  fireEvent
} from '@testing-library/react';

import * as data from './data.json';
import { API } from '../../../../constants';
import { REDUX_TYPES } from '../../../../constants';
import { axiosInstance, store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';
import AnswerHistory from '../AnswerHistory';

const question = fromJS(data.question);
const closeModal = jest.fn();
let initalstate = {
  question,
  closeModal,
  isQuesFreezed: true
};

const AnswerHistoryWithStore = props => (
  <Provider store={store}>
    <SocketContext.Provider
      value={{
        socket: null,
        questionLockWrapper: jest.fn(),
        questionUnlockWrapper: jest.fn(),
        questionAnswerUpdateWrapper: jest.fn()
      }}
    >
      <AnswerHistory {...props} />
    </SocketContext.Provider>
  </Provider>
);

const proposalId = 'e7071fa9-a5e3-4708-bc52-211e6c0f6c5b';
const questionIdText = '3cfdde7c-8e5f-4101-afe2-04e9f703194b';
const questionIdDate = 'a9431c40-4dd9-44ea-b9e2-68fce5a1fef7';
const questionIdPicklist = '65160600-e743-40c1-8eae-4e52f520e9bf';
axiosInstance.get = jest.fn().mockImplementation(url => {
  switch (url) {
    case `${API.PROPOSAL.PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionIdText}`:
      return Promise.resolve({
        status: 200,
        data: data.textquestion.answers
      });
    case `${API.PROPOSAL.PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionIdDate}`:
      return Promise.resolve({
        status: 200,
        data: data.datequestion.answers
      });
    case `${API.PROPOSAL.PROPOSAL_QUESTIONS_API_URL}/${proposalId}/${questionIdPicklist}`:
      return Promise.resolve({
        status: 200,
        data: data.picklistquestion.answers
      });
    default:
      return Promise.reject({ status: 404 });
  }
});

axiosInstance.put = jest.fn().mockResolvedValue({ data: [] });

describe('Answer History component', () => {
  window.history.pushState(
    {},
    '',
    '/opportunities/JAB52914?bidNo=1&bidType=Clinical_Bid'
  );
  act(() => {
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.OPPORTUNITY_INFO,
      payload: data.opportunityData
    });
    store.dispatch({
      type: REDUX_TYPES.PROPOSAL.PROPOSAL_INFO,
      payload: {
        proposal: data.opportunityData[0].proposal,
        proposalQuestions: [data.textquestion],
        isFavourite: false,
        customName: ''
      }
    });
  });
  test('Answer History component Load', async () => {
    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });
  });
  test('If Answer is number', async () => {
    data.question = data.numberquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Validated answer derived from RFI 1')
      ).toBeInTheDocument();
    });
  });
  test('If Answer is select', async () => {
    data.question = data.selectquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });
  });
  test('If Answer is empty', async () => {
    data.question.answers = [];
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });
  });
  test('If Answer is text with carry forward | accept click', async () => {
    data.question = data.textquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal,
      forceBlur: true,
      toggleWatch: jest.fn()
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Answer derived from RFI 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Accept'));
    await waitFor(() => {
      expect(
        screen.getAllByText('Associated CRM Numbers')[0]
      ).toBeInTheDocument();
    });
  });
  test('If Answer is text with carry forward | reject click', async () => {
    data.question = data.textquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal,
      forceBlur: true,
      toggleWatch: jest.fn()
    };
    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });
    await waitFor(() => {
      // expect(axiosInstance.get).toHaveBeenCalledTimes(3);
      expect(screen.getByText('Answer derived from RFI 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reject'));
    await waitFor(() => {
      expect(
        screen.getAllByText('Associated CRM Numbers')[0]
      ).toBeInTheDocument();
    });
  });
  test('If Answer is date with unity predicted | accept click', async () => {
    data.question = data.datequestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(screen.getByText('MAP Call')).toBeInTheDocument();
      expect(screen.getByText('26-Dec-2023')).toBeInTheDocument();
      expect(screen.getByText('Unity Predicted Answer')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Accept'));
  });
  test('If Answer is date with unity predicted | reject click', async () => {
    data.question = data.datequestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(screen.getByText('26-Dec-2023')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Reject'));
  });
  test('If Answer is picklist with carry forward | accepted', async () => {
    data.question = data.picklistquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Validated answer derived from Early Engagement 1')
      ).toBeInTheDocument();
    });
  });
  test('If Answer is picklist look up with carry forward | rejected', async () => {
    data.question = data.picklistlookupquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Multi Select Lookup')).toBeInTheDocument();
      expect(
        screen.getByText('Rejected answer not derived from RFI 1')
      ).toBeInTheDocument();
    });
  });
  test('If Answer is single select lookup with carry forward | accept click', async () => {
    data.question = data.singleselectlookupquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Answer derived from RFI 1')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Accept'));
    });
  });
  test('If Answer is single select lookup with carry forward | reject click', async () => {
    data.question = data.singleselectlookupquestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Answer derived from RFI 1')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Reject'));
    });
  });

  test.skip('for table answer type', async () => {
    data.question = data.tablequestion;
    const question = fromJS(data.question);
    const closeModal = jest.fn();
    let initalstate = {
      question,
      closeModal
    };

    await act(async () => {
      render(<AnswerHistoryWithStore {...initalstate} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Dates and Times are per the server (EST)')
      ).toBeInTheDocument();
      // fireEvent.click(screen.getByText('Reject'));
    });
  });
  afterAll(cleanup);
});
