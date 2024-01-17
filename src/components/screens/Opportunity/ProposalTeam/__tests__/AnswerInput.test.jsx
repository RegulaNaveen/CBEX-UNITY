import React from 'react';
import { render } from '@testing-library/react';
import AnswerInput from '../AnswerInput';
import { store } from '../../../../../store';
import { Provider } from 'react-redux';
import { SocketContext } from '../../../../../context/SocketContext';
import * as Redux from 'react-redux';
import { setSession } from '../../../../../SessionHandler';
//import SystemIntegrations from '../../../../common/SystemIntegrations/SystemIntegrations';
//import SFAnswerValidationWrapper from '../../../../common/SFAnswerValidationWrapper'

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
  };
});

// let answerMap = new Map([
//   ['questionId', 123],
//   [
//     'answer',
//     new Map([
//       ['a', 'abc'],
//       ['x', new Map([['answer', 'abc']])]
//     ])
//   ]
// ]);

const props = {
  isNotepadOpen: false,
  trackEvent: jest.fn(),
  eventCategories: [],
  proposalId: '123',
  proposalDetail: {},
  isNotApplicable: false,
  milestoneCond: false,
  NaLoading: true,
  sficon: false,
  currentSFAnswer: '',
  lastAns: 'green',
  milestone: 'someLabel',
  qvicon: false,
  answers: null,
  loading: false,
  sfObject: {},
  questionHint: '',
  questionHintJSON: {},
  questionHTML: '',
  sectionName: 'sectionName',
  questionText: 'questionText',
  events: [],
  questionJSON: {},
  isCustomQuestion: false,
  notApplicable: false,
  questionData: {
    questionLockInfo: {
      userInfo: 'test@example.com'
    },
    hasDifferentSFanswer: true
  },
  section: {},
  milestoneNew: {},
  allSections: [],
  answerConfiguration: {
    type: 'text' || 'number' || 'date'
  },
  roleNames: [],
  questionLockInfo: {},
  questionId: '123'
};

const AnswerInputWithStore = () => (
  <Provider store={store}>
    <SocketContext.Provider
      value={{
        questionLockWrapper: () => false
      }}
    >
      <AnswerInput {...props} />
    </SocketContext.Provider>
  </Provider>
);

jest.mock(
  '../../../../common/SystemIntegrations/SystemIntegrations',
  () => () => <p>SystemIntegrations</p>
);

jest.mock('../../../../common/SFAnswerValidationWrapper', () => () => (
  <p>SFAnswerValidationWrapper</p>
));
describe('AnswerInput', () => {
  let myMap = new Map([
    ['isCurrent', true],
    ['isEditable', true]
  ]);

  it('handles user input correctly', () => {
    jest
      .spyOn(Redux, 'useSelector')
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce(myMap)
      .mockReturnValueOnce({
        data: [
          {
            questionId: '123'
          },
          {
            questionId: '456'
          }
        ]
      })
      .mockReturnValueOnce(true);
    // Render the component
    setSession(
      'admin',
      'access-token',
      'jwt',
      'refresh-token',
      'test@example.com',
      'Test User'
    );
    const { container, getByTestId } = render(<AnswerInputWithStore />);
    //const inputElement = getByTestId('answer-input');
  });
});
