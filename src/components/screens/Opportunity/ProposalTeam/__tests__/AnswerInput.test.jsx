import React from 'react';
import sinon from 'sinon';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswerInput from '../AnswerInput';
import configureMockStore from 'redux-mock-store';
import { store } from '../../../../../store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { SocketContext } from '../../../../../context/SocketContext';
import {
  isSetQuestionLoading,
  getSelectedBid,
  getnoneditableField,
  getIntegrations,
  getShowNaCheckbox,
  getUserData
} from 'c:/Users/u1167299/project/unity-app-frontend/src/redux/selectors/proposal';
import {
  sfOptions,
  dummyQuestions
} from '../../../../../../src/components/screens/Approvals/__test__/data';
import * as Redux from 'react-redux';
import { act } from 'react-dom/test-utils';
import mockData from '../../__tests__/mockdata/QuestionContainer.json';
import { setSession } from '../../../../../SessionHandler';
import SystemIntegrations from '../../../../common/SystemIntegrations/SystemIntegrations';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn()
  };
});

let answerMap = new Map([
  ['questionId', 123],
  [
    'answer',
    new Map([
      ['a', 'abc'],
      ['x', new Map([['answer', 'abc']])]
    ])
  ]
]);

const props = {
  isNotepadOpen: false,
  trackEvent: jest.fn(),
  eventCategories: [],
  proposalId: '123',
  proposalDetail: {},
  isNotApplicable: false,
  milestoneCond: false,
  NaLoading: false,
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
  sectionName: '',
  questionText: '',
  events: [],
  questionJSON: {},
  isCustomQuestion: false,
  notApplicable: false,
  questionData: {
    questionLockInfo: {
      userInfo: 'test@example.com'
    }
  },
  section: {},
  milestoneNew: {},
  allSections: [],
  answerConfiguration: {},
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
      });
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
