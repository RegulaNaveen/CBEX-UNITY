import React from 'react';
import { shallow } from 'enzyme';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import ReduxSnackbar from '../ReduxSnackbar/ReduxSnackbar';
import {
  selectSnackbarKey,
  selectSnackbarMessage,
  selectSnackbarOpen,
  selectSnackbarOptions
} from '../../../redux/selectors/ui';

import { UI } from '../../../constants/types';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('ReduxSnackbar', () => {
  it('should render correctly', () => {
    useSelector.mockReturnValueOnce(true);
    const wrapper = shallow(<ReduxSnackbar />);
    expect(wrapper.exists()).toBe(true);
  });
  it('should dispatch the hide snackbar action on close', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValueOnce(true);
    useSelector.mockReturnValueOnce('test message');
    useSelector.mockReturnValueOnce('test key');
    useSelector.mockReturnValueOnce({});

    const wrapper = shallow(<ReduxSnackbar />);
    wrapper.find('Alert').simulate('close');
    expect(mockDispatch).toHaveBeenCalledWith({ type: UI.HIDE_SNACKBAR });
  });

  it('should render Snackbar component with message when open is true', () => {
    const message = 'Test Message';
    const key = 'test-key';
    const restProps = {
      autoHideDuration: 5000,
      anchorOrigin: { vertical: 'top', horizontal: 'left' }
    };
    useSelector.mockImplementation(selector => {
      if (selector === selectSnackbarOpen) {
        return true;
      } else if (selector === selectSnackbarMessage) {
        return message;
      } else if (selector === selectSnackbarKey) {
        return key;
      } else if (selector === selectSnackbarOptions) {
        return restProps;
      }
    });

    const wrapper = shallow(<ReduxSnackbar />);
    const snackbarWrapper = wrapper.find(Snackbar);
    // const alertWrapper = snackbarWrapper.find(MuiAlert);

    expect(snackbarWrapper.prop('open')).toBe(true);
    expect(snackbarWrapper.prop('autoHideDuration')).toBe(
      restProps.autoHideDuration
    );
    expect(snackbarWrapper.prop('anchorOrigin')).toBe(restProps.anchorOrigin);
    expect(snackbarWrapper.prop('onClose')).toBeInstanceOf(Function);
  });
});
