const NOTIFICATION_PREFERENCE = [
  {
    label: 'Assigned to an opportunity',
    inApp: {
      checked: true,
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
      disabled: false,
    },
    email: {
      checked: false,
      disabled: false,
    },
  },
  {
    label: 'Answer Changes',
    inApp: {
      checked: true,
      disabled: false,
    },
    email: {
      checked: false,
      disabled: false,
    },
  },
  {
    label: 'New Document Added',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: false,
      disabled: false,
    },
  },
  {
    label: 'Question assigned to my role',
    inApp: {
      checked: true,
      disabled: false,
    },
    email: {
      checked: false,
      disabled: false,
    },
  },
  {
    label: 'Notes updated',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: true,
      disabled: false,
    },
  },
  {
    label: 'Section complete',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: true,
      disabled: false,
    },
  },
  {
    label: 'Rebid from Salesforce CRM',
    inApp: {
      checked: true,
      disabled: false,
    },
    email: {
      checked: true,
      disabled: false,
    },
  },
  {
    label: 'Discrepancy with salesforce',
    inApp: {
      checked: false,
      disabled: false,
    },
    email: {
      checked: false,
      disabled: false,
    },
  },
  {
    label: 'System-pushed notification',
    inApp: {
      checked: true,
      disabled: false,
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
