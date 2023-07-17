/**
 * jest-dom environment
 */

import * as SSOAUTHAPIs from '../../../api/sso-auth';
import { store } from '../../../store';
import { REDUX_TYPES } from '../../../constants';
import { fetchUserOpportunityPrefs, updateFavourite } from '../sso-auth-actions';

const opportuntityPrefsRes = {
    "preferences": [
        {
            "opp_number": "HAB199007",
            "favourite": true,
            "custom_header_tab": "custom 199007",
            "favourite_updated_date": "2023-07-11T15:15:27.664Z"
        },
        {
            "opp_number": "IAB70826",
            "favourite": true,
            "custom_header_tab": "",
            "favourite_updated_date": "2023-07-11T15:17:07.953Z"
        },
        {
            "opp_number": "IAB83484",
            "favourite": true,
            "custom_header_tab": "",
            "favourite_updated_date": "2023-07-11T15:53:51.236Z"
        }
    ]
}

export const proposals = {
    proposals: [
      {
        'opportunity number': 'UZA89257',
        opportunityName: 'Test Opportunity',
        proposalId: '',
        proposalDetails: {
          "Customer": "RealPage, Inc.",
          "CRM #": "UZA89257",
          "Bid due date": "2024-03-22",
          "Line of business": "Clinical",
          "Is this IQVIA Biotech": "No",
          "Phase": "Phase 3",
          "Verbatim indication": "chronic hcv",
          "Therapeutic area": "Infectious Disease",
          "Protocol number": "gs - us - 342 - 1138",
          "Product name": "gs - 5816",
          "BoxId": "201920827809",
          "IsFsp": "No",
          "pertinentDetails": "None",
          "opportunityId": "0060100000BClTFAA1",
          "bidNo": 12
        },
        opportunityOverview: {
          "Opportunity Overview-H8Z": "Viral hepatitis C",
          "Opportunity Overview-N9U": "Chemical/Small Molecule",
          "Opportunity Overview-H1X": "Full service RFP",
          "Opportunity Overview-Z4X": "",
          "Opportunity Overview-J7C": "",
          "OpportunityStatus": "3. Developing Proposal"
        },
        usersList: [
          {
            "userEmail": "aadish.tantia@iqvia.com",
            "userName": "Aadish Tantia",
            "userId": "1012093"
          },
          {
              "userEmail": "keerthiprasath.chandran@iqvia.com",
              "userName": "Keerthiprasath Chandran",
              "userId": "1088411"
          },
        ],
        approvalsCount: 5,
        isApprovalCountPresent: true,
        bidStopStatus: ''
      },
      {
        "updatedAt": "2023-07-10T16:47:38.706Z",
        "proposalId": "27423fe0-ea03-497b-9fc3-491cdd21f120",
        "accountId": "0010100000tt2JlAAI",
        "opportunityName": "RealPage, Inc.-gs - 5816-Phase 3",
        "agreementId": "aM701000000CeGrCAK",
        "agreementName": "RealPage, Inc.-gs - 5816-Phase 3",
        "proposalDate": "2023-04-04T09:43:45.515Z",
        "proposalDetails": {
            "Customer": "RealPage, Inc.",
            "CRM #": "UZA89257",
            "Bid due date": "2024-03-22T00:00:00.000Z",
            "Line of business": "Clinical",
            "Is this IQVIA Biotech": "No",
            "Phase": "Phase 3",
            "Verbatim indication": "chronic hcv",
            "Therapeutic area": "Infectious Disease",
            "Protocol number": "gs - us - 342 - 1138",
            "Product name": "gs - 5816",
            "BoxId": "201920827809",
            "IsFsp": "No",
            "pertinentDetails": "None",
            "opportunityId": "0060100000BClTFAA1",
            "bidNo": 12
        },
        "opportunityOverview": {
            "Opportunity Overview-H8Z": "Viral hepatitis C",
            "Opportunity Overview-N9U": "Chemical/Small Molecule",
            "Opportunity Overview-H1X": "Full service RFP",
            "Opportunity Overview-Z4X": "",
            "Opportunity Overview-J7C": "",
            "OpportunityStatus": "3. Developing Proposal"
        },
        "active": true,
        "boxMigrated": true,
        "opportunityTypeLogic": "[{\"fieldName\":\"Core Opportunity Launch Call (AMR/EMEA)\",\"operator\":\"Or\",\"conditions\":[{\"operator\":\"And\",\"condition\":[{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Line_of_Business__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Clinical\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"},{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Is_this_IQVIA_Biotech__c\",\"Sub group\":\"\"},\"fieldValue\":[\"No\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"}]}]},{\"fieldName\":\"Core Opportunity Launch Call (APAC)\",\"operator\":\"Or\",\"conditions\":[{\"operator\":\"And\",\"condition\":[{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Is_this_IQVIA_Biotech__c\",\"Sub group\":\"\"},\"fieldValue\":[\"No\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"},{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Line_of_Business__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Clinical\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"}]}]},{\"fieldName\":\"Non-Core Clinical Studies\",\"operator\":\"Or\",\"conditions\":[{\"operator\":\"And\",\"condition\":[{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Is_this_IQVIA_Biotech__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Yes\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"}]},{\"operator\":\"And\",\"condition\":[{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Line_of_Business__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Clinical\"],\"answerRelationship\":\"And\",\"operator\":\"Not Equal\"}]}]},{\"fieldName\":\"Ballpark\",\"operator\":\"Or\",\"conditions\":[{\"operator\":\"And\",\"condition\":[{\"fieldName\":{\"SF Object API Name\":\"Bid_History__c\",\"SF Field API Name\":\"Opportunity_Type__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Ballpark\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"},{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Line_of_Business__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Clinical\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"}]}]},{\"fieldName\":\"IQB Template\",\"operator\":\"Or\",\"conditions\":[{\"operator\":\"And\",\"condition\":[{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Is_this_IQVIA_Biotech__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Yes\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"},{\"fieldName\":{\"SF Object API Name\":\"Opportunity\",\"SF Field API Name\":\"Line_of_Business__c\",\"Sub group\":\"\"},\"fieldValue\":[\"Clinical\"],\"answerRelationship\":\"And\",\"operator\":\"Equal\"}]}]},{\"fieldName\":\"Default Type\",\"operator\":\"Or\",\"conditions\":[]}]",
        "opportunityType": "Core Opportunity Launch Call (AMR/EMEA)",
        "questionTemplateVersionNumber": "v2023.379",
        "inProgress": "",
        "isDeleted": "",
        "approvalsCount": 8,
        "isApprovalCountPresent": true,
        "switchTemplateStatus": "",
        "typeOfWidget": "",
        "bidStopStatus": "",
        "nextMilestone": [
            {
                "name": "Bid due date",
                "date": "22-Mar-2024"
            },
            {
                "name": "CRO Start Date",
                "date": "10-Jul-2023"
            }
        ],
        "usersList": [
            {
                "userEmail": "aadish.tantia@iqvia.com",
                "userName": "Aadish Tantia",
                "userId": "1012093"
            },
            {
                "userEmail": "keerthiprasath.chandran@iqvia.com",
                "userName": "Keerthiprasath Chandran",
                "userId": "1088411"
            },
            {
                "userEmail": "rahul.tiwari@iqvia.com",
                "userName": "RAHUL TIWARI",
                "userId": "1095367"
            },
            {
                "userEmail": "sushil.munda@iqvia.com",
                "userName": "Sushil Munda",
                "userId": "1138123"
            },
            {
                "userEmail": "vamsi.krishna5@iqvia.com",
                "userId": "1101790"
            }
        ]
      }
    ]
}

