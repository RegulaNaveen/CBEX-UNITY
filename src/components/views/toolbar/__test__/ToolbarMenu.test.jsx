import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { Map } from 'immutable';
import Button from 'apollo-react/components/Button';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { async } from 'rxjs';
import ToolbarMenuComponent from '../ToolbarMenu';
import stateData from '../../../screens/Proposal/__tests__/data.json';

const rolesList = [
  'Analytics Strategy Lead',
  'Biostats',
  'Business Account Manager',
  'Business Developer',
  'CEVA',
  'Clinical DS&B',
  'Data Management',
  'Executive Oversight',
  'Feasibility',
  'Global Site Activation (GSA)',
  'Medical Strategy Lead',
  'Medical Writing',
  'Other',
  'Project Lead',
  'Proposal Developer',
  'Safety',
  'Site Analytics',
  'Strategic Pricing',
  'TSL',
  'xAdmin'
];

const proposal = Map(stateData.proposal);
const getRolesInfoF = jest.fn();
const changeUserRole = jest.fn();
const isRolesLoading = false;
const logoutUser = jest.fn();
const eventCategories = {
  dp: 'Unity Dashboard',
  plainPd: 'Proposal Detail',
  tb: 'ToolBar Menu',
  pg: 'Pagination',
  crmNo: 'Proposal Detail (CRM#: UZA89202)'
};
const trackEvent = jest.fn();
const userActions = {
  click: 'Clicked',
  changed: 'Changed',
  submit: 'Submitted',
  scroll: 'Scrolled',
  edit: 'Edited'
};
const history = {
  length: 16,
  action: 'PUSH',
  location: {
    pathname: '/profile/',
    search: '',
    hash: '',
    key: 'kq170x'
  }
};
const onClick = jest.fn();
const trackMatomoLinkClicks = jest.fn();
const handleLogout = jest.fn();
const initState = {
  rolesList,
  proposal,
  getRolesInfoF,
  changeUserRole: jest.fn(),
  isRolesLoading: false,
  history,
  logoutUser: jest.fn(),
  eventCategories,
  userActions,
  trackEvent,
  handleLogout,
  trackMatomoLinkClicks,
  onclick
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initState);
describe('ToolbarMenu component', () => {
  it('renders toolbar component', () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ToolbarMenuComponent {...initState} />
        </Provider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
  it('profile button functionality', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Button data-testid="user-button" {...onClick} />
        </Provider>
      </BrowserRouter>
    );
    const profile = getByTestId('user-button');
    await expect(profile).toBeInTheDocument();
    fireEvent.click(profile);

    // expect(onClick).toHaveBeenCalled();
  });

  it('suggestion board button functionality', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ToolbarMenuComponent {...initState} />
        </Provider>
      </BrowserRouter>
    );
    const profile = getByTestId('suggestion-button');
    expect(profile).toBeInTheDocument();
    fireEvent.click(profile);

    // await expect(onClick).toHaveBeenCalled();
  });

  it('unity wiki button functionality', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ToolbarMenuComponent {...initState} />
        </Provider>
      </BrowserRouter>
    );
    const profile = getByTestId('unity-wiki-button');
    expect(profile).toBeInTheDocument();
    fireEvent.click(profile);

    // await expect(onClick).toHaveBeenCalled();
  });

  it('report button functionality', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ToolbarMenuComponent {...initState} />
        </Provider>
      </BrowserRouter>
    );
    const profile = getByTestId('report-button');
    await expect(profile).toBeInTheDocument();
    fireEvent.click(profile);

    // expect(onClick).toHaveBeenCalled();
  });

  it('log out button functionality', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <ToolbarMenuComponent {...initState} />
        </Provider>
      </BrowserRouter>
    );
    const profile = getByTestId('logout-button');
    await expect(profile).toBeInTheDocument();
    fireEvent.click(profile);

    // expect(handleLogout).toHaveBeenCalled();
  });
});
