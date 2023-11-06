import React from 'react';

// import Email templates from index file
import EmailTemplates from '../index';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { configure, mount, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import configureMockStore from 'redux-mock-store';
import { Map } from 'immutable';

// import initial state from email templates reducer
// import mock proposal data
import mockProposalData from './mockdata/mockProposalData.json';
import { INITIAL_STATE as emailTemplatesInitialState } from '../../../../../redux/reducers/emailTemplates';

const proposal = mockProposalData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

// setup redux for testing
configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({
  emailTemplates: emailTemplatesInitialState,
  proposal: Map(proposal),
  search: []
});
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

// write test case to test the EmailTemplates component

// test case to check if the component renders without crashing with empty data
it('renders without crashing', () => {
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      <EmailTemplates />
    </Provider>,
    div
  );
  unmountComponentAtNode(div);
});

// test case to check if the component renders without crashing with data
it('renders without crashing with Data', () => {
  const storeWithEmailTemplate = mockStore({
    emailTemplates: {
      emailTemplatesList: [
        {
          EmailTemplateRecipientRule: {
            RecipientRuleGroups: [
              {
                RecipientRuleCCGroupFilter: 'Equal',
                RecipientRuleGroupOperator: 'Or',
                RecipientRuleGroupName: 'System Generated',
                RecipientRuleToGroupFilter: 'Equal',
                RecipientRuleCCAnswer: [],
                RecipientRules: [
                  {
                    RecipientRuleOperator: 'Or',
                    RecipientRuleAnswerType: 'text',
                    QuestionId: 'Proposal Team-P0X',
                    RecipientRuleFilter: 'Equal',
                    RecipientRuleAnswer: ['   jjj']
                  }
                ],
                RecipientRuleToAnswer: [
                  {
                    GroupName: 't3',
                    Value: '8020702c-1c2b-4c4d-be05-24b5ea2dc1f7',
                    Type: 'EmailGroup',
                    GroupValues: [
                      {
                        Value: 'Proposal Team-O0Z',
                        Type: 'Role'
                      }
                    ]
                  }
                ]
              }
            ],
            RecipientRuleGroupOperator: 'Or'
          },
          EmailTemplateName: 'ABD Villiers ADD',
          EmailTemplateDescription: 'ABD Villiers',
          EmailTemplateTORoles: [
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            },
            {
              Value: 'ff6b9089-8d82-4584-aecd-928256766218',
              Type: 'EmailGroup'
            },
            {
              Value: '9d8b8ba7-7311-46c0-aa9c-8c6e4fbaccec',
              Type: 'EmailGroup'
            },
            {
              Value: 'f1b617bc-299e-40c6-ac02-ab2b0bccfa68',
              Type: 'EmailGroup'
            },
            {
              Value: '1a0c9b27-9c5c-405c-9966-a02fd4945c46',
              Type: 'EmailGroup'
            },
            {
              Value: '54affb00-9b20-481d-8258-7cac4ade3898',
              Type: 'EmailGroup'
            },
            {
              Value: '579efa29-409c-44e9-afef-ba0735c98113',
              Type: 'EmailGroup'
            },
            {
              Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
              Type: 'EmailGroup'
            },
            {
              Value: '1adf0e4c-cd66-4363-96fe-b14ba28a83ca',
              Type: 'EmailGroup'
            },
            {
              Value: '2ed31998-fd41-414d-b07a-0a7e87240458',
              Type: 'EmailGroup'
            },
            {
              Value: '03cb0910-cdb0-4af3-82ef-a5e83ba03db5',
              Type: 'EmailGroup'
            },
            {
              Value: 'd22d6ccc-773d-4263-b14f-4fd3550ecf24',
              Type: 'EmailGroup'
            }
          ],
          EmailTemplateCC: [],
          EmailTemplateBody:
            '<p><strong><em><s><u>We need to store the following against each Unity user:</u></s></em></strong></p><ul><li><p><mark>Date and Time when the user was shown the message and clicked \'Continue\' or \'OK\'</mark></p></li><li><p><strong>Tech Team - Do we need to store the IP address? Any other acknowledgement&nbsp;details we need to store?</strong></p><hr></li></ul><p>If the user has already been shown this message and clicked \'Continue\' or \'OK\' then Unity should not show this message.</p><h1>Heading</h1><h2>Heading</h2><p><a target="_blank" rel="noopener noreferrer nofollow" class="my-custom-class my-custom-class my-custom-class" href="https://jiraims.rm.imshealth.com/browse/IQVIACBEXU-5236">https://jiraims.rm.imshealth.com/browse/IQVIACBEXU-5236</a></p><p>26<sup>th</sup> Oct 2023, X<sub>2</sub></p>',
          EmailTemplateSubject: 'JSJKKJS123',
          EmailTemplateId: '6afb86c2-0e8f-4b87-8be8-6098f232ff2b',
          EmailTemplateTO: [
            {
              Value: 'Sweeti.Sawlikar@iqvia.com',
              Type: 'Email'
            },
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            },
            {
              Value: 'ff6b9089-8d82-4584-aecd-928256766218',
              Type: 'EmailGroup',
              GroupName: 't1',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: '9d8b8ba7-7311-46c0-aa9c-8c6e4fbaccec',
              Type: 'EmailGroup',
              GroupName: 't2',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: '722f9c3c-5538-4b64-bda5-76604d61da46'
                },
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: 'f1b617bc-299e-40c6-ac02-ab2b0bccfa68',
              Type: 'EmailGroup',
              GroupName: 't6',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: 'Proposal Team-P0X'
                },
                {
                  Type: 'Role',
                  Value: '722f9c3c-5538-4b64-bda5-76604d61da46'
                },
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: '1a0c9b27-9c5c-405c-9966-a02fd4945c46',
              Type: 'EmailGroup',
              GroupName: 'test',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: '96946b84-9b12-45a2-93ca-e251e6c28739'
                },
                {
                  Type: 'Role',
                  Value: '722f9c3c-5538-4b64-bda5-76604d61da46'
                },
                {
                  Type: 'Role',
                  Value: 'Strategic Proposal Writer'
                }
              ]
            },
            {
              Value: '54affb00-9b20-481d-8258-7cac4ade3898',
              Type: 'EmailGroup',
              GroupName: 'ttt',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4'
                },
                {
                  Type: 'Role',
                  Value: 'Proposal Team-D6B'
                }
              ]
            },
            {
              Value: '579efa29-409c-44e9-afef-ba0735c98113',
              Type: 'EmailGroup',
              GroupName: 'testt',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'good@quintiles.net'
                },
                {
                  Type: 'Role',
                  Value: 'Proposal Team-W3O'
                },
                {
                  Type: 'Email',
                  Value: 'sushil.munda@iqvia.com'
                }
              ]
            },
            {
              Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
              Type: 'EmailGroup',
              GroupName: 'testing',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'varsha.ajetrao@imshealth.com'
                },
                {
                  Type: 'Email',
                  Value: 'shubhangi.prasad@159solutions.com'
                }
              ]
            },
            {
              Value: '1adf0e4c-cd66-4363-96fe-b14ba28a83ca',
              Type: 'EmailGroup',
              GroupName: 'test-varsha',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'varsha.kumari2@iqvia.com'
                }
              ]
            },
            {
              Value: '2ed31998-fd41-414d-b07a-0a7e87240458',
              Type: 'EmailGroup',
              GroupName: 'test-9',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: 'Proposal Team-Z5P'
                }
              ]
            },
            {
              Value: '03cb0910-cdb0-4af3-82ef-a5e83ba03db5',
              Type: 'EmailGroup',
              GroupName: 'Test New Group',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'sushmakallam.naga@iqvia.com'
                },
                {
                  Type: 'Role',
                  Value: 'Proposal Team-P0X'
                }
              ]
            },
            {
              Value: 'd22d6ccc-773d-4263-b14f-4fd3550ecf24',
              Type: 'EmailGroup',
              GroupName: 'test group new',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'varsha.goyal@iqvia.com'
                },
                {
                  Type: 'Email',
                  Value: 'sushmakallam.naga@iqvia.com'
                },
                {
                  Type: 'Email',
                  Value: 'AKamel@eg.imshealth.com'
                }
              ]
            },
            {
              Value: '787d8f50-ea69-40f4-a7c9-bc7586b3fc1c',
              Type: 'Role'
            }
          ],
          EmailTemplateOpportunityTypes:
            'Ballpark OT,Non-Core Clinical Studies',
          EmailTemplateCCRoles: [
            {
              Value: '787d8f50-ea69-40f4-a7c9-bc7586b3fc1c',
              Type: 'Role'
            }
          ]
        },
        {
          EmailTemplateRecipientRule: {
            RecipientRuleGroups: [
              {
                RecipientRuleCCGroupFilter: 'Not Equal',
                RecipientRuleGroupOperator: 'Or',
                RecipientRuleGroupName: 'System Generated',
                RecipientRuleToGroupFilter: 'Equal',
                RecipientRuleCCAnswer: [
                  {
                    Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
                    Type: 'Role'
                  },
                  {
                    GroupName: 'testing',
                    Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
                    Type: 'EmailGroup',
                    GroupValues: [
                      {
                        Value: 'varsha.ajetrao@imshealth.com',
                        Type: 'Email'
                      },
                      {
                        Value: 'shubhangi.prasad@159solutions.com',
                        Type: 'Email'
                      }
                    ]
                  },
                  {
                    Value: 'akash.aggarwal@iqvia.com',
                    Type: 'Email'
                  }
                ],
                RecipientRules: [
                  {
                    RecipientRuleOperator: 'Or',
                    RecipientRuleAnswerType: 'text',
                    QuestionId: 'Proposal Team-P0X',
                    RecipientRuleFilter: 'Equal',
                    RecipientRuleAnswer: ['weqwe', '12321']
                  }
                ],
                RecipientRuleToAnswer: [
                  {
                    Value: 'sushil.munda@iqvia.com',
                    Type: 'Email'
                  },
                  {
                    GroupName: 'test-varsha',
                    Value: '1adf0e4c-cd66-4363-96fe-b14ba28a83ca',
                    Type: 'EmailGroup',
                    GroupValues: [
                      {
                        Value: 'varsha.kumari2@iqvia.com',
                        Type: 'Email'
                      }
                    ]
                  },
                  {
                    Value: 'Proposal Team-X6F',
                    Type: 'Role'
                  }
                ]
              },
              {
                RecipientRuleToGroupFilter: 'Equal',
                RecipientRuleGroupOperator: 'Or',
                RecipientRuleGroupName: 'System Generated',
                RecipientRules: [
                  {
                    RecipientRuleOperator: 'Or',
                    RecipientRuleAnswerType: 'text',
                    QuestionId: '86ba5974-f4b1-4598-90ae-a1b476fac829',
                    RecipientRuleFilter: 'Equal',
                    RecipientRuleAnswer: ['sri', 'sush']
                  }
                ],
                RecipientRuleToAnswer: [
                  {
                    Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
                    Type: 'Role'
                  }
                ]
              },
              {
                RecipientRuleToGroupFilter: 'Equal',
                RecipientRuleGroupOperator: 'Or',
                RecipientRuleGroupName: 'System Generated',
                RecipientRules: [
                  {
                    RecipientRuleOperator: 'Or',
                    RecipientRuleAnswerType: 'text',
                    QuestionId: 'a932540b-b6ec-4182-82fb-aae5b7e0d027',
                    RecipientRuleFilter: 'Equal',
                    RecipientRuleAnswer: ['vam', 'c']
                  }
                ],
                RecipientRuleToAnswer: [
                  {
                    Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
                    Type: 'Role'
                  }
                ]
              }
            ],
            RecipientRuleGroupOperator: 'Or'
          },
          EmailTemplateName: 'Test Tooltip',
          EmailTemplateDescription: 'Test Tooltip desc',
          EmailTemplateTORoles: [],
          EmailTemplateCC: [],
          EmailTemplateBody: '',
          EmailTemplateSubject: '',
          EmailTemplateId: 'c0244c07-1167-4a72-808c-aa5da980cfd2',
          EmailTemplateTO: [],
          EmailTemplateOpportunityTypes:
            'Default Type,Non-Core Clinical Studies',
          EmailTemplateCCRoles: []
        },
        {
          EmailTemplateRecipientRule: {
            RecipientRuleGroups: [
              {
                RecipientRuleCCGroupFilter: 'Equal',
                RecipientRuleCCAnswer: [
                  {
                    Value: 'Proposal Team-R7R',
                    Type: 'Role'
                  },
                  {
                    GroupName: 'test-4',
                    Value: '58e83d64-8d86-454a-97a7-d5689525c66d',
                    Type: 'EmailGroup',
                    GroupValues: [
                      {
                        Value: 'test@iqvia.com',
                        Type: 'Email'
                      }
                    ]
                  }
                ],
                RecipientRuleGroupOperator: 'Or',
                RecipientRuleGroupName: 'System Generated',
                RecipientRules: [
                  {
                    RecipientRuleOperator: 'Or',
                    RecipientRuleAnswerType: 'text',
                    QuestionId: 'Key stakeholders-Y0L',
                    RecipientRuleFilter: 'Equal',
                    RecipientRuleAnswer: ['test']
                  }
                ]
              },
              {
                RecipientRuleToGroupFilter: 'Equal',
                RecipientRuleGroupOperator: 'Or',
                RecipientRuleGroupName: 'System Generated',
                RecipientRules: [
                  {
                    RecipientRuleOperator: 'Or',
                    RecipientRuleAnswerType: 'text',
                    QuestionId: 'Proposal Team-O0Z',
                    RecipientRuleFilter: 'Not Equal',
                    RecipientRuleAnswer: ['213', '213213']
                  }
                ],
                RecipientRuleToAnswer: [
                  {
                    Value: 'a3c65fbb-9253-4646-8319-cdd2648e4697',
                    Type: 'Role'
                  }
                ]
              }
            ],
            RecipientRuleGroupOperator: 'Or'
          },
          EmailTemplateName: 'add email recipient concurrency',
          EmailTemplateDescription: 'add email recipient concurrency',
          EmailTemplateTORoles: [],
          EmailTemplateCC: [],
          EmailTemplateBody: '',
          EmailTemplateSubject: '',
          EmailTemplateId: 'c1f9149f-cf39-43c4-872e-ebb9337968e7',
          EmailTemplateTO: [],
          EmailTemplateOpportunityTypes:
            'Core Opportunity Launch Call (AMR/EMEA),Non-Core Clinical Studies',
          EmailTemplateCCRoles: []
        },
        {
          EmailTemplateRecipientRule: {
            RecipientRuleGroups: [],
            RecipientRuleGroupOperator: 'Or'
          },
          EmailTemplateName: 'ADDITION',
          EmailTemplateDescription: 'ADDITION',
          EmailTemplateTORoles: [
            {
              Value: 'Proposal Team-L6S',
              Type: 'Role'
            },
            {
              Value: '96d6122b-a485-442d-ab9d-1af6b33f8acb',
              Type: 'EmailGroup'
            },
            {
              Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
              Type: 'EmailGroup'
            },
            {
              Value: 'd6e78b28-4192-4fc9-9ea9-41bc04ef3c95',
              Type: 'EmailGroup'
            },
            {
              Value: 'a6222a21-c142-4768-a63c-b95b24d72a20',
              Type: 'EmailGroup'
            }
          ],
          EmailTemplateCC: [
            {
              Value: 'sushil.munda@iqvia.com',
              Type: 'Email'
            },
            {
              Value: 'f1b617bc-299e-40c6-ac02-ab2b0bccfa68',
              Type: 'EmailGroup',
              GroupName: 't6',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: 'Proposal Team-P0X'
                },
                {
                  Type: 'Role',
                  Value: '722f9c3c-5538-4b64-bda5-76604d61da46'
                },
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: '9d8b8ba7-7311-46c0-aa9c-8c6e4fbaccec',
              Type: 'EmailGroup',
              GroupName: 't2',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: '722f9c3c-5538-4b64-bda5-76604d61da46'
                },
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: '1adf0e4c-cd66-4363-96fe-b14ba28a83ca',
              Type: 'EmailGroup',
              GroupName: 'test-varsha',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'varsha.kumari2@iqvia.com'
                }
              ]
            },
            {
              Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
              Type: 'EmailGroup',
              GroupName: 'testing',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'varsha.ajetrao@imshealth.com'
                },
                {
                  Type: 'Email',
                  Value: 'shubhangi.prasad@159solutions.com'
                }
              ]
            }
          ],
          EmailTemplateBody:
            '<p><mark>ADDITION</mark></p><hr><p></p><p style="text-align: right"><span style="color: rgb(23, 43, 77); color: rgb(23, 43, 77)">Horizontal rule, Indentation, and yellow highlight are not showing in the view details page.</span></p>',
          EmailTemplateSubject: 'ADDITION',
          EmailTemplateId: 'e4145429-f57f-481e-a929-f8d5cb676ca8',
          EmailTemplateTO: [
            {
              Value: 'akash.aggarwal@iqvia.com',
              Type: 'Email'
            },
            {
              Value: 'Proposal Team-L6S',
              Type: 'Role'
            },
            {
              Value: '96d6122b-a485-442d-ab9d-1af6b33f8acb',
              Type: 'EmailGroup',
              GroupName: 'test-3',
              GroupValues: [
                {
                  Type: 'Role',
                  Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4'
                },
                {
                  Type: 'Email',
                  Value: 'bharath.besagarahallyyadiyurappa@iqvia.com'
                }
              ]
            },
            {
              Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
              Type: 'EmailGroup',
              GroupName: 'testing',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'varsha.ajetrao@imshealth.com'
                },
                {
                  Type: 'Email',
                  Value: 'shubhangi.prasad@159solutions.com'
                }
              ]
            },
            {
              Value: 'd6e78b28-4192-4fc9-9ea9-41bc04ef3c95',
              Type: 'EmailGroup',
              GroupName: 't7',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: 'a6222a21-c142-4768-a63c-b95b24d72a20',
              Type: 'EmailGroup',
              GroupName: 't8',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: 'Proposal Team-P0C',
              Type: 'Role'
            }
          ],
          EmailTemplateOpportunityTypes:
            'Core Opportunity Launch Call (AMR/EMEA)',
          EmailTemplateCCRoles: [
            {
              Value: 'f1b617bc-299e-40c6-ac02-ab2b0bccfa68',
              Type: 'EmailGroup'
            },
            {
              Value: 'Proposal Team-P0C',
              Type: 'Role'
            },
            {
              Value: '9d8b8ba7-7311-46c0-aa9c-8c6e4fbaccec',
              Type: 'EmailGroup'
            },
            {
              Value: '1adf0e4c-cd66-4363-96fe-b14ba28a83ca',
              Type: 'EmailGroup'
            },
            {
              Value: '70206655-7db6-4fc4-8c75-2bcaa3cf2c1d',
              Type: 'EmailGroup'
            }
          ]
        },
        {
          EmailTemplateRecipientRule: {
            RecipientRuleGroups: [],
            RecipientRuleGroupOperator: 'Or'
          },
          EmailTemplateName: 'template without recipient rule',
          EmailTemplateDescription:
            "This new feature we will be calling 'Recipient Rules' within these Jira tickets. This may or may not be the title used in U-Build release 5.0",
          EmailTemplateTORoles: [
            {
              Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
              Type: 'Role'
            },
            {
              Value: 'd6e78b28-4192-4fc9-9ea9-41bc04ef3c95',
              Type: 'EmailGroup'
            }
          ],
          EmailTemplateCC: [
            {
              Value: 'abhishek.agarwal@iqvia.com',
              Type: 'Email'
            },
            {
              Value: 'test@gmail.com',
              Type: 'Email'
            },
            {
              Value: 'a6222a21-c142-4768-a63c-b95b24d72a20',
              Type: 'EmailGroup',
              GroupName: 't8',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            }
          ],
          EmailTemplateBody:
            "<ul><li><p>The <em>IF...</em> functionality as seen on the current Business Rules should look and work exactly as per Business Rules. (to allow a condition to be configured based upon any existing Question and Question type). The current Business Rules functionality allows for multiple IF's, we will have this same functionality for Recipient Rules.&nbsp;&nbsp;</p></li></ul>",
          EmailTemplateSubject:
            "Unlike Business Rules, there will be no Ranking. All individual Recipient Rules will be run for the template in question, whether email addresses are added to the 'TO' and/or 'CC' or not.",
          EmailTemplateId: 'ed36286c-21dc-4816-9ba0-c22f37079b79',
          EmailTemplateTO: [
            {
              Value: 'mallireddygari.reddy@iqvia.com',
              Type: 'Email'
            },
            {
              Value: 'custom@iqvia.com',
              Type: 'Email'
            },
            {
              Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
              Type: 'Role'
            },
            {
              Value: 'd6e78b28-4192-4fc9-9ea9-41bc04ef3c95',
              Type: 'EmailGroup',
              GroupName: 't7',
              GroupValues: [
                {
                  Type: 'Email',
                  Value: 'kunal.nigam@iqvia.com'
                }
              ]
            },
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            }
          ],
          EmailTemplateOpportunityTypes:
            'Default Type,Non-Core Clinical Studies',
          EmailTemplateCCRoles: [
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            },
            {
              Value: 'a6222a21-c142-4768-a63c-b95b24d72a20',
              Type: 'EmailGroup'
            }
          ]
        }
      ],
      fetchEmailTemplatesErrorMsg: '',
      isLoadingEmailTemplates: false
    },
    proposal: Map(proposal),
    search: []
  });

  const div = document.createElement('div');
  render(
    <Provider store={storeWithEmailTemplate}>
      <EmailTemplates />
    </Provider>,
    div
  );
  unmountComponentAtNode(div);
});

// write snapshot test case to test the EmailTemplates component
it('matches snapshot', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <EmailTemplates />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});

// write negative test case to test the EmailTemplates component
