import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import CustomLoader from '../CustomLoader';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
const props = {
  questionId: 'a932540b-b6ec-4182-82fb-aae5b7e0d027'
};

describe('CustomLoader', () => {
  it('should render section', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CustomLoader />
      </Provider>
    );
  });
  it('check loader', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CustomLoader props={props} />
      </Provider>
    );
    expect(wrapper.find('.loader').length).toBe(0);
  });
});
