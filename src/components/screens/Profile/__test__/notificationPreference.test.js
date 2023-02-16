import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
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

  it('calls the handleUserPreferenceChange function when a checkbox is clicked', () => {
    const userPreference = [
      {
        created_by: "SYSTEM",
        created_date: "2022-09-16T11:11:11.867Z",
        default_type: "UN-CHECKED",
        description: "",
        display_order: 3,
        is_deleted: false,
        mandatory: "FALSE",
        preference_code: "ONCE_DAILY",
        preference_id: "085d58ef-5d66-49ae-af7f-30734d07e676",
        preference_type: "EMAIL",
        title: "Once daily email digest",
        updated_by: "SYSTEM",
        updated_date: "2022-09-16T11:11:11.867Z",
        visible: true
      },
    ];

    render(
      <NotificationPreference
        userPreference={userPreference}
        handleUserPreferenceChange={handleUserPreferenceChangeMock}
      />
    );

    const checkbox = screen.getByLabelText('Once daily email digest');
    fireEvent.click(checkbox);

    expect(handleUserPreferenceChangeMock).toHaveBeenCalledTimes(1);
  });
});
