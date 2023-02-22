import React from 'react';
import { render, mount } from 'enzyme';
import { Provider } from 'react-redux';
import CustomLoader from '../CustomLoader';
import store from '../../../../store';

describe.skip('CustomLoader', () => {
  it('should render without errors', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CustomLoader questionId="1" />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should not render the Loader when approvalQuestionLoading is false', () => {
    const wrapper = shallow(<CustomLoader questionId="1" />);
    wrapper.setProps({
      approvalQuestionLoading: { questionId: '1', value: false }
    });
    expect(wrapper.find('.loader-cover').children().length).toBe(0);
  });

  it('should render the Loader when approvalQuestionLoading is true', () => {
    const wrapper = shallow(<CustomLoader questionId="1" />);
    wrapper.setProps({
      approvalQuestionLoading: { questionId: '1', value: true }
    });
    expect(wrapper.find('.loader-cover').children().length).toBe(1);
  });

  it('should not re-render when the questionId prop has not changed', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      CustomLoader.prototype,
      'shouldComponentUpdate'
    );
    const wrapper = shallow(<CustomLoader questionId="1" />);
    wrapper.setProps({ questionId: '1' });
    expect(shouldComponentUpdateSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
    expect(shouldComponentUpdateSpy).toHaveLastReturnedWith(false);
    shouldComponentUpdateSpy.mockRestore();
  });

  it('should re-render when the questionId prop has changed', () => {
    const shouldComponentUpdateSpy = jest.spyOn(
      CustomLoader.prototype,
      'shouldComponentUpdate'
    );
    const wrapper = shallow(<CustomLoader questionId="1" />);
    wrapper.setProps({ questionId: '2' });
    expect(shouldComponentUpdateSpy).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
    expect(shouldComponentUpdateSpy).toHaveLastReturnedWith(true);
    shouldComponentUpdateSpy.mockRestore();
  });
});
