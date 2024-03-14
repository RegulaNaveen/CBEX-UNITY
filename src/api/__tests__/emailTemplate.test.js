import { fetchEmailTemplatesApi } from '../emailTemplate';
import { axiosInstance } from '../../store';
import MockAdapter from 'axios-mock-adapter';
import { API } from '../../constants';

describe('fetchEmailTemplatesApi', () => {
  it('fetches successfully data from an API', async () => {
    const mock = new MockAdapter(axiosInstance);
    const data = [
      {
        EmailTemplateRecipientRule: {
          RecipientRuleGroups: [],
          RecipientRuleGroupOperator: 'Or'
        },
        EmailTemplateName: 'TPR',
        EmailTemplateDescription: 'TPR desc',
        EmailTemplateTORoles: [],
        EmailTemplateCC: [],
        EmailTemplateBody:
          '<p>[atc1:3f6a57a9-940b-4c55-85c8-595bf5971419]</p><p>[atc2:e7cd61ae-1b11-4987-8b62-e482bd3fcf84]</p>',
        EmailTemplateSubject: 'Table Placeholder resolve ',
        EmailTemplateId: '0e7b2d10-2fd3-4b59-b20d-2f245d65dca8',
        EmailTemplateTO: [
          {
            Value: 'srinivas.manchikatla@iqvia.com',
            Type: 'Email'
          }
        ],
        EmailTemplateOpportunityTypes: 'Default Type',
        EmailTemplateCCRoles: []
      },
      {
        EmailTemplateRecipientRule: {
          RecipientRuleGroups: [],
          RecipientRuleGroupOperator: 'Or'
        },
        EmailTemplateName: 'Table Template',
        EmailTemplateDescription: 'Table Template Desc',
        EmailTemplateTORoles: [],
        EmailTemplateCC: [],
        EmailTemplateBody:
          '<p>[it_will_kick_out_at_first:76aced19-0af2-46a0-b468-f30d05d7ba59]</p><p>[table_empty_config:ec1ef246-0783-4ece-8d3e-39c1d809e1c9]</p><p>[table_check:78b4cdaf-7788-4369-ab01-32a0fa97f2d5]</p><p>[table_testing:457a8d78-e082-4860-9451-cd4b6eb57ef1]</p><p>[table_row_col_hide:91df9542-cd25-4b62-94b6-0ab051d348a8]</p>',
        EmailTemplateSubject: 'Table Template Resolve placeholders',
        EmailTemplateId: '11ddca8f-8476-4203-9f8d-3d294ccb7962',
        EmailTemplateTO: [
          {
            Value: 'srinivas.manchikatla@iqvia.com',
            Type: 'Email'
          }
        ],
        EmailTemplateOpportunityTypes:
          'Default Type,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)',
        EmailTemplateCCRoles: []
      }
    ];
    const { EMAILTEMPLATES_API_URL } = API.EMAILTEMPLATES;
    const { API_KEY } = API.PROPOSAL;

    mock
      .onGet(EMAILTEMPLATES_API_URL, {
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': 'mock_token'
        }
      })
      .reply(200, data);

    const response = await fetchEmailTemplatesApi();
    expect(response).toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const mock = new MockAdapter(axiosInstance);
    const { EMAILTEMPLATES_API_URL } = API.EMAILTEMPLATES;
    const { API_KEY } = API.PROPOSAL;

    mock
      .onGet(EMAILTEMPLATES_API_URL, {
        headers: {
          'x-api-key': API_KEY,
          'x-access-token': 'mock_token'
        }
      })
      .reply(500);

    try {
      await fetchEmailTemplatesApi();
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 500');
    }
  });
});