export const favourites = ['UZA89257', 'UZA87389'];
export const favouritesUpdatedDateMap = [
    {
        'opportunity number': 'UZA89257', 
        'updated date': '2023-07-10T13:47:05+05:30'
    },
    {
        'opportunity number': 'UZA87389', 
        'updated date': '2023-07-11T13:47:05+05:30'  
    }
];

export const proposalDetails = {
    "Customer": "AVKASH TEST",
    "CRM #": "UZA88708",
    "Bid due date": "2022-10-12T00:00:00.000Z",
    "Line of business": "Clinical",
    "Is this IQVIA Biotech": "No",
    "Phase": "Phase 1",
    "Verbatim indication": "test",
    "Therapeutic area": "Allergy",
    "Protocol number": "123",
    "Product name": "dmeo",
    "BoxId": "176801808962",
    "IsFsp": "No",
    "pertinentDetails": "demo",
    "opportunityId": "0060100000AOuK0AAL",
    "bidNo": 1
  };
  

describe('testing sso auth actions fetchUserOpportunityPrefs', () => {
    test('render with empty response', () => {
        const mockGetOppPrefs = jest.spyOn(SSOAUTHAPIs, 'getOppPrefs').mockResolvedValue({});
        store.dispatch(fetchUserOpportunityPrefs());
        expect(mockGetOppPrefs).toHaveBeenCalled();
    });

    test('dispatch the action with response', () => {
        store.dispatch({
            type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
            payload: { proposals: proposals.proposals }
        })
        const mockGetOppPrefs = jest.spyOn(SSOAUTHAPIs, 'getOppPrefs')
                                .mockResolvedValue(opportuntityPrefsRes);
        store.dispatch(fetchUserOpportunityPrefs());
        expect(mockGetOppPrefs).toHaveBeenCalled();
    });
});

describe('testing sso auth actions updateFavourite', () => {
    beforeEach(() => {
        store.dispatch({
            type: REDUX_TYPES.PROPOSAL.PROPOSAL_INFO,
            payload: { proposal: { proposalDetails }  }
          });
        store.dispatch({
            type: REDUX_TYPES.SSO_AUTH.SET_USER_FAVOURITES,
            payload: favourites
        });
        store.dispatch({
            type: REDUX_TYPES.SSO_AUTH.SET_FAVOURITES_UPDATED_DATE,
            payload: favouritesUpdatedDateMap
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('render with true for updateFavourite | add favorite', () => {
        store.dispatch(updateFavourite('UZA88708', true, "2023-07-11T15:15:27.664Z", proposalDetails));
        const favourites = store.getState().ssoAuth.toJS().favourites;
        const favouritesUpdatedDate = store.getState().ssoAuth.toJS().favouritesUpdatedDate;
        expect(favourites.length).toBe(3);
        expect(favouritesUpdatedDate.length).toBe(3);
    });

    test('render with false for updateFavourite | remove favorite', () => {
        store.dispatch(updateFavourite('UZA89257', false, "2023-07-11T15:15:27.664Z", proposalDetails));
        const favourites = store.getState().ssoAuth.toJS().favourites;
        const favouritesUpdatedDate = store.getState().ssoAuth.toJS().favouritesUpdatedDate;
        expect(favourites.length).toBe(1);
        expect(favouritesUpdatedDate.length).toBe(1);
    });
})