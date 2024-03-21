import { createPdf, questionTables } from '../pdf-template';
import { formatAnswer } from '../utils';
import data from '../__tests__/data.json';
import Logo from '../../../../../img/iqvia-main-logo.png';
import * as filter from '../word-template';
import { Map as IMap } from 'immutable';
describe('util tests', () => {
  it('should return hyperlink if question type is table', () => {
    const question = {
      answerConfiguration: {
        type: 'table'
      },
      questionId: '1'
    };
    const result = formatAnswer(question, 'pdf');
    expect(result).toEqual(
      `<a target="_blank" href="${window.location.href}&search_q=1">Click here to view the table in Unity</a>`
    );
  });

  it('should return last answer if question type is not table', () => {
    const question = {
      answerConfiguration: {
        type: 'text'
      },
      answers: [
        {
          answer: 'answer 1',
          date: '2020-01-01'
        },
        {
          answer: 'answer 2',
          date: '2020-01-02'
        }
      ]
    };
    const result = formatAnswer(question, 'pdf');
    expect(result).toEqual('answer 2');
  });

  it('should return last answer if doc_type is not pdf and question type is not table', () => {
    const question = {
      answerConfiguration: {
        type: 'text'
      },
      answers: [
        {
          answer: 'answer 1',
          date: '2020-01-01'
        },
        {
          answer: 'answer 2',
          date: '2020-01-02'
        }
      ]
    };
    const result = formatAnswer(question);
    expect(result).toEqual('answer 2');
  });

  it('test pdf template', () => {
    const proposalquestion = [
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: '088e8e63-0a1a-4167-919e-bc0961954a43',
        section: {
          sectionOrder: 27,
          sectionName: 'Questions for the Customer'
        },
        questionText: 'Latest table question',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer'],
        answers: [],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"77kb5","text":"Latest table question","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="cv55e" data-offset-key="77kb5-0-0"><div data-offset-key="77kb5-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="77kb5-0-0"><span data-text="true">Latest table question</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"row 1","col 1":"","rowId":0}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false},{"hidden":false,"alwaysVisible":false,"accessor":"col 1","header":"col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      },
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: 'Proposal Team-Z5P',
        section: {
          sectionOrder: 1,
          sectionName: 'Proposal Team'
        },
        questionText: 'Proposal Developer',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer', 'Proposal Developer'],
        answers: [],
        questionOrder: 2,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [
          {
            Name: 'Team',
            Color: '#595959'
          }
        ],
        interestedParties:
          'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Feasibility,Global Site Activation (GSA),Site Analytics,Global Analytics,Clinical Coder',
        opportunityType:
          'Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"kqovm","text":"Proposal Developer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="woh2x" data-offset-key="kqovm-0-0"><div data-offset-key="kqovm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="kqovm-0-0"><span data-text="true">Proposal Developer</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: false,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"Row 1","hidden":false,"Col 1":"","rowId":0}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Col 1","header":"Col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      },
      {
        proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
        questionId: '257768f7-ded0-480b-a09f-ffb5f9e02e5f',
        section: {
          sectionOrder: 18,
          sectionName: 'Details-For-Backend'
        },
        questionText: 'Services',
        answerConfiguration: {
          type: 'picklist',
          options: [
            'Advisory Analytics (CSDD)',
            'Biostatistical',
            'CD - ABPM',
            'CD - Actigraphy',
            'CD - CGM',
            'CD - ECG',
            'CD - Imaging',
            'CD - Spirometry',
            'CD - ePro/eCOA',
            'CEVA',
            'CTE',
            'CTS',
            'Clinical Monitoring',
            'Data Management',
            'ECD - Clinical Monitoring',
            'ECD - Clinical Project Manager',
            'ECG Monitoring',
            'Feasibility',
            'GCC - DCT',
            'GCC - Emergency Unblinding/Medical Monitor Triage',
            'GCC - Other',
            'GCC - Product Complaint',
            'GCC – EDC/Tech',
            'GSA Regulatory',
            'GSA Site ID/Start-up',
            'Global Regulatory Affairs Services – IND',
            'Health CPE Serv',
            'IQB Biostats',
            'IQB Consulting',
            'IQB ISSC',
            'IQB Investigator Meeting Planning',
            'IQB Medical Monitoring',
            'IQB Medical Writing',
            'IQB Ongoing DM',
            'IQB Project Management',
            'IQB Protocol Development',
            'IQB Regulatory',
            'IQB Reimbursement Support',
            'IQB Safety Processing',
            'IQB Safety Reporting',
            'IQB Site Contracts',
            'IQB Site Management',
            'IQB Site Payments',
            'IQB TMF Management',
            'IVR (Cenduit)',
            'Investigator Grant Estimates',
            'LP Biostatistics',
            'LP Consulting',
            'LP Data Management',
            'LP Enriched Studies',
            'LP Epidemiology/Medical Writing',
            'LP Project Management',
            'LP Regulatory',
            'LP Site ID',
            'LP Site Strategy',
            'LP – Call Center',
            'LP – Data Strategy',
            'Med Aff Serv',
            'Medical & Scientific',
            'Medical Writing',
            'PK Support for IND',
            'PK support for NDA/eCTD',
            'Patient Centered Endpoints (COA/PRO Consulting)',
            'Patient Recruitment',
            'Pharmacokinetics/Pharmacodynamics Stats',
            'Pharmacovigilance LifeCycle Safety',
            'Population PK/PD',
            'Project Management',
            'Pt Engmt Serv',
            'Q2 Bioanalytical',
            'Q2 Central Laboratory',
            'Quality Assurance (Clinical Auditing and Compliance)',
            'RBM - Central Monitoring',
            'Site Training Solutions (STS)',
            'eCOA (eDiary, ePRO, ClinRO, ObsRO, PerfO)'
          ]
        },
        roleNames: ['Other'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-07-28T06:03:34.993Z',
            answer: ['Advisory Analytics (CSDD)'],
            formattedAnswer: ['Advisory Analytics (CSDD)'],
            proposalId: '9e86fe68-f8aa-498d-8290-adae4a277447',
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-09-04T09:46:29.478Z',
            answer: ['Advisory Analytics (CSDD)'],
            formattedAnswer: ['Advisory Analytics (CSDD)'],
            proposalId: 'f84515f8-43df-4558-a606-20a42aa65256',
            updatedInPG: false
          },
          {
            user: 'CarryForwardAnswer',
            userName: 'CarryForwardAnswer',
            userRole: 'CarryForwardAnswer',
            date: '2024-03-13T13:25:03.151Z',
            answer: ['Advisory Analytics (CSDD)'],
            formattedAnswer: '["Advisory Analytics (CSDD)"]',
            proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
            updatedInPG: false,
            cfProposalId: 'f84515f8-43df-4558-a606-20a42aa65256'
          }
        ],
        questionOrder: 16,
        visible: false,
        locked: false,
        sfObject: 'Bid_History__c',
        sfField: 'Requested_Services__c',
        logic:
          '{"type":"unary","operation":"","condition":[{"fieldName":"Key stakeholders-Y0L","fieldValue":"Leslie Knope","operator":"Equal"}]}',
        milestoneNew: [],
        opportunityType:
          'Default Type,Core Opportunity Launch Call (APAC),Non-Core Clinical Studies,Ballpark OT,Core Opportunity Launch Call (AMR/EMEA)',
        hasDifferentSFanswer: true,
        currentSFanswer: {
          value: [],
          time: '2024-03-13T13:24:41.107Z'
        },
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"4k1r","text":"Services","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="4gf5n" data-offset-key="4k1r-0-0"><div data-offset-key="4k1r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4k1r-0-0"><span data-text="true">Services</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: 2,
        bidType: 'Clinical_Bid'
      },
      {
        proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
        questionId: '102ebf30-f33e-4559-b83f-acf88e56299c',
        section: {
          sectionOrder: 28,
          sectionName: 'New SF fields 5363'
        },
        questionText: ' Request Detail  ',
        answerConfiguration: {
          type: 'text',
          options: []
        },
        roleNames: ['Executive Oversight'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T09:21:36.629Z',
            answer: 'Tell me some more',
            formattedAnswer: 'Tell me some more',
            proposalId: '6d6aa10e-e009-4df5-a4e3-e981e4f9fee4',
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T12:14:52.572Z',
            answer: 'Test',
            formattedAnswer: 'Test',
            proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
            updatedInPG: false
          }
        ],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'Bid_History__c',
        sfField: 'Request_Detail__c',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
        hasDifferentSFanswer: false,
        currentSFanswer: {
          value: 'Test',
          time: '2024-03-13T13:24:40.892Z'
        },
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"bemim","text":" Request Detail  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9kl5t" data-offset-key="bemim-0-0"><div data-offset-key="bemim-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bemim-0-0"><span data-text="true"> </span></span><span data-offset-key="bemim-0-1" style="font-weight: bold;"><span data-text="true">Request Detail</span></span><span data-offset-key="bemim-0-2"><span data-text="true">  </span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: null,
        bidType: 'RFI_Request'
      },
      {
        proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
        questionId: '102ebf30-f33e-4559-b83f-acf88e56299c',
        section: {
          sectionOrder: 28,
          sectionName: 'New SF fields 5363'
        },
        questionText: ' Request Detail  ',
        answerConfiguration: {
          type: 'text',
          options: []
        },
        roleNames: ['Executive Oversight'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T09:21:36.629Z',
            answer: 'Tell me some more',
            formattedAnswer: 'Tell me some more',
            proposalId: '6d6aa10e-e009-4df5-a4e3-e981e4f9fee4',
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T12:14:52.572Z',
            answer: 'Test',
            formattedAnswer: 'Test',
            proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
            updatedInPG: false
          }
        ],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'Bid_History__c',
        sfField: 'Request_Detail__c',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
        hasDifferentSFanswer: false,
        currentSFanswer: {
          value: 'Test',
          time: '2024-03-13T13:24:40.892Z'
        },
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"bemim","text":" Request Detail  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9kl5t" data-offset-key="bemim-0-0"><div data-offset-key="bemim-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bemim-0-0"><span data-text="true"> </span></span><span data-offset-key="bemim-0-1" style="font-weight: bold;"><span data-text="true">Request Detail</span></span><span data-offset-key="bemim-0-2"><span data-text="true">  </span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: null,
        bidType: 'RFI_Request'
      }
    ];
    const allquestion = [
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: '088e8e63-0a1a-4167-919e-bc0961954a43',
        section: {
          sectionOrder: 27,
          sectionName: 'Questions for the Customer'
        },
        questionText: 'Latest table question',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer'],
        answers: [],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"77kb5","text":"Latest table question","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="cv55e" data-offset-key="77kb5-0-0"><div data-offset-key="77kb5-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="77kb5-0-0"><span data-text="true">Latest table question</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"row 1","col 1":"","rowId":0}],"columns":[{"accessor":"header","frozen":true,"hidden":false,"locked":false,"type":"text","alwaysVisible":false},{"hidden":false,"alwaysVisible":false,"accessor":"col 1","header":"col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      },
      {
        proposalId: 'e7a77d70-b7a1-4a98-8d6e-e1f1244b64f5',
        questionId: 'Proposal Team-Z5P',
        section: {
          sectionOrder: 1,
          sectionName: 'Proposal Team'
        },
        questionText: 'Proposal Developer',
        answerConfiguration: {
          type: 'table',
          options: []
        },
        roleNames: ['Business Developer', 'Proposal Developer'],
        answers: [],
        questionOrder: 2,
        visible: true,
        locked: false,
        sfObject: 'n/a',
        sfField: 'n/a',
        milestoneNew: [
          {
            Name: 'Team',
            Color: '#595959'
          }
        ],
        interestedParties:
          'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Feasibility,Global Site Activation (GSA),Site Analytics,Global Analytics,Clinical Coder',
        opportunityType:
          'Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
        hasDifferentSFanswer: false,
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"kqovm","text":"Proposal Developer","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="woh2x" data-offset-key="kqovm-0-0"><div data-offset-key="kqovm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="kqovm-0-0"><span data-text="true">Proposal Developer</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: false,
        questionTableConfig:
          '{"canEditColumn":false,"canAddRow":false,"rows":[{"header":"Row 1","hidden":false,"Col 1":"","rowId":0}],"columns":[{"hidden":false,"alwaysVisible":false,"accessor":"header","header":"","frozen":true,"locked":false,"type":"text"},{"hidden":false,"alwaysVisible":false,"accessor":"Col 1","header":"Col 1","frozen":false,"locked":false,"type":"text"}],"canAddColumn":false,"canEditRow":false}',
        latestAnsweredBidNo: null,
        bidType: 'Early_Engagement_Bid'
      },
      {
        proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
        questionId: '257768f7-ded0-480b-a09f-ffb5f9e02e5f',
        section: {
          sectionOrder: 18,
          sectionName: 'Details-For-Backend'
        },
        questionText: 'Services',
        answerConfiguration: {
          type: 'picklist',
          options: [
            'Advisory Analytics (CSDD)',
            'Biostatistical',
            'CD - ABPM',
            'CD - Actigraphy',
            'CD - CGM',
            'CD - ECG',
            'CD - Imaging',
            'CD - Spirometry',
            'CD - ePro/eCOA',
            'CEVA',
            'CTE',
            'CTS',
            'Clinical Monitoring',
            'Data Management',
            'ECD - Clinical Monitoring',
            'ECD - Clinical Project Manager',
            'ECG Monitoring',
            'Feasibility',
            'GCC - DCT',
            'GCC - Emergency Unblinding/Medical Monitor Triage',
            'GCC - Other',
            'GCC - Product Complaint',
            'GCC – EDC/Tech',
            'GSA Regulatory',
            'GSA Site ID/Start-up',
            'Global Regulatory Affairs Services – IND',
            'Health CPE Serv',
            'IQB Biostats',
            'IQB Consulting',
            'IQB ISSC',
            'IQB Investigator Meeting Planning',
            'IQB Medical Monitoring',
            'IQB Medical Writing',
            'IQB Ongoing DM',
            'IQB Project Management',
            'IQB Protocol Development',
            'IQB Regulatory',
            'IQB Reimbursement Support',
            'IQB Safety Processing',
            'IQB Safety Reporting',
            'IQB Site Contracts',
            'IQB Site Management',
            'IQB Site Payments',
            'IQB TMF Management',
            'IVR (Cenduit)',
            'Investigator Grant Estimates',
            'LP Biostatistics',
            'LP Consulting',
            'LP Data Management',
            'LP Enriched Studies',
            'LP Epidemiology/Medical Writing',
            'LP Project Management',
            'LP Regulatory',
            'LP Site ID',
            'LP Site Strategy',
            'LP – Call Center',
            'LP – Data Strategy',
            'Med Aff Serv',
            'Medical & Scientific',
            'Medical Writing',
            'PK Support for IND',
            'PK support for NDA/eCTD',
            'Patient Centered Endpoints (COA/PRO Consulting)',
            'Patient Recruitment',
            'Pharmacokinetics/Pharmacodynamics Stats',
            'Pharmacovigilance LifeCycle Safety',
            'Population PK/PD',
            'Project Management',
            'Pt Engmt Serv',
            'Q2 Bioanalytical',
            'Q2 Central Laboratory',
            'Quality Assurance (Clinical Auditing and Compliance)',
            'RBM - Central Monitoring',
            'Site Training Solutions (STS)',
            'eCOA (eDiary, ePRO, ClinRO, ObsRO, PerfO)'
          ]
        },
        roleNames: ['Other'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-07-28T06:03:34.993Z',
            answer: ['Advisory Analytics (CSDD)'],
            formattedAnswer: ['Advisory Analytics (CSDD)'],
            proposalId: '9e86fe68-f8aa-498d-8290-adae4a277447',
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2023-09-04T09:46:29.478Z',
            answer: ['Advisory Analytics (CSDD)'],
            formattedAnswer: ['Advisory Analytics (CSDD)'],
            proposalId: 'f84515f8-43df-4558-a606-20a42aa65256',
            updatedInPG: false
          },
          {
            user: 'CarryForwardAnswer',
            userName: 'CarryForwardAnswer',
            userRole: 'CarryForwardAnswer',
            date: '2024-03-13T13:25:03.151Z',
            answer: ['Advisory Analytics (CSDD)'],
            formattedAnswer: '["Advisory Analytics (CSDD)"]',
            proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
            updatedInPG: false,
            cfProposalId: 'f84515f8-43df-4558-a606-20a42aa65256'
          }
        ],
        questionOrder: 16,
        visible: false,
        locked: false,
        sfObject: 'Bid_History__c',
        sfField: 'Requested_Services__c',
        logic:
          '{"type":"unary","operation":"","condition":[{"fieldName":"Key stakeholders-Y0L","fieldValue":"Leslie Knope","operator":"Equal"}]}',
        milestoneNew: [],
        opportunityType:
          'Default Type,Core Opportunity Launch Call (APAC),Non-Core Clinical Studies,Ballpark OT,Core Opportunity Launch Call (AMR/EMEA)',
        hasDifferentSFanswer: true,
        currentSFanswer: {
          value: [],
          time: '2024-03-13T13:24:41.107Z'
        },
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"4k1r","text":"Services","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="4gf5n" data-offset-key="4k1r-0-0"><div data-offset-key="4k1r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4k1r-0-0"><span data-text="true">Services</span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: 2,
        bidType: 'Clinical_Bid'
      },
      {
        proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
        questionId: '102ebf30-f33e-4559-b83f-acf88e56299c',
        section: {
          sectionOrder: 28,
          sectionName: 'New SF fields 5363'
        },
        questionText: ' Request Detail  ',
        answerConfiguration: {
          type: 'text',
          options: []
        },
        roleNames: ['Executive Oversight'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T09:21:36.629Z',
            answer: 'Tell me some more',
            formattedAnswer: 'Tell me some more',
            proposalId: '6d6aa10e-e009-4df5-a4e3-e981e4f9fee4',
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T12:14:52.572Z',
            answer: 'Test',
            formattedAnswer: 'Test',
            proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
            updatedInPG: false
          }
        ],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'Bid_History__c',
        sfField: 'Request_Detail__c',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
        hasDifferentSFanswer: false,
        currentSFanswer: {
          value: 'Test',
          time: '2024-03-13T13:24:40.892Z'
        },
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"bemim","text":" Request Detail  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9kl5t" data-offset-key="bemim-0-0"><div data-offset-key="bemim-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bemim-0-0"><span data-text="true"> </span></span><span data-offset-key="bemim-0-1" style="font-weight: bold;"><span data-text="true">Request Detail</span></span><span data-offset-key="bemim-0-2"><span data-text="true">  </span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: null,
        bidType: 'RFI_Request'
      },
      {
        proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
        questionId: '102ebf30-f33e-4559-b83f-acf88e56299c',
        section: {
          sectionOrder: 28,
          sectionName: 'New SF fields 5363'
        },
        questionText: ' Request Detail  ',
        answerConfiguration: {
          type: 'text',
          options: []
        },
        roleNames: ['Executive Oversight'],
        answers: [
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T09:21:36.629Z',
            answer: 'Tell me some more',
            formattedAnswer: 'Tell me some more',
            proposalId: '6d6aa10e-e009-4df5-a4e3-e981e4f9fee4',
            updatedInPG: false
          },
          {
            user: 'AnswerPulledFromSalesforce',
            userName: 'AnswerPulledFromSalesforce',
            userRole: 'AnswerPulledFromSalesforce',
            date: '2024-02-13T12:14:52.572Z',
            answer: 'Test',
            formattedAnswer: 'Test',
            proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
            updatedInPG: false
          }
        ],
        questionOrder: 4,
        visible: true,
        locked: false,
        sfObject: 'Bid_History__c',
        sfField: 'Request_Detail__c',
        milestoneNew: [],
        opportunityType:
          'Default Type,Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT',
        hasDifferentSFanswer: false,
        currentSFanswer: {
          value: 'Test',
          time: '2024-03-13T13:24:40.892Z'
        },
        isCustomQuestion: false,
        questionJSON:
          '{"blocks":[{"key":"bemim","text":" Request Detail  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":14,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        questionHTML:
          '<div data-contents="true"><div data-block="true" data-editor="9kl5t" data-offset-key="bemim-0-0"><div data-offset-key="bemim-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bemim-0-0"><span data-text="true"> </span></span><span data-offset-key="bemim-0-1" style="font-weight: bold;"><span data-text="true">Request Detail</span></span><span data-offset-key="bemim-0-2"><span data-text="true">  </span></span></div></div></div>',
        questionHintJSON: '',
        questionHintHTML: '',
        active: true,
        integration: '',
        events: '',
        notApplicable: false,
        questionApproval: false,
        bidAnswerCopy: true,
        questionTableConfig: '{}',
        latestAnsweredBidNo: null,
        bidType: 'RFI_Request'
      }
    ];
    const html = questionTables(allquestion, proposalquestion);
    expect(html.length).toBeGreaterThan(0);
  });

  it('pdf template', () => {
    data.image = Logo;
    data.editor = IMap({
      bidType: 'Clinical_Bid'
    });
  });
  jest.spyOn(filter, 'getFilteredQuestion').mockReturnValue([
    {
      proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
      questionId: '141e112a-710b-414f-846f-a6ee6b86d403',
      section: {
        sectionOrder: 2,
        sectionName: 'Proposal Team'
      },
      questionText: 'Test',
      answerConfiguration: {
        type: 'date',
        options: []
      },
      roleNames: ['BD Leadership'],
      answers: [
        {
          user: 'rahul.tiwari@iqvia.com',
          userName: 'RAHUL TIWARI',
          userRole: 'Clinical Coder',
          date: '2024-03-20T05:48:51.760Z',
          answer: '05-Mar-2024',
          proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
          updatedInPG: true
        }
      ],
      questionOrder: 1,
      visible: true,
      locked: false,
      milestoneNew: [],
      hasDifferentSFanswer: false,
      isCustomQuestion: true,
      questionJSON: '',
      questionHTML: '',
      questionHintJSON: '',
      questionHintHTML: '',
      active: true,
      integration: '',
      events: '',
      notApplicable: false,
      questionApproval: false,
      bidAnswerCopy: true,
      latestAnsweredBidNo: null,
      bidType: 'RFI_Request'
    },
    {
      proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
      questionId: 'Proposal Team-P0X',
      section: {
        sectionOrder: 1,
        sectionName: 'Proposal Team'
      },
      questionText: 'Business Developera',
      answerConfiguration: {
        type: 'text',
        options: []
      },
      roleNames: ['Business Developer', 'Proposal Developer'],
      answers: [
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-08-21T12:01:20.543Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: '6747c7e6-f081-4590-944d-e5f096dc6926',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-09-04T09:12:22.981Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: 'd41212d9-7648-441f-b711-91b070ccaff2',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-09-04T09:35:15.906Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: '0e03a5fe-dfcc-4dd4-92c0-b59cb8958039',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-09-04T09:46:28.775Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: 'f84515f8-43df-4558-a606-20a42aa65256',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2023-09-04T09:50:01.386Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: 'bd1f723a-7d0c-4c21-87b3-9df693fdca00',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2024-02-13T09:21:34.808Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: '6d6aa10e-e009-4df5-a4e3-e981e4f9fee4',
          updatedInPG: false
        },
        {
          user: 'AnswerPulledFromSalesforce',
          userName: 'AnswerPulledFromSalesforce',
          userRole: 'AnswerPulledFromSalesforce',
          date: '2024-02-13T12:14:50.752Z',
          answer: 'Sushil Munda(sushil.munda@iqvia.com)',
          formattedAnswer: 'Sushil Munda(sushil.munda@iqvia.com)',
          proposalId: 'a49ed80a-d782-40c0-9ff4-bbe35eb0e904',
          updatedInPG: false
        }
      ],
      questionOrder: 1,
      visible: true,
      locked: false,
      sfObject: 'Opportunity',
      sfField: 'Owner_Email__c',
      milestoneNew: [
        {
          Name: 'Team',
          Color: '#595959'
        }
      ],
      interestedParties:
        'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Site Analytics,Global Site Activation (GSA),Feasibility,Global Analytics,Clinical Coder',
      opportunityType:
        'Core Opportunity Launch Call (AMR/EMEA),Core Opportunity Launch Call (APAC)',
      questionHint: 'Test',
      businessRule:
        '{"conditions":[{"operator":"Or","condition":[{"fieldName":"722f9c3c-5538-4b64-bda5-76604d61da46","fieldValue":["11","10"],"answerRelationship":"Or","Operator":"Not Equal"}],"action":[{"fieldName":"Proposal Team-P0X","fieldValue":["100"],"fieldAction":"Equal","action":"setAnswer"}]}]}',
      hasDifferentSFanswer: false,
      currentSFanswer: {
        value: 'Sushil Munda(sushil.munda@iqvia.com)',
        time: '2024-03-13T13:24:43.303Z'
      },
      isCustomQuestion: false,
      questionJSON:
        '{"blocks":[{"key":"wg8j8","text":"Business Developera","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      questionHTML:
        '<div data-contents="true"><div data-block="true" data-editor="254m9" data-offset-key="wg8j8-0-0"><div data-offset-key="wg8j8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="wg8j8-0-0"><span data-text="true">Business Developera</span></span></div></div></div>',
      questionHintJSON:
        '{"blocks":[{"key":"e1dk8","text":"Test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      questionHintHTML:
        '<div data-contents="true"><div data-block="true" data-editor="b8ffl" data-offset-key="e1dk8-0-0"><div data-offset-key="e1dk8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="e1dk8-0-0"><span data-text="true">Test</span></span></div></div></div>',
      active: true,
      integration: '',
      events: '',
      notApplicable: false,
      questionApproval: false,
      bidAnswerCopy: false,
      questionTableConfig:
        '{"canEditColumn":false,"canAddRow":true,"rows":[{"row1":""}],"columns":[{"column1":""}],"canAddColumn":false,"canEditRow":true}',
      latestAnsweredBidNo: null,
      bidType: 'RFI_Request'
    }
  ]);
  const results = createPdf(data);
  expect(Object.keys(results).length).toBeGreaterThan(0);
});
