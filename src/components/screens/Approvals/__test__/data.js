export const dummyQuestions = [
  {
    proposalId: '7b76ff84-e19d-4c2d-a969-cf7dcc160e43',
    questionId: 'd9fe4838-0541-4acb-b909-076a01e64b96',
    section: {
      sectionOrder: 2,
      sectionName: 'Opportunity Overvieww Mine'
    },
    questionText: 'Testing multi select',
    answerConfiguration: {
      type: 'picklist-lookup',
      options: ['Toyota', 'Mercedes', 'Ferrari', 'Ford', 'BMW']
    },
    roleNames: ['Core - Proposal Developer'],
    answers: [],
    questionOrder: 19,
    visible: true,
    locked: false,
    active: true,
    sfObject: 'n/a',
    sfField: 'n/a',
    questionApproval: false
  }
];
export const sfOptions = {
  'SF#Bid_History__c_SF#Is_this_part_of_a_Program__c': [
    'Not part of a program',
    'Yes - lead opportunity',
    'Yes - not the lead'
  ],
  'SF#Bid_History__c_SF#Targeted_Countries__c': [
    'United States of America',
    'India'
  ]
};
