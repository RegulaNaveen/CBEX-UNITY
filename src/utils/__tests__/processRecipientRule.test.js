import '@testing-library/jest-dom/extend-expect';
import processTextOrNumberOrDate from '../../utils/processRecipientRule';
import question from './data.json';
describe('processRecipientRule unit tests', () => {
  const data = {
    rule: {
      RecipientRuleGroups: [
        {
          RecipientRuleCCGroupFilter: 'Equal',
          RecipientRuleGroupOperator: 'Or',
          RecipientRuleGroupName: 'System Generated',
          RecipientRuleToGroupFilter: 'Equal',
          RecipientRuleCCAnswer: [
            {
              Value: 'b0a933b0-a3bc-4b93-8412-250abcd3589c',
              Type: 'Role'
            },
            {
              GroupName: 'Test New Group',
              Value: '03cb0910-cdb0-4af3-82ef-a5e83ba03db5',
              Type: 'EmailGroup',
              GroupValues: [
                {
                  Value: 'sushmakallam.naga@iqvia.com',
                  Type: 'Email'
                },
                {
                  Value: 'Proposal Team-P0X',
                  Type: 'Role'
                }
              ]
            },
            {
              Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
              Type: 'Role'
            },
            {
              Value: '0c0b2e2b-0914-40c8-90f2-0e585428eb89',
              Type: 'Role'
            },
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            }
          ],
          RecipientRules: [
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: '0a374f9c-904e-4fb9-8da9-13af7ecdea39',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'Yes - blinded',
                  Id: '53f276de-70e1-49d6-87ac-d49f51010cda'
                },
                {
                  Value: 'Yes - unblinded',
                  Id: 'f5121a71-793c-4928-94db-20f2ab62f0c1'
                },
                {
                  Value: 'Permission not obtained',
                  Id: 'b5bdcaf0-32a5-47cb-bbd1-bc14da92bc35'
                }
              ]
            },
            {
              RecipientRuleOperator: 'And',
              RecipientRuleAnswerType: 'number',
              QuestionId: '231be643-6814-4059-93bf-c9fb21b658f6',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: ['2023']
            },
            {
              RecipientRuleOperator: '',
              RecipientRuleAnswerType: 'date',
              QuestionId: '3f989468-ff7d-4c51-9843-88675d1cd1e2',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: '11/22/2023'
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'checkbox',
              QuestionId: '5258e656-e695-492c-a01a-d3ccd7480bfe',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'Blinded',
                  Id: 'fd319132-da08-4d7f-8064-2cba253e73b3'
                },
                {
                  Value: 'Unblinded',
                  Id: '0985522a-7007-4098-a02a-415b7f2e0b6f'
                }
              ]
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: '5ea3b64c-12cb-43aa-93f9-5b72b67af4ff',
              RecipientRuleFilter: 'Not Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'Poor',
                  Id: '119f600b-7e93-4920-bbbd-9d662f727bc0'
                }
              ]
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: 'Proposal Team-P0X',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: ['123']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select-lookup',
              QuestionId: '918e86dc-b8d1-4d78-8cc2-b1cc81102d0d',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'Medium',
                  Id: '33d86584-6d53-4b37-a5af-3452f844c50d'
                },
                {
                  Value: 'High',
                  Id: 'e1b9cb34-d138-4f03-82f4-2438df1e0c38'
                },
                {
                  Value: 'Low',
                  Id: '4a3c3e56-5d33-4bf3-b400-5f41b05c3df0'
                },
                {
                  Value: 'Not Applicable',
                  Id: 'e6ea7041-49ca-4eea-8283-090818cd9256'
                }
              ]
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'yes-no',
              QuestionId: 'b4f14e9a-ac82-4b56-b2e2-8958b98e5eaa',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: ['Yes']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: 'bd512693-8744-4349-8a71-ff9e2005ccb6',
              RecipientRuleFilter: 'Not Equal',
              RecipientRuleAnswer: ['123']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'radio',
              QuestionId: 'bfaeb699-ad10-4d68-acdb-2195f58d2ed2',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'ATP with MSA',
                  Id: 'fb4f3c5b-087b-4d6a-9725-3a220bbe8507'
                },
                {
                  Value: 'ATP without MSA',
                  Id: '3653bfea-5950-4537-a16b-f7d70c40041d'
                },
                {
                  Value: 'Customer-specific ATP',
                  Id: '19523583-e911-44ed-8820-0d86b34af8ae'
                }
              ]
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'multi-select-lookup',
              QuestionId: 'dfe3b7fc-56ae-43ef-bdcc-36ef3a0a17fa',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'Yes',
                  Id: '86990b17-c725-4e72-b653-57c6a5d21bdf'
                },
                {
                  Value: 'No',
                  Id: '9289fcfe-6d8e-4516-89c9-f5d422190da2'
                },
                {
                  Value: 'Not Sure',
                  Id: '0a2254a1-a288-41bf-9df6-d0bfbe97d4ef'
                },
                {
                  Value: 'Not Applicable',
                  Id: '2b3fa2dc-d7da-47ec-a4b7-7a3bf9094718'
                }
              ]
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select-lookup',
              QuestionId: 'dfe3b7fc-56ae-43ef-bdcc-36ef3a0a17fa',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: []
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: '0a374f9c-904e-4fb9-8da9-13af7ecdea39',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: [
                {
                  Value: 'Yes - blinded',
                  Id: '53f276de-70e1-49d6-87ac-d49f51010cda'
                },
                {
                  Value: 'Yes - unblinded',
                  Id: 'f5121a71-793c-4928-94db-20f2ab62f0c1'
                },
                {
                  Value: 'Permission not obtained',
                  Id: 'b5bdcaf0-32a5-47cb-bbd1-bc14da92bc35'
                }
              ]
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: '0a374f9c-904e-4fb9-8da9-13af7ecdea39',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: []
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: '0a374f9c-904e-4fb9-8da9-13af7ecdea39',
              RecipientRuleFilter: 'Not Equal',
              RecipientRuleAnswer: []
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: '0a374f9c-904e-4fb9-8da9-13af7ecdea39',
              RecipientRuleFilter: 'Does not Contain',
              RecipientRuleAnswer: []
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: 'Country Strategy-H7V',
              RecipientRuleFilter: 'Contains',
              RecipientRuleAnswer: ['Asia Pacific']
            },
            {
              RecipientRuleOperator: 'AND',
              RecipientRuleAnswerType: 'multi-select',
              QuestionId: 'Country Strategy-H7V',
              RecipientRuleFilter: 'test',
              RecipientRuleAnswer: []
            }
          ],
          RecipientRuleToAnswer: [
            {
              Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
              Type: 'Role'
            },
            {
              GroupName: 'tt',
              Value: 'dbc93d33-e8c5-4d82-b076-c92f5fa30369',
              Type: 'EmailGroup',
              GroupValues: [
                {
                  Value: 'aalok.mehta@iqvia.com',
                  Type: 'Email'
                }
              ]
            },
            {
              GroupName: 'Recipient group',
              Value: 'b7b1af5f-6545-4e1d-bf97-2dc3f78b712f',
              Type: 'EmailGroup',
              GroupValues: [
                {
                  Value: 'akasamsatish.kumar@iqvia.com',
                  Type: 'Email'
                },
                {
                  Value: 'sushmakallam.naga@iqvia.com',
                  Type: 'Email'
                },
                {
                  Value: 'ac150d71-4874-43d7-9ef8-3c53c692f35b',
                  Type: 'Role'
                },
                {
                  Value: 'srinivas.ambekar@iqvia.com',
                  Type: 'Email'
                },
                {
                  Value: 'Proposal Team-P0X',
                  Type: 'Role'
                },
                {
                  Value: 'sushil.munda@iqvia.com',
                  Type: 'Email'
                }
              ]
            },
            {
              Value: '0c0b2e2b-0914-40c8-90f2-0e585428eb89',
              Type: 'Role'
            },
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            }
          ]
        },
        {
          RecipientRuleCCGroupFilter: 'Equal',
          RecipientRuleGroupOperator: 'Or',
          RecipientRuleGroupName: 'System Generated',
          RecipientRuleToGroupFilter: 'Equal',
          RecipientRuleCCAnswer: [
            {
              Value: 'd7f00e27-409d-4220-af5d-a015f189a5f5',
              Type: 'Role'
            },
            {
              Value: 'b0a933b0-a3bc-4b93-8412-250abcd3589c',
              Type: 'Role'
            },
            {
              GroupName: 'Test New Group',
              Value: '03cb0910-cdb0-4af3-82ef-a5e83ba03db5',
              Type: 'EmailGroup',
              GroupValues: [
                {
                  Value: 'sushmakallam.naga@iqvia.com',
                  Type: 'Email'
                },
                {
                  Value: 'Proposal Team-P0X',
                  Type: 'Role'
                }
              ]
            },
            {
              Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
              Type: 'Role'
            },
            {
              Value: '0c0b2e2b-0914-40c8-90f2-0e585428eb89',
              Type: 'Role'
            },
            {
              Value: 'Proposal Team-W1D',
              Type: 'Role'
            }
          ],
          RecipientRules: [
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: 'Proposal Team-P0X',
              RecipientRuleFilter: 'Equal',
              RecipientRuleAnswer: ['123', 'sri', 'vas']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: '1cdc6d7c-2826-4617-b645-37c6d48adbb5',
              RecipientRuleFilter: 'Contains',
              RecipientRuleAnswer: ['123', 'Device']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: 'ce73b86a-a641-4dc2-bfdf-f883ad95b8e6',
              RecipientRuleFilter: 'Does not Contain',
              RecipientRuleAnswer: ['test']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: 'ce73b86a-a641-4dc2-bfdf-f883ad95b8e6',
              RecipientRuleFilter: 'Contains',
              RecipientRuleAnswer: ['false']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: 'db3f7a51-222c-431e-8680-636aa3d06f3d',
              RecipientRuleFilter: 'Does not Contain',
              RecipientRuleAnswer: ['test']
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: 'db3f7a51-222c-431e-8680-636aa3d06f3d',
              RecipientRuleFilter: 'Is Blank',
              RecipientRuleAnswer: []
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'number',
              QuestionId: '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              RecipientRuleFilter: 'Greater Than',
              RecipientRuleAnswer: 20
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'number',
              QuestionId: '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              RecipientRuleFilter: 'Less Than',
              RecipientRuleAnswer: 30
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'number',
              QuestionId: '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              RecipientRuleFilter: 'Is Not Blank',
              RecipientRuleAnswer: ''
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              RecipientRuleFilter: 'Less Than',
              RecipientRuleAnswer: 30
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              RecipientRuleFilter: 'Is Not Blank',
              RecipientRuleAnswer: ''
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'select',
              QuestionId: '8ae5c1e8-5c02-4eb2-a9ea-e2f54593f2e3',
              RecipientRuleFilter: 'Greater Than',
              RecipientRuleAnswer: 20
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: '86ba5974-f4b1-4598-90ae-a1b476fac829',
              RecipientRuleFilter: 'Is Blank',
              RecipientRuleAnswer: ''
            },
            {
              RecipientRuleOperator: 'Or',
              RecipientRuleAnswerType: 'text',
              QuestionId: '86ba5974-f4b1-4598-90ae-a1b476fac829',
              RecipientRuleFilter: 'test',
              RecipientRuleAnswer: ''
            }
          ],
          RecipientRuleToAnswer: [
            {
              Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
              Type: 'Role'
            },
            {
              GroupName: 'tt',
              Value: 'dbc93d33-e8c5-4d82-b076-c92f5fa30369',
              Type: 'EmailGroup',
              GroupValues: [
                {
                  Value: 'aalok.mehta@iqvia.com',
                  Type: 'Email'
                }
              ]
            },
            {
              Value: '7372795e-35d2-4b5e-9b20-cbf54b3eaed0',
              Type: 'Role'
            },
            {
              Value: 'b0a933b0-a3bc-4b93-8412-250abcd3589c',
              Type: 'Role'
            },
            {
              Value: 'Proposal Team-E5N',
              Type: 'Role'
            },
            {
              Value: '02d6cf45-c52c-4cf7-ab4e-d62688264035',
              Type: 'Role'
            }
          ]
        }
      ],
      RecipientRuleGroupOperator: 'Or'
    },
    question: question
  };
  it('processRecipientRule  test', () => {
    const { RecipientRuleToAnswer, RecipientRuleCCAnswer } =
      processTextOrNumberOrDate(data.rule, data.question);
    expect(RecipientRuleToAnswer.length).toBeGreaterThan(0);
    expect(RecipientRuleCCAnswer.length).toBeGreaterThan(0);
  });
  it('processRecipientRule  test empty rule', () => {
    const { RecipientRuleToAnswer, RecipientRuleCCAnswer } =
      processTextOrNumberOrDate(data.rule, []);
    expect(RecipientRuleToAnswer.length).toEqual(0);
    expect(RecipientRuleCCAnswer.length).toEqual(0);
  });
  it('processRecipientRule  test empty rule answer', () => {
    data.rule.RecipientRuleGroups[0].RecipientRuleCCAnswer = [];
    data.rule.RecipientRuleGroups[0].RecipientRuleToAnswer = [];
    const { RecipientRuleToAnswer, RecipientRuleCCAnswer } =
      processTextOrNumberOrDate(data.rule, []);
    expect(RecipientRuleToAnswer.length).toEqual(0);
    expect(RecipientRuleCCAnswer.length).toEqual(0);
  });
});
