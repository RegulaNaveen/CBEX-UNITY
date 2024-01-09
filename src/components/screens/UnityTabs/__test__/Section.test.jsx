import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { UnityTabContext } from '../Section';
import Section from '../Section';
import { store } from '../../../../store';
import * as ProposalApi from '../../../../api/proposal';
import Sinon from 'sinon';
import { UNITY_TABS } from '../../../../constants/types';
import { getOpportunity } from '../../../../redux/actions/proposal-actions';
import { REDUX_TYPES } from '../../../../constants';
import axios from 'axios';

const proposalData = [
  {
    proposal: {
      proposalDate: '2023-12-07T06:13:38.945Z',
      opportunityType: 'Default Type',
      accountId: '001D400000lScOgIAK',
      proposalId: '10b8fb84-7555-41ec-8205-5da16d3d9f00',
      questionTemplateVersionNumber: 'v2023.195',
      boxMigrated: true,
      inProgress: false,
      agreementId: 'aNMD4000000GsyqOAC',
      isDeleted: false,
      agreementName: 'RegressionTest',
      isApprovalCountPresent: true,
      proposalDetails: {
        Customer: 'KomalTest',
        'CRM #': 'JAB04242',
        'Bid due date': '2024-02-02',
        'Line of business': 'Clinical Technology',
        'Is this IQVIA Biotech': 'Yes',
        Phase: 'Phase 1/2',
        'Verbatim indication': 'Verbatim',
        'Therapeutic area': 'Oncology',
        'Protocol number': '',
        'Product name': 'generic',
        IsFsp: 'No',
        opportunityId: '006D4000009ynbRIAQ',
        BoxId: 'connect EAFNOSUPPORT ::1:80 - Local (undefined:undefined)',
        pertinentDetails: null,
        earlyEngagementDevelopmentPlan: null,
        bidNo: 1
      },
      nextMilestone: [
        {
          name: 'Deliverable due to customer',
          date: '02-Feb-2024'
        }
      ],
      bidType: 'Early_Engagement_Bid',
      opportunityTypeLogic:
        '[{"fieldName":"Early Engagement","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Record_Type__c","Sub group":""},"fieldValue":["Early Engagement Bid"],"answerRelationship":"And","operator":"Contains"}]}]},{"fieldName":"Program (Not-lead Opportunity)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Is_this_part_of_a_Program__c","Sub group":""},"fieldValue":["Yes - not the lead"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Clinical (AMR/EMEA)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Clinical (APAC)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["Southeast Asia"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["Australia & NZ"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["China Region"],"answerRelationship":"And","operator":"Contains"}]},{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"BD_Sub_Region_2__c","Sub group":""},"fieldValue":["India Region"],"answerRelationship":"And","operator":"Contains"}]}]},{"fieldName":"Non-Core Clinical Studies (RWE/ECD/etc.)","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Not Equal"}]}]},{"fieldName":"Ballpark","operator":"Or","conditions":[{"operator":"And","condition":[{"fieldName":{"SF Object API Name":"Bid_History__c","SF Field API Name":"Opportunity_Type__c","Sub group":""},"fieldValue":["Ballpark"],"answerRelationship":"And","operator":"Equal"},{"fieldName":{"SF Object API Name":"Opportunity","SF Field API Name":"Line_of_Business__c","Sub group":""},"fieldValue":["Clinical"],"answerRelationship":"And","operator":"Equal"}]}]},{"fieldName":"Default Type","operator":"Or","conditions":[]}]',
      opportunityName: 'RegressionTest',
      active: true,
      recordTypeId: '0122K000000sKxIQAU',
      customUnityTabs: [
        {
          UnityTabSectionOrder: 1,
          UnityTabSectionId: '42e7cf75-e173-4769-8247-6b3a243bbdfa',
          UnityTabSectionQuestions: ['2b660f6f-f888-43b7-9650-66e6aa8f22f5'],
          UnityTabSectionTitle: 'testt5362',
          TabID: '66d7fad9-7e46-4590-8c57-e9991e82dbb1',
          UnityTabOrder: 4,
          UnityTabId: '66d7fad9-7e46-4590-8c57-e9991e82dbb1',
          UnityTabTitle: 'Testing5362'
        }
      ],
      switchTemplateStatus: false,
      approvalsCount: 6
    },
    isCurrent: true
  }
];

describe('Section Component', () => {
  let sinonSandbox;

  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  const defaultProps = {
    sectionId: '42e7cf75-e173-4769-8247-6b3a243bbdfa',
    title: 'Testing5362',
    tabId: '66d7fad9-7e46-4590-8c57-e9991e82dbb1'
  };

  it('renders without crashing', async () => {
    jest.spyOn(ProposalApi, 'getAllProposals').mockReturnValue(proposalData);
    jest.spyOn(axios, 'get').mockResolvedValue(proposalData);

    await store.dispatch({
      type: UNITY_TABS.SET_UNITY_TABS,
      payload: [
        {
          UnityTabSectionOrder: 1,
          UnityTabSectionId: '42e7cf75-e173-4769-8247-6b3a243bbdfa',
          UnityTabSectionQuestions: ['2b660f6f-f888-43b7-9650-66e6aa8f22f5'],
          UnityTabSectionTitle: 'testt5362',
          TabID: '66d7fad9-7e46-4590-8c57-e9991e82dbb1',
          UnityTabOrder: 4,
          UnityTabId: '66d7fad9-7e46-4590-8c57-e9991e82dbb1',
          UnityTabTitle: 'Testing5362'
        }
      ]
    });

    await store.dispatch(
      getOpportunity('10b8fb84-7555-41ec-8205-5da16d3d9f00', 1)
    );
    const { container } = render(
      <Provider store={store}>
        <UnityTabContext.Provider value={{ dispatchLoadingEvent: jest.fn() }}>
          <Section {...defaultProps} />
        </UnityTabContext.Provider>
      </Provider>
    );
    screen.debug(undefined, Infinity);

    expect(container).toBeTruthy();
  });
});
