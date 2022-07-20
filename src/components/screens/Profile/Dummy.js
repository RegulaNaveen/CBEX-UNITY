const NOTIFICATION_PREFERENCE = [
  {
    label: 'Assigned to an opportunity',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: true,
      disabled: true,
    },
  },
  {
    label: 'Rebid from salesforce CRM',
    inApp: {
      checked: true,
      disabled: true,
    },
    email: {
      checked: true,
      disabled: false,
    },
  },
  {
    label: 'Assigned to an opportunity',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: true,
      disabled: true,
    },
  },
  {
    label: 'Rebid from salesforce CRM',
    inApp: {
      checked: true,
      disabled: true,
    },
    email: {
      checked: true,
      disabled: false,
    },
  },
  {
    label: 'Assigned to an opportunity',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: true,
      disabled: true,
    },
  },
  {
    label: 'Rebid from salesforce CRM',
    inApp: {
      checked: true,
      disabled: true,
    },
    email: {
      checked: true,
      disabled: false,
    },
  },
];

const EMAIL_PREFERENCE = [
  {
    label: 'Real time email updates',
    checked: true,
    disabled: false,
  },
  {
    label: 'Hourly email digest',
    checked: false,
    disabled: false,
  },
  {
    label: 'once daily email digest',
    checked: true,
    disabled: false,
  },
];

const OPPORTUNITY_PREFERENCE = [
  {
    label: 'By default, filter opportunity questions by MY User Role',
    checked: true,
    disabled: false,
  },
  {
    label: 'By default, filter opportunity by Interested party Questions',
    checked: true,
    disabled: false,
  },
];

export { NOTIFICATION_PREFERENCE, EMAIL_PREFERENCE, OPPORTUNITY_PREFERENCE };
