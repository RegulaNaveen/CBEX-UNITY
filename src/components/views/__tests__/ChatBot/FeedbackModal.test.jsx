import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import FeedbackModal, {
  FeedbackSubmitModal
} from '../../ChatBot/FeedbackModal';
import * as ChatboatApi from '../../../../api/chatbot';
import { CHATBOT } from '../../../../constants/app';

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

function RenderWithRedux() {
  return (
    <Provider store={store}>
      <FeedbackModal
        open
        onClose={() => {}}
        answer="Answer"
        setShowSubmitModal={() => {}}
      />
    </Provider>
  );
}

describe('FeedbackModal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    cleanup();
  });
  it('should render FeedbackModal', () => {
    render(<RenderWithRedux />);
    expect(screen.getByText('BidAssist Feedback')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('cancel-button'));
  });

  it('it should render with text change', () => {
    render(<RenderWithRedux />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();

    fireEvent.change(textbox, { target: { value: '' } });
    fireEvent.change(textbox, { target: { value: 'Feedback Added' } });
    expect(screen.getByText('Feedback Added')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submit-button'));
  });

  it('should render with error', async () => {
    ChatboatApi.submitFeedbackApi = jest.fn().mockImplementation(() => {
      return {
        status: 500,
        data: {
          message: 'Something went wrong!'
        }
      };
    });
    render(<RenderWithRedux />);

    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, { target: { value: 'Feedback for Error' } });

    fireEvent.click(screen.getByTestId('submit-button'));
    await waitFor(() => {
      expect(screen.getByText(CHATBOT.FEEDBACK_ERROR_MSG)).toBeInTheDocument();
    });
  });
});

describe('FeedbackSubmitModal', () => {
  it('should render FeedbackSubmitModal', () => {
    render(
      <Provider store={store}>
        <FeedbackSubmitModal open onClose={() => {}} />
      </Provider>
    );
    expect(screen.getByText('Feedback sent successfully!')).toBeInTheDocument();
  });
});
