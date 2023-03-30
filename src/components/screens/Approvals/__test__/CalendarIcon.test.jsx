import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import CalendarIcon from '../CalendarIcon';
import { Provider } from 'react-redux';
import { store } from '../../../../store';

const CalendarIconWithStore = props => {
  return (
    <Provider store={store}>
      <CalendarIcon {...props} />
    </Provider>
  );
};

describe('CalendarIcon', () => {
  it('renders the noanswers icon when last answer is an empty object', () => {
    const question = { answers: [{}] };
    const { getByTestId } = render(
      <CalendarIconWithStore question={question} />
    );
    expect(getByTestId('noanswers-icon')).toBeInTheDocument();
  });

  it('renders the unity-predicted-calender-icon when the last answer is predicted by Unity', () => {
    const question = {
      answers: [{ answer: 'Some answer', userName: 'UnityPredictedAnswer' }]
    };
    const { getByTestId } = render(
      <CalendarIconWithStore question={question} />
    );
    expect(getByTestId('unity-predicted-calender-icon')).toBeInTheDocument();
  });

  it('renders the unity-nonpredicted-calender-icon when the last answer is not predicted by Unity', () => {
    const question = {
      answers: [{ answer: 'Some answer', userName: 'Some User' }]
    };
    const { getByTestId } = render(
      <CalendarIconWithStore question={question} />
    );
    expect(getByTestId('unity-nonpredicted-calender-icon')).toBeInTheDocument();
  });

  it('renders the indeterminate icon when the last answer is empty or has spaces', () => {
    const question = {
      answers: [{ answer: '  ' }]
    };
    const { getByTestId } = render(
      <CalendarIconWithStore question={question} />
    );
    expect(getByTestId('unity-nonpredicted-calender-icon')).toBeInTheDocument();
  });
});
