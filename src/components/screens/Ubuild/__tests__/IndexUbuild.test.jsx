import React from 'react';
import { shallow } from 'enzyme';
import { UbuildShell } from '../index';
import Toolbar from '../../../views/UbuildToolbar';

describe('UbuildShell', () => {
  let props;
  let mountedUbuildShell;

  const ubuildShell = () => {
    if (!mountedUbuildShell) {
      mountedUbuildShell = shallow(<UbuildShell {...props} />);
    }
    return mountedUbuildShell;
  };

  beforeEach(() => {
    props = {
      history: {
        push: jest.fn()
      }
    };
    mountedUbuildShell = undefined;
  });

  it('should render the UbuildShell component', () => {
    expect(ubuildShell().find('.ubuild-wrapper').length).toBe(1);
  });

  it('should render the Toolbar component', () => {
    expect(ubuildShell().find(Toolbar).length).toBe(1);
  });

  it('should redirect to the dashboard when the user is not a Ubuild admin', () => {
    global.isUserUbuildAdmin = jest.fn(() => false);
    ubuildShell();
    expect(props.history.push).toHaveBeenCalledWith('/dashboard');
    delete global.isUserUbuildAdmin;
  });
});
