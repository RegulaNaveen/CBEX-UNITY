import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationPreference from '../AccountPreferences/NotificationPreference';

const handleUserPreferenceChangeMock = jest.fn();

describe('NotificationPreference component', () => {
  it('renders the component', () => {
    const userPreference = [
      {
        preference_id: '1',
        title: 'Notification 1',
        preference_type: 'NOTIFICATION',
        default_type: 'BOTH',
        mandatory: 'NONE',
        preference_selected: 'IN-APP',
      },
      {
        preference_id: '2',
        title: 'Notification 2',
        preference_type: 'NOTIFICATION',
        default_type: 'IN-APP',
        mandatory: 'NONE',
        preference_selected: 'IN-APP',
      },
    ];

    const { getByText } = render(
      <NotificationPreference
        userPreference={userPreference}
        handleUserPreferenceChange={handleUserPreferenceChangeMock}
      />
    );

    expect(getByText('Notification 1')).toBeInTheDocument();
    expect(getByText('Notification 2')).toBeInTheDocument();
  });

  it.skip('calls the handleUserPreferenceChange function when a checkbox is clicked', () => {
    const userPreference = [
      {
        preference_id: '1',
        title: 'Notification 1',
        preference_type: 'NOTIFICATION',
        default_type: 'BOTH',
        mandatory: 'NONE',
        preference_selected: 'IN-APP',
      },
    ];

    const { getByLabelText } = render(
      <NotificationPreference
        userPreference={userPreference}
        handleUserPreferenceChange={handleUserPreferenceChangeMock}
      />
    );

    const checkbox = getByLabelText('In-app');
    fireEvent.click(checkbox);

    expect(handleUserPreferenceChangeMock).toHaveBeenCalledTimes(1);
  });
});
