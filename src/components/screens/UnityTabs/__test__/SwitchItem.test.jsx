import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import sinon from 'sinon';
import '@testing-library/jest-dom/extend-expect';
import SwitchItem from '../SwitchItem';
import { fromJS } from 'immutable';
import { act } from 'react-dom/test-utils';

// Mock react-redux hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: () => jest.fn()
}));

jest.mock('../QuestionItem', () => {
  return ({ dataTestId }) => (
    <div data-testid={dataTestId}>Mock Question Item</div>
  );
});

jest.mock('../StatementItem', () => {
  return ({ dataTestId }) => (
    <div data-testid={dataTestId}>Mock Statement Item</div>
  );
});

describe('<SwitchItem />', () => {
  let useSelectorStub;

  beforeEach(() => {
    useSelectorStub = sinon.stub();
    useSelector.mockImplementation(useSelectorStub);
  });

  afterEach(() => {
    useSelectorStub.reset();
  });

  it('does not renders StatementItem', () => {
    useSelectorStub.returns(
      fromJS({
        answerConfiguration: {
          type: 'statement'
        }
      })
    );

    act(() => {
      const { queryByTestId } = render(<SwitchItem />);
      expect(queryByTestId('question-item')).not.toBeInTheDocument();
    });
  });

  it('does not renders QuestionItem ', () => {
    useSelectorStub.returns(
      fromJS({
        answerConfiguration: {
          type: 'text'
        }
      })
    );
    act(() => {
      const { queryByTestId, getByTestId } = render(<SwitchItem />);
      expect(queryByTestId('statement-item')).not.toBeInTheDocument();
    });
  });
});
