import React from 'react';
import { createRoot } from 'react-dom/client';
import { mount } from 'enzyme';
import Sinon from 'sinon';
import { render, waitFor } from '@testing-library/react';
import * as SSOApis from '../api/sso-auth';
import App from '../App';

jest.mock('../components/screens/Dashboard', () => () => <p>Dashboard</p>);
jest.mock('../components/screens/Opportunity', () => () => <p>Opportunity</p>);
jest.mock('../utils/launchDarkly', () => ({
  __esModule: true,
  default: () => Promise.resolve({ favouriteFlag: true })
}));

describe('App Component', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<App />, div);
    root.unmount();
  });

  it('renders the App component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(App)).toHaveLength(1);
  });

  it.only('renders Home component on dashboard route', async () => {
    const getFavStub = sinonSandbox.stub(SSOApis, 'getFavourites').resolves({
      favourties: ['test123']
    });
    localStorage.setItem('access_token', 'token');
    window.history.pushState({}, '', '/dashboard');
    render(<App />);
    await waitFor(() => {
      expect(getFavStub.callCount).toBe(1);
    });
  });
});
