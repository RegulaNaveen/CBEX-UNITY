import { store } from '../../../store';
import {
  updateQuerySearchAction,
  openSearchAction,
  closeSearchAction,
  clearSearchAction,
  clearSearchResultsAction,
  navigateNextSearchAction,
  autoNavigationCompletedAction,
  doSearchAction,
  resetAutoNavigatedStateAfterDelay,
  resumeSearchAction
} from '../search-actions';

describe('search-actions test', () => {
  test('openSearchAction', async () => {
    await store.dispatch(openSearchAction());
  });
  test('closeSearchAction', async () => {
    await store.dispatch(closeSearchAction());
  });
  test('clearSearchResultsAction', async () => {
    await store.dispatch(clearSearchResultsAction());
  });
  test('updateQuerySearchAction', async () => {
    await store.dispatch(updateQuerySearchAction('test'));
  });
  test('clearSearchAction', async () => {
    await store.dispatch(clearSearchAction());
  });
  test('navigateNextSearchAction', async () => {
    await store.dispatch(navigateNextSearchAction());
  });
  test('autoNavigationCompletedAction', async () => {
    await store.dispatch(autoNavigationCompletedAction());
  });
  test('resetAutoNavigatedStateAfterDelay', async () => {
    await store.dispatch(resetAutoNavigatedStateAfterDelay());
  });

  test('doSearchAction', async () => {
    await store.dispatch(doSearchAction());
  });

  test('navigateNextSearchAction ', async () => {
    await store.dispatch(navigateNextSearchAction());
  });

  test('search resumeSearchAction', async () => {
    const data = {
      query: '1 march task',
      questions: [
        {
          proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
          questionId: '02849e48-3c63-4cbc-b2d1-d0d8c6fbb2f0',
          section: {
            sectionOrder: 4,
            sectionName: 'RFP Prep for BD (to be completed prior to triage)'
          },
          questionText:
            'Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.',
          answerConfiguration: {
            type: 'text',
            options: []
          },
          roleNames: ['Business Developer'],
          answers: [],
          questionOrder: 18,
          visible: true,
          locked: false,
          sfObject: 'n/a',
          sfField: 'n/a',
          milestoneNew: [
            {
              Name: 'Prep',
              Color: '#10558a'
            }
          ],
          interestedParties:
            'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
          opportunityType: 'Core Opportunity Launch Call (APAC),Default Type',
          hasDifferentSFanswer: false,
          isCustomQuestion: false,
          questionJSON:
            '{"blocks":[{"key":"8ipjl","text":"Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          questionHTML:
            '<div data-contents="true"><div data-block="true" data-editor="8gies" data-offset-key="8ipjl-0-0"><div data-offset-key="8ipjl-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8ipjl-0-0"><span data-text="true">Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.</span></span></div></div></div>',
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
          bidType: 'Early_Engagement_Bid'
        }
      ],
      sections: [
        {
          sectionOrder: 4,
          sectionName: 'RFP Prep for BD (to be completed prior to triage)',
          questions: {
            '8daca6cc-2c99-4571-ae6d-470f0e7068b5': {
              isCustomQuestion: false,
              questionId: '8daca6cc-2c99-4571-ae6d-470f0e7068b5',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 1,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              questionHint:
                'e.g., obtain safety and tolerability data to make a go/no-go decision, beat a competitor to market, bring effective treatment to market to meet unmet medical need, obtain marketing approval in a specific country or region, obtain data in a specific ethnic population for regulatory approval, etc.  Note: There is a similar question in the Win Strategy section that when completed, information can be pulled into the Challenge Call template in Qvidian. ',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"d2107","text":"Clinical Development Strategy & Status","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":38,"style":"BOLD"},{"offset":0,"length":38,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"6jh9p","text":"What business, scientific, or other advantage will a successful study bring the customer?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="652q6" data-offset-key="d2107-0-0"><div data-offset-key="d2107-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="d2107-0-0" style="font-weight: bold; font-size: 14pt;"><span data-text="true">Clinical Development Strategy &amp; Status</span></span></div></div><div data-block="true" data-editor="652q6" data-offset-key="6jh9p-0-0"><div data-offset-key="6jh9p-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="6jh9p-0-0"><br data-text="true"></span></div></div><div data-block="true" data-editor="652q6" data-offset-key="e0le0-0-0"><div data-offset-key="e0le0-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="e0le0-0-0"><span data-text="true">What business, scientific, or other advantage will a successful study bring the customer?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Clinical Development Strategy & Status What business, scientific, or other advantage will a successful study bring the customer?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"39oa9","text":"e.g., obtain safety and tolerability data to make a go/no-go decision, beat a competitor to market, bring effective treatment to market to meet unmet medical need, obtain marketing approval in a specific country or region, obtain data in a specific ethnic population for regulatory approval, etc. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1fger","text":"Note: There is a similar question in the Win Strategy section that when completed, information can be pulled into the Challenge Call template in Qvidian. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":154,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="6ksk5" data-offset-key="39oa9-0-0"><div data-offset-key="39oa9-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="39oa9-0-0"><span data-text="true">e.g., obtain safety and tolerability data to make a go/no-go decision, beat a competitor to market, bring effective treatment to market to meet unmet medical need, obtain marketing approval in a specific country or region, obtain data in a specific ethnic population for regulatory approval, etc. </span></span></div></div><div data-block="true" data-editor="6ksk5" data-offset-key="1fger-0-0"><div data-offset-key="1fger-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="1fger-0-0"><span data-text="true">Note: There is a similar question in the Win Strategy section that when completed, information can be pulled into the Challenge Call template in Qvidian. </span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Clinical DS&B,Business Developer,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '3a25176d-5be6-4d4f-b4b9-cd20c1722ef2': {
              isCustomQuestion: false,
              questionId: '3a25176d-5be6-4d4f-b4b9-cd20c1722ef2',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 2,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint:
                ' e.g., demonstrate efficacy; find the Phase II study dose (R2PD) or dose in combination with other drugs; demonstrate long term effect or outcome; assess first-in-human safety; demonstrate tolerability in Asian population and assess the ethnical differences, etc.',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"3s4h7","text":"What outcomes does the customer expect from this study?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="5k00r" data-offset-key="3s4h7-0-0"><div data-offset-key="3s4h7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="3s4h7-0-0"><span data-text="true">What outcomes does the customer expect from this study?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'What outcomes does the customer expect from this study?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"bjioq","text":" e.g., demonstrate efficacy; find the Phase II study dose (R2PD) or dose in combination with other drugs; demonstrate long term effect or outcome; assess first-in-human safety; demonstrate tolerability in Asian population and assess the ethnical differences, etc.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7q261" data-offset-key="bjioq-0-0"><div data-offset-key="bjioq-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bjioq-0-0"><span data-text="true"> e.g., demonstrate efficacy; find the Phase II study dose (R2PD) or dose in combination with other drugs; demonstrate long term effect or outcome; assess first-in-human safety; demonstrate tolerability in Asian population and assess the ethnical differences, etc.</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'Country Strategy-U2K': {
              isCustomQuestion: false,
              questionId: 'Country Strategy-U2K',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 3,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"we2kl","text":"Which regions/countries does the customer intend to register the product in?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="d84s6" data-offset-key="we2kl-0-0"><div data-offset-key="we2kl-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="we2kl-0-0"><span data-text="true">Which regions/countries does the customer intend to register the product in?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Which regions/countries does the customer intend to register the product in?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '322d97ea-d513-4537-a5f4-ec579f1650e1': {
              isCustomQuestion: false,
              questionId: '322d97ea-d513-4537-a5f4-ec579f1650e1',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 4,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"3t7mc","text":"What is the status of earlier phase studies for the product and which CRO, if any, is supporting?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="b664j" data-offset-key="3t7mc-0-0"><div data-offset-key="3t7mc-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="3t7mc-0-0"><span data-text="true">What is the status of earlier phase studies for the product and which CRO, if any, is supporting?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'What is the status of earlier phase studies for the product and which CRO, if any, is supporting?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '1a1b4688-ad39-448a-9e71-8c303c9ee5d9': {
              isCustomQuestion: false,
              questionId: '1a1b4688-ad39-448a-9e71-8c303c9ee5d9',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 5,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"fh85d","text":"Is the customer conducting other studies with the same product in any country?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7gvi2" data-offset-key="fh85d-0-0"><div data-offset-key="fh85d-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fh85d-0-0"><span data-text="true">Is the customer conducting other studies with the same product in any country?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Is the customer conducting other studies with the same product in any country?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'Study Timelines-B5M': {
              isCustomQuestion: false,
              questionId: 'Study Timelines-B5M',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 6,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"sbmdv","text":"Timelines","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"},{"offset":0,"length":9,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"d0ufe","text":"What is the top timeline priority for the customer?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":12,"length":3,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="cn869" data-offset-key="sbmdv-0-0"><div data-offset-key="sbmdv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="sbmdv-0-0" style="font-weight: bold;"><span data-text="true">Timelines</span></span></div></div><div data-block="true" data-editor="cn869" data-offset-key="d0ufe-0-0"><div data-offset-key="d0ufe-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="d0ufe-0-0"><span data-text="true">What is the </span></span><span data-offset-key="d0ufe-0-1" style="text-decoration: underline;"><span data-text="true">top</span></span><span data-offset-key="d0ufe-0-2"><span data-text="true"> timeline priority for the customer?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Timelines What is the top timeline priority for the customer?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select-lookup',
                options: [
                  'First SIV',
                  'FPI',
                  'X Patients enrolled',
                  'LPI',
                  'Interim Analysis',
                  'LPO',
                  'DBL',
                  'Final CSR'
                ]
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Project Lead,Medical Strategy Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '19d47f4d-66ae-4987-be83-7e28c27d9471': {
              isCustomQuestion: false,
              questionId: '19d47f4d-66ae-4987-be83-7e28c27d9471',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 7,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"32qd2","text":"Why is the above the top timeline priority? What will happen if this milestone is not met?  Is the customer willing to take on more risk or pay a higher price to meet the target or earliest date?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":1,"length":9,"style":"color-#000000"},{"offset":13,"length":78,"style":"color-#000000"},{"offset":92,"length":103,"style":"color-#000000"},{"offset":10,"length":81,"style":""},{"offset":44,"length":47,"style":"ITALIC"},{"offset":44,"length":47,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="ac2t1" data-offset-key="32qd2-0-0"><div data-offset-key="32qd2-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="32qd2-0-0"><span data-text="true">W</span></span><span data-offset-key="32qd2-0-1" style="color: rgb(0, 0, 0);"><span data-text="true">hy is the</span></span><span data-offset-key="32qd2-0-2"><span data-text="true"> ab</span></span><span data-offset-key="32qd2-0-3" style="color: rgb(0, 0, 0);"><span data-text="true">ove the top timeline priority? </span></span><span data-offset-key="32qd2-0-4" style="color: rgb(0, 0, 0); font-style: italic; text-decoration: underline;"><span data-text="true">What will happen if this milestone is not met? </span></span><span data-offset-key="32qd2-0-5"><span data-text="true"> Is the customer willing to take on more risk or pay a higher price to meet the target or earliest date?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Why is the above the top timeline priority? What will happen if this milestone is not met?  Is the customer willing to take on more risk or pay a higher price to meet the target or earliest date?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"Study Timelines-B5M","fieldValue":"","operator":"Is Not Blank"}]}'
            },
            '6bd53aed-0ec8-4960-a895-7a4ff1a34925': {
              isCustomQuestion: false,
              questionId: '6bd53aed-0ec8-4960-a895-7a4ff1a34925',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 8,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              questionHint:
                ' e.g., CRO start date, final protocol availability, FPI date, enrollment duration, follow-up duration',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"de7vp","text":" Are there any key milestone expectations that are not mentioned in the RFP materials?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="agu2e" data-offset-key="de7vp-0-0"><div data-offset-key="de7vp-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="de7vp-0-0"><span data-text="true"> Are there any key milestone expectations that are not mentioned in the RFP materials?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                ' Are there any key milestone expectations that are not mentioned in the RFP materials?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"ae1ir","text":" e.g., CRO start date, final protocol availability, FPI date, enrollment duration, follow-up duration","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="ak3r8" data-offset-key="ae1ir-0-0"><div data-offset-key="ae1ir-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ae1ir-0-0"><span data-text="true"> e.g., CRO start date, final protocol availability, FPI date, enrollment duration, follow-up duration)</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'dcba66de-6595-4a1d-b364-f7bc85030d4c': {
              isCustomQuestion: false,
              questionId: 'dcba66de-6595-4a1d-b364-f7bc85030d4c',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 9,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"4u8re","text":"Target Countries","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":16,"style":"BOLD"},{"offset":0,"length":16,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"2j95h","text":"Did the customer specify the target countries?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="2lj32" data-offset-key="4u8re-0-0"><div data-offset-key="4u8re-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4u8re-0-0" style="font-weight: bold;"><span data-text="true">Target Countries</span></span></div></div><div data-block="true" data-editor="2lj32" data-offset-key="2j95h-0-0"><div data-offset-key="2j95h-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="2j95h-0-0"><span data-text="true">Did the customer specify the target countries?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Target Countries Did the customer specify the target countries?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'c8940199-749f-4d1c-817d-86d3f745a774': {
              isCustomQuestion: false,
              questionId: 'c8940199-749f-4d1c-817d-86d3f745a774',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'Targeted_Countries__c',
              questionOrder: 10,
              questionApproval: false,
              currentSFanswer: {
                value: [],
                time: '2024-03-04T04:49:16.910Z'
              },
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"4p99o","text":"Which countries did the customer specify?  ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [],
              hasDifferentSFanswer: true,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7i4ru" data-offset-key="4p99o-0-0"><div data-offset-key="4p99o-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4p99o-0-0"><span data-text="true">Which countries did the customer specify?  </span></span></div></div></div>',
              roleNames: ['Proposal Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'Bid_History__c',
              questionText: 'Which countries did the customer specify?  ',
              integration: '',
              answers: [
                {
                  user: 'AnswerPulledFromSalesforce',
                  userName: 'AnswerPulledFromSalesforce',
                  userRole: 'AnswerPulledFromSalesforce',
                  date: '2024-02-29T14:19:45.320Z',
                  answer: ['United States of America'],
                  formattedAnswer: ['United States of America'],
                  proposalId: 'c2b2b603-d5ea-4578-a849-903c6d3d8b84',
                  updatedInPG: false
                },
                {
                  userRole: 'CarryForwardAnswer',
                  user: 'CarryForwardAnswer',
                  proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
                  date: '2024-03-04T04:49:31.372Z',
                  cfProposalId: 'c2b2b603-d5ea-4578-a849-903c6d3d8b84',
                  userName: 'CarryForwardAnswer',
                  updatedInPG: false,
                  formattedAnswer: '["United States of America"]',
                  answer: ['United States of America']
                }
              ],
              questionHintJSON: '',
              bidType: 'Clinical_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'picklist-lookup',
                options: [
                  'United States of America',
                  'Afghanistan',
                  'Aland Islands',
                  'Albania',
                  'Algeria',
                  'American Samoa',
                  'Andorra',
                  'Angola',
                  'Anguilla',
                  'Antarctica',
                  'Antigua and Barbuda',
                  'Argentina',
                  'Armenia',
                  'Aruba',
                  'Australia',
                  'Austria',
                  'Azerbaijan',
                  'Bahamas',
                  'Bahrain',
                  'Bangladesh',
                  'Barbados',
                  'Belarus',
                  'Belgium',
                  'Belize',
                  'Benin',
                  'Bermuda',
                  'Bhutan',
                  'Bolivia',
                  'Bosnia and Herzegovina',
                  'Botswana',
                  'Bouvet Island',
                  'Brazil',
                  'British Virgin Islands',
                  'British Indian Ocean Territory',
                  'Brunei Darussalam',
                  'Bulgaria',
                  'Burkina Faso',
                  'Burundi',
                  'Cambodia',
                  'Cameroon',
                  'Canada',
                  'Cape Verde',
                  'Cayman Islands',
                  'Central African Republic',
                  'Chad',
                  'Chile',
                  'China',
                  'Hong Kong',
                  'SAR China',
                  'Macao',
                  'SAR China',
                  'Christmas Island',
                  'Cocos (Keeling) Islands',
                  'Colombia',
                  'Comoros',
                  'Congo (Brazzaville)',
                  'Congo',
                  '(Kinshasa)',
                  'Cook Islands',
                  'Costa Rica',
                  "Côte d'Ivoire",
                  'Croatia',
                  'Cuba',
                  'Cyprus',
                  'Czech Republic',
                  'Denmark',
                  'Djibouti',
                  'Dominica',
                  'Dominican Republic',
                  'Ecuador',
                  'Egypt',
                  'El Salvador',
                  'Equatorial Guinea',
                  'Eritrea',
                  'Estonia',
                  'Ethiopia',
                  'Falkland Islands (Malvinas)',
                  'Faroe Islands',
                  'Fiji',
                  'Finland',
                  'France',
                  'French Guiana',
                  'French Polynesia',
                  'French Southern Territories',
                  'Gabon',
                  'Gambia',
                  'Georgia',
                  'Germany',
                  'Ghana',
                  'Gibraltar',
                  'Greece',
                  'Greenland',
                  'Grenada',
                  'Guadeloupe',
                  'Guam',
                  'Guatemala',
                  'Guernsey',
                  'Guinea',
                  'Guinea-Bissau',
                  'Guyana',
                  'Haiti',
                  'Heard and Mcdonald Islands',
                  'Holy See (Vatican City State)',
                  'Honduras',
                  'Hungary',
                  'Iceland',
                  'India',
                  'Indonesia',
                  'Iran',
                  'Islamic Republic of',
                  'Iraq',
                  'Ireland',
                  'Isle of Man',
                  'Israel',
                  'Italy',
                  'Jamaica',
                  'Japan',
                  'Jersey',
                  'Jordan',
                  'Kazakhstan',
                  'Kenya',
                  'Kiribati',
                  'Korea (North)',
                  'Korea (South)',
                  'Kuwait',
                  'Kyrgyzstan',
                  'Lao PDR',
                  'Latvia',
                  'Lebanon',
                  'Lesotho',
                  'Liberia',
                  'Libya',
                  'Liechtenstein',
                  'Lithuania',
                  'Luxembourg',
                  'Macedonia',
                  'Republic of',
                  'Madagascar',
                  'Malawi',
                  'Malaysia',
                  'Maldives',
                  'Mali',
                  'Malta',
                  'Marshall Islands',
                  'Martinique',
                  'Mauritania',
                  'Mauritius',
                  'Mayotte',
                  'Mexico',
                  'Micronesia',
                  'Federated States of',
                  'Moldova',
                  'Monaco',
                  'Mongolia',
                  'Montenegro',
                  'Montserrat',
                  'Morocco',
                  'Mozambique',
                  'Myanmar',
                  'Namibia',
                  'Nauru',
                  'Nepal',
                  'Netherlands',
                  'Netherlands Antilles',
                  'New Caledonia',
                  'New Zealand',
                  'Nicaragua',
                  'Niger',
                  'Nigeria',
                  'Niue',
                  'Norfolk Island',
                  'Northern Mariana Islands',
                  'Norway',
                  'Oman',
                  'Pakistan',
                  'Palau',
                  'Palestinian Territory',
                  'Panama',
                  'Papua New Guinea',
                  'Paraguay',
                  'Peru',
                  'Philippines',
                  'Pitcairn',
                  'Poland',
                  'Portugal',
                  'Puerto Rico',
                  'Qatar',
                  'Réunion',
                  'Romania',
                  'Russian Federation',
                  'Rwanda',
                  'Saint-Barthélemy',
                  'Saint Helena',
                  'Saint Kitts and Nevis',
                  'Saint Lucia',
                  'Saint-Martin (French part)',
                  'Saint Pierre and Miquelon',
                  'Saint Vincent and Grenadines',
                  'Samoa',
                  'San Marino',
                  'Sao Tome and Principe',
                  'Saudi Arabia',
                  'Senegal',
                  'Serbia',
                  'Seychelles',
                  'Sierra Leone',
                  'Singapore',
                  'Slovakia',
                  'Slovenia',
                  'Solomon Islands',
                  'Somalia',
                  'South Africa',
                  'South Georgia and the South Sandwich Islands',
                  'South Sudan',
                  'Spain',
                  'Sri Lanka',
                  'Sudan',
                  'Suriname',
                  'Svalbard and Jan Mayen Islands',
                  'Swaziland',
                  'Sweden',
                  'Switzerland',
                  'Syrian Arab Republic (Syria)',
                  'Taiwan',
                  'Republic of China',
                  'Tajikistan',
                  'Tanzania',
                  'United Republic of',
                  'Thailand',
                  'Timor-Leste',
                  'Togo',
                  'Tokelau',
                  'Tonga',
                  'Trinidad and Tobago',
                  'Tunisia',
                  'Turkey',
                  'Turkmenistan',
                  'Turks and Caicos Islands',
                  'Tuvalu',
                  'Uganda',
                  'Ukraine',
                  'United Arab Emirates',
                  'United Kingdom',
                  'US Minor Outlying Islands',
                  'Uruguay',
                  'Uzbekistan',
                  'Vanuatu',
                  'Venezuela (Bolivarian Republic)',
                  'Viet Nam',
                  'Virgin Islands',
                  'US',
                  'Wallis and Futuna Islands',
                  'Western Sahara',
                  'Yemen',
                  'Zambia',
                  'Zimbabwe'
                ]
              },
              events: '',
              latestAnsweredBidNo: 1,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"dcba66de-6595-4a1d-b364-f7bc85030d4c","fieldValue":"Yes","operator":"Contains"}]}'
            },
            'Country Strategy-U8V': {
              isCustomQuestion: false,
              questionId: 'Country Strategy-U8V',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 11,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"1wg98","text":"Customer-specified countries: What is their rationale for including each target region/country?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="5vcee" data-offset-key="1wg98-0-0"><div data-offset-key="1wg98-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="1wg98-0-0"><span data-text="true">Customer-specified countries: What is their rationale for including each target region/country?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Customer-specified countries: What is their rationale for including each target region/country?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Business Developer,Therapeutic Analytics Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"dcba66de-6595-4a1d-b364-f7bc85030d4c","fieldValue":"Yes","operator":"Equal"}]}'
            },
            'Country Strategy-E0O': {
              isCustomQuestion: false,
              questionId: 'Country Strategy-E0O',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 12,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"d4aib","text":"Customer-specified countries: Are they open to our country recommendations?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="4nj8l" data-offset-key="d4aib-0-0"><div data-offset-key="d4aib-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="d4aib-0-0"><span data-text="true">Customer-specified countries: Are they open to our country recommendations?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Customer-specified countries: Are they open to our country recommendations?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead,Clinical DS&B,Business Developer,Therapeutic Analytics Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"dcba66de-6595-4a1d-b364-f7bc85030d4c","fieldValue":"Yes","operator":"Equal"}]}'
            },
            'a0c42e11-8ed9-4a6c-a32f-dd64207febd4': {
              isCustomQuestion: false,
              questionId: 'a0c42e11-8ed9-4a6c-a32f-dd64207febd4',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 13,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"1pdk8","text":"IQVIA-proposed countries: Did the customer request our country recommendations?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="eq3lm" data-offset-key="1pdk8-0-0"><div data-offset-key="1pdk8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="1pdk8-0-0"><span data-text="true">IQVIA-proposed countries: Did the customer request our country recommendations?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'IQVIA-proposed countries: Did the customer request our country recommendations?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"Country Strategy-E0O","fieldValue":"Yes","operator":"Equal"}]}'
            },
            'b80d8237-dc22-4d3c-8cfd-ee3669694106': {
              isCustomQuestion: false,
              questionId: 'b80d8237-dc22-4d3c-8cfd-ee3669694106',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 14,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"fjlt7","text":"IQVIA-proposed countries: Do they have a preference for any countries? If yes, which ones and why?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="1soqq" data-offset-key="fjlt7-0-0"><div data-offset-key="fjlt7-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fjlt7-0-0"><span data-text="true">IQVIA-proposed countries: Do they have a preference for any countries? If yes, which ones and why?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'IQVIA-proposed countries: Do they have a preference for any countries? If yes, which ones and why?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"a0c42e11-8ed9-4a6c-a32f-dd64207febd4","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '2359fa0d-c828-4955-9386-21daae5d7d12': {
              isCustomQuestion: false,
              questionId: '2359fa0d-c828-4955-9386-21daae5d7d12',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 15,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"74pa6","text":"IQVIA-proposed countries: Would they like us to avoid any countries? If yes, which ones and why.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="4b5r4" data-offset-key="74pa6-0-0"><div data-offset-key="74pa6-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="74pa6-0-0"><span data-text="true">IQVIA-proposed countries: Would they like us to avoid any countries? If yes,  which ones and why.</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'IQVIA-proposed countries: Would they like us to avoid any countries? If yes, which ones and why.',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"a0c42e11-8ed9-4a6c-a32f-dd64207febd4","fieldValue":"Yes","operator":"Equal"}]}'
            },
            'e94df7ac-46d4-4cc8-be58-bb38ebffd782': {
              isCustomQuestion: false,
              questionId: 'e94df7ac-46d4-4cc8-be58-bb38ebffd782',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 16,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC),IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"f2l1p","text":"Is this a multi-regional study?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="amqmj" data-offset-key="f2l1p-0-0"><div data-offset-key="f2l1p-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="f2l1p-0-0"><span data-text="true">Is this a multi-regional study?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Is this a multi-regional study?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '70ad670f-73ac-4539-ae68-c80b8410bb2c': {
              isCustomQuestion: false,
              questionId: '70ad670f-73ac-4539-ae68-c80b8410bb2c',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 17,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC),IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"bn4qe","text":"Multi-regional studies: Which region is expected to have the majority of patients/sites?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="3bolu" data-offset-key="bn4qe-0-0"><div data-offset-key="bn4qe-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bn4qe-0-0"><span data-text="true">Multi-regional studies: Which region is expected to have the majority of patients/sites?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Multi-regional studies: Which region is expected to have the majority of patients/sites?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Proposal Developer,Therapeutic Strategy Lead,Project Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"e94df7ac-46d4-4cc8-be58-bb38ebffd782","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '02849e48-3c63-4cbc-b2d1-d0d8c6fbb2f0': {
              isCustomQuestion: false,
              questionId: '02849e48-3c63-4cbc-b2d1-d0d8c6fbb2f0',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 18,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"8ipjl","text":"Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8gies" data-offset-key="8ipjl-0-0"><div data-offset-key="8ipjl-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8ipjl-0-0"><span data-text="true">Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Multi-country studies: Did the customer specify the target number or percentage of patients per country? If yes, explain.',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'fc56f252-3d78-4493-b0d1-f0615cbe4769': {
              isCustomQuestion: false,
              questionId: 'fc56f252-3d78-4493-b0d1-f0615cbe4769',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 19,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"dpt9h","text":"Multi-regional studies: What is the customer\'s preferred location for the PL?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="ecldo" data-offset-key="dpt9h-0-0"><div data-offset-key="dpt9h-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="dpt9h-0-0"><span data-text="true">Multi-regional studies: What is the customer\'s preferred location for the PL?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                "Multi-regional studies: What is the customer's preferred location for the PL?",
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"e94df7ac-46d4-4cc8-be58-bb38ebffd782","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '35a61c3a-1b0f-4301-8315-c2da35dea01a': {
              isCustomQuestion: false,
              questionId: '35a61c3a-1b0f-4301-8315-c2da35dea01a',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 20,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"5pacv","text":"Multi-regional studies: How is the customer\'s English proficiency?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="2bis" data-offset-key="5pacv-0-0"><div data-offset-key="5pacv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="5pacv-0-0"><span data-text="true">Multi-regional studies: How is the customer\'s English proficiency?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                "Multi-regional studies: How is the customer's English proficiency?",
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Poor us']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Project Lead,Proposal Developer,Medical Strategy Lead,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"e94df7ac-46d4-4cc8-be58-bb38ebffd782","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '6ca87a00-ed52-404b-b668-04b6b3b78c9b': {
              isCustomQuestion: false,
              questionId: '6ca87a00-ed52-404b-b668-04b6b3b78c9b',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 21,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"77duo","text":"Regulatory, Medical, and Feasibility","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":36,"style":"BOLD"},{"offset":0,"length":36,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"7p8hm","text":"Is the Protocol Synopsis available?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="clvjc" data-offset-key="77duo-0-0"><div data-offset-key="77duo-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="77duo-0-0" style="font-weight: bold;"><span data-text="true">Regulatory, Medical, and Feasibility</span></span></div></div><div data-block="true" data-editor="clvjc" data-offset-key="7p8hm-0-0"><div data-offset-key="7p8hm-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="7p8hm-0-0"><span data-text="true">Is the Protocol Synopsis available?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Regulatory, Medical, and Feasibility Is the Protocol Synopsis available?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '469b886f-cdf6-4481-b94b-b99db9a32b65': {
              isCustomQuestion: false,
              questionId: '469b886f-cdf6-4481-b94b-b99db9a32b65',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 22,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"8tmua","text":"When will the synopsis be available?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8511r" data-offset-key="8tmua-0-0"><div data-offset-key="8tmua-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8tmua-0-0"><span data-text="true">When will the synopsis be available?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'When will the synopsis be available?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"6ca87a00-ed52-404b-b668-04b6b3b78c9b","fieldValue":"No","operator":"Equal"}]}'
            },
            '0d665212-0fe0-4c2d-8ba8-9a7555d5b5fb': {
              isCustomQuestion: false,
              questionId: '0d665212-0fe0-4c2d-8ba8-9a7555d5b5fb',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 23,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint:
                'e.g., for oncology studies, what stage of cancer and line of treatment? For rheumatoid arthritis studies, should patients be biologic naïve? etc. ',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"5lqkv","text":"What is the target patient population within the indication?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8g8rj" data-offset-key="5lqkv-0-0"><div data-offset-key="5lqkv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="5lqkv-0-0"><span data-text="true">What is the target patient population within the indication?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'What is the target patient population within the indication?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"8uuh5","text":"e.g., for oncology studies, what stage of cancer and line of treatment? For rheumatoid arthritis studies, should patients be biologic naïve? etc. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="e5rrc" data-offset-key="8uuh5-0-0"><div data-offset-key="8uuh5-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8uuh5-0-0"><span data-text="true">e.g., for oncology studies, what stage of cancer and line of treatment? For rheumatoid arthritis studies, should patients be biologic naïve? etc. </span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"6ca87a00-ed52-404b-b668-04b6b3b78c9b","fieldValue":"No","operator":"Equal"}]}'
            },
            '639f8e1f-871a-4337-8f68-915b386ebd3b': {
              isCustomQuestion: false,
              questionId: '639f8e1f-871a-4337-8f68-915b386ebd3b',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 24,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"8b7fl","text":"Has the customer consulted with any regulatory agencies?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="2vesf" data-offset-key="8b7fl-0-0"><div data-offset-key="8b7fl-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8b7fl-0-0"><span data-text="true">Has the customer consulted with any regulatory agencies?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Has the customer consulted with any regulatory agencies?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '81f052aa-f13f-4dbe-b222-942e9fbd85e1': {
              isCustomQuestion: false,
              questionId: '81f052aa-f13f-4dbe-b222-942e9fbd85e1',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 25,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"ir0e","text":"Which regulatory agencies has the customer consulted with?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7031h" data-offset-key="ir0e-0-0"><div data-offset-key="ir0e-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ir0e-0-0"><span data-text="true">Which regulatory agencies has the customer consulted with?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Which regulatory agencies has the customer consulted with?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"639f8e1f-871a-4337-8f68-915b386ebd3b","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '1c6a57cc-708a-4fc2-938e-4191c4fe1f18': {
              isCustomQuestion: false,
              questionId: '1c6a57cc-708a-4fc2-938e-4191c4fe1f18',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 26,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              questionHint: 'If yes, please specify.',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"brpl0","text":"Are there any special regulatory considerations we should be aware of?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="48fhn" data-offset-key="brpl0-0-0"><div data-offset-key="brpl0-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="brpl0-0-0"><span data-text="true">Are there any special regulatory considerations we should be aware of?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Are there any special regulatory considerations we should be aware of?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"cmjka","text":"If yes, please specify.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7pnnt" data-offset-key="cmjka-0-0"><div data-offset-key="cmjka-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="cmjka-0-0"><span data-text="true">If yes, please specify.</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"639f8e1f-871a-4337-8f68-915b386ebd3b","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '19515c9f-2d04-4ea0-800f-e83a83107be9': {
              isCustomQuestion: false,
              questionId: '19515c9f-2d04-4ea0-800f-e83a83107be9',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 27,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"2h86p","text":"Are any regulatory meetings planned?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="2lmnb" data-offset-key="2h86p-0-0"><div data-offset-key="2h86p-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="2h86p-0-0"><span data-text="true">Are any regulatory meetings planned?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Are any regulatory meetings planned?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Project Lead,Proposal Developer,Medical Strategy Lead,Clinical DS&B,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"639f8e1f-871a-4337-8f68-915b386ebd3b","fieldValue":"No","operator":"Equal"}]}'
            },
            'Regulatory Considerations-R0C': {
              isCustomQuestion: false,
              questionId: 'Regulatory Considerations-R0C',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 28,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint: 'Authorization / IND',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"a2hoc","text":"Has the customer applied for authorization to conduct the study in the target study countries or other countries where they are currently conducting other studies?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8x0vm" data-offset-key="a2hoc-0-0"><div data-offset-key="a2hoc-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="a2hoc-0-0"><span data-text="true">Has the customer applied for authorization to conduct the study in the target study countries or other countries where they are currently conducting other studies?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Has the customer applied for authorization to conduct the study in the target study countries or other countries where they are currently conducting other studies?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"6pe48","text":"Authorization / IND","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8io72" data-offset-key="6pe48-0-0"><div data-offset-key="6pe48-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="6pe48-0-0"><span data-text="true">Authorization / IND</span></span></div></div></div>',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Clinical DS&B,Business Developer,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '81e5aa37-efa6-4798-9f92-678ec93ecb31': {
              isCustomQuestion: false,
              questionId: '81e5aa37-efa6-4798-9f92-678ec93ecb31',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 29,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"7k8nv","text":"When is the approval notification expected for the key regions / countries?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="af907" data-offset-key="7k8nv-0-0"><div data-offset-key="7k8nv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="7k8nv-0-0"><span data-text="true">When is the approval notification expected for the key regions / countries?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'When is the approval notification expected for the key regions / countries?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Therapeutic Analytics Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"Regulatory Considerations-R0C","fieldValue":"Yes","operator":"Equal"}]}'
            },
            'a358545e-45df-447b-bf10-107d2d6d1202': {
              isCustomQuestion: false,
              questionId: 'a358545e-45df-447b-bf10-107d2d6d1202',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 30,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint: 'If yes, include which countries/regions.',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"f97om","text":"Does the customer need our support for any country regulatory authority submissions? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="6kvlu" data-offset-key="f97om-0-0"><div data-offset-key="f97om-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="f97om-0-0"><span data-text="true">Does the customer need our support for any country regulatory authority submissions? I</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Does the customer need our support for any country regulatory authority submissions? ',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"bt2or","text":"If yes, include which countries/regions.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":5,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="86hk8" data-offset-key="bt2or-0-0"><div data-offset-key="bt2or-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bt2or-0-0"><span data-text="true">If yes, include which countries/regions.</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Proposal Developer,Project Lead,Medical Strategy Lead,Clinical DS&B,Business Developer,Therapeutic Analytics Lead,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"Regulatory Considerations-R0C","fieldValue":"No","operator":"Equal"}]}'
            },
            'ca610bfd-ab29-4fb9-b642-63b7edc918f3': {
              isCustomQuestion: false,
              questionId: 'ca610bfd-ab29-4fb9-b642-63b7edc918f3',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 31,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"5ju5u","text":"Where were the pre-clinical studies conducted?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="6sbhc" data-offset-key="5ju5u-0-0"><div data-offset-key="5ju5u-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="5ju5u-0-0"><span data-text="true">Where were the pre-clinical studies conducted?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Where were the pre-clinical studies conducted?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Therapeutic Strategy Lead,Proposal Developer'
            },
            'f3128abb-3430-4b50-9a59-4d8cba1eda53': {
              isCustomQuestion: false,
              questionId: 'f3128abb-3430-4b50-9a59-4d8cba1eda53',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 32,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"etmnr","text":"Is the GMP Certificate for the study compound available?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="1fmo" data-offset-key="etmnr-0-0"><div data-offset-key="etmnr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="etmnr-0-0"><span data-text="true">Is the GMP Certificate for the study compound available?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Is the GMP Certificate for the study compound available?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Therapeutic Strategy Lead,Proposal Developer'
            },
            '5b56e0c9-cb13-4ac1-a622-b890a6143a58': {
              isCustomQuestion: false,
              questionId: '5b56e0c9-cb13-4ac1-a622-b890a6143a58',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 33,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"63rfe","text":"Is a QP certificate available or are they planning to get one?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="1pfqb" data-offset-key="63rfe-0-0"><div data-offset-key="63rfe-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="63rfe-0-0"><span data-text="true">Is a QP certificate available or are they planning to get one?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Is a QP certificate available or are they planning to get one?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"f3128abb-3430-4b50-9a59-4d8cba1eda53","fieldValue":"No","operator":"Contains"}]}'
            },
            'b9f5b687-f32e-4059-8c30-247073d0117f': {
              isCustomQuestion: false,
              questionId: 'b9f5b687-f32e-4059-8c30-247073d0117f',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 34,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint: 'e.g., Caucasian, Chinese, Japanese, etc.',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"bcc1f","text":"For completed Phase I studies, in which population(s) was the PK profile and safety studied?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="o9qv" data-offset-key="bcc1f-0-0"><div data-offset-key="bcc1f-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="bcc1f-0-0"><span data-text="true">For completed Phase I studies, in which population(s) was the PK profile and safety studied?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'For completed Phase I studies, in which population(s) was the PK profile and safety studied?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"8jo05","text":"e.g., Caucasian, Chinese, Japanese, etc.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="2e0ql" data-offset-key="8jo05-0-0"><div data-offset-key="8jo05-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8jo05-0-0"><span data-text="true">e.g., Caucasian, Chinese, Japanese, etc.</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '40debc5c-bc3e-4e97-abb8-b0cb9494675f': {
              isCustomQuestion: false,
              questionId: '40debc5c-bc3e-4e97-abb8-b0cb9494675f',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 35,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"ejc06","text":"Has the customer consulted with any KOLs about the study and/or does the customer have any site / investigator relationships that need to be leveraged for this study?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="6d3en" data-offset-key="ejc06-0-0"><div data-offset-key="ejc06-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ejc06-0-0"><span data-text="true">Has the customer consulted with any KOLs about the study and/or does the customer have any site / investigator relationships that need to be leveraged for this study?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Has the customer consulted with any KOLs about the study and/or does the customer have any site / investigator relationships that need to be leveraged for this study?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'a45386ab-e8c0-44bd-97c6-f69f71f793b1': {
              isCustomQuestion: false,
              questionId: 'a45386ab-e8c0-44bd-97c6-f69f71f793b1',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 36,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"21svr","text":"Has the customer identified a Leading Investigator in key target countries? If yes, who?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="5bfq9" data-offset-key="21svr-0-0"><div data-offset-key="21svr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="21svr-0-0"><span data-text="true">Has the customer identified a Leading Investigator in key target countries? If yes, who?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Has the customer identified a Leading Investigator in key target countries? If yes, who?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'a7d631c0-a822-4ca6-ae85-2e3745d6306c': {
              isCustomQuestion: false,
              questionId: 'a7d631c0-a822-4ca6-ae85-2e3745d6306c',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 37,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              questionHint:
                'An unblinded outreach is more informative than a blinded outreach.',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"7cr4s","text":"Do we have permission to conduct a blinded or unblinded site outreach, if needed?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="674hn" data-offset-key="7cr4s-0-0"><div data-offset-key="7cr4s-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="7cr4s-0-0"><span data-text="true">Do we have permission to conduct a blinded or unblinded site outreach, if needed?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Do we have permission to conduct a blinded or unblinded site outreach, if needed?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"8fgha","text":"An unblinded outreach is more informative than a blinded outreach.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="9sik8" data-offset-key="8fgha-0-0"><div data-offset-key="8fgha-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="8fgha-0-0"><span data-text="true">An unblinded outreach is more informative than a blinded outreach.</span></span></div></div></div>',
              answerConfiguration: {
                type: 'select-lookup',
                options: [
                  'Yes - blinded',
                  'Yes - unblinded',
                  'Permission not obtained'
                ]
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'a8cfd3c3-b503-417c-b4c2-54e4482d22b0': {
              isCustomQuestion: false,
              questionId: 'a8cfd3c3-b503-417c-b4c2-54e4482d22b0',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 38,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"2m5pp","text":"Customer Hot Buttons & Our Competitors","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":38,"style":"BOLD"},{"offset":0,"length":38,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"ahmie","text":"What are the customer\'s explicit needs / selection criteria?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="dj0c0" data-offset-key="2m5pp-0-0"><div data-offset-key="2m5pp-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="2m5pp-0-0" style="font-weight: bold;"><span data-text="true">Customer Hot Buttons &amp; Our Competitors</span></span></div></div><div data-block="true" data-editor="dj0c0" data-offset-key="ahmie-0-0"><div data-offset-key="ahmie-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ahmie-0-0"><span data-text="true">What are the customer\'s explicit needs / selection criteria?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                "Customer Hot Buttons & Our Competitors What are the customer's explicit needs / selection criteria?",
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '9ef1f339-eced-4f04-9421-0a4a7704afdf': {
              isCustomQuestion: false,
              questionId: '9ef1f339-eced-4f04-9421-0a4a7704afdf',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 39,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              questionHint:
                ' e.g., product differentiation in competitive market, beating competitors to market, poor vendor management, unresponsive project lead, inexperienced sites, not meeting target FPI date, not meeting recruitment targets within x months, change orders,  etc. ',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"kqaj","text":"What is the customer\'s biggest concern for this study and why?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":23,"length":8,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="b4fcc" data-offset-key="kqaj-0-0"><div data-offset-key="kqaj-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="kqaj-0-0"><span data-text="true">What is the customer\'s biggest concern for this study and why?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                "What is the customer's biggest concern for this study and why?",
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"6tl9t","text":" e.g., product differentiation in competitive market, beating competitors to market, poor vendor management, unresponsive project lead, inexperienced sites, not meeting target FPI date, not meeting recruitment targets within x months, change orders,  etc. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="8vj4" data-offset-key="6tl9t-0-0"><div data-offset-key="6tl9t-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="6tl9t-0-0"><span data-text="true"> e.g., product differentiation in competitive market, beating competitors to market, poor vendor management, unresponsive project lead, inexperienced sites, not meeting target FPI date, not meeting recruitment targets within x months, change orders,  etc. </span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'c41fe7b7-01ea-433e-adc0-98b1249ede8a': {
              isCustomQuestion: false,
              questionId: 'c41fe7b7-01ea-433e-adc0-98b1249ede8a',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 40,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint:
                'What are their names / roles? Have they worked with IQVIA/IQB before?',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"3q5mp","text":"Who are the key stakeholders within the customer organization involved in the outsourcing decision-making process?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="5sa8d" data-offset-key="3q5mp-0-0"><div data-offset-key="3q5mp-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="3q5mp-0-0"><span data-text="true">Who are the key stakeholders within the customer organization involved in the outsourcing decision-making process?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Who are the key stakeholders within the customer organization involved in the outsourcing decision-making process?',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"cap58","text":"What are their names / roles? Have they worked with IQVIA/IQB before?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="dfnep" data-offset-key="cap58-0-0"><div data-offset-key="cap58-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="cap58-0-0"><span data-text="true">What are their names / roles? Have they worked with IQVIA/IQB before?</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'ee4533af-6588-4dff-a03f-2be9c20c60a8': {
              isCustomQuestion: false,
              questionId: 'ee4533af-6588-4dff-a03f-2be9c20c60a8',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 41,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"26km9","text":"What is the personal win-factor or motivating factor of each key stakeholder you identified?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="3cku4" data-offset-key="26km9-0-0"><div data-offset-key="26km9-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="26km9-0-0"><span data-text="true">What is the personal win-factor or motivating factor of each key stakeholder you identified?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'What is the personal win-factor or motivating factor of each key stakeholder you identified?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'b4e1e81d-f743-4994-8c5f-e906ca585c7d': {
              isCustomQuestion: false,
              questionId: 'b4e1e81d-f743-4994-8c5f-e906ca585c7d',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 42,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"fq60a","text":"What challenges and successes has the customer had working with IQVIA / IQB before, if applicable?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7p22c" data-offset-key="fq60a-0-0"><div data-offset-key="fq60a-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fq60a-0-0"><span data-text="true">What challenges and successes has the customer had working with IQVIA / IQB before, if applicable?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'What challenges and successes has the customer had working with IQVIA / IQB before, if applicable?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '085bcf75-7e31-4994-81ad-262ea632e858': {
              isCustomQuestion: false,
              questionId: '085bcf75-7e31-4994-81ad-262ea632e858',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 43,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"pipd","text":"What challenges and successes has the customer had working with other CROs before?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="ac72b" data-offset-key="pipd-0-0"><div data-offset-key="pipd-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="pipd-0-0"><span data-text="true">What challenges and successes has the customer had working with other CROs before?</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'What challenges and successes has the customer had working with other CROs before?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '3e6708e9-b8ae-4422-8050-a161ecdc7f65': {
              isCustomQuestion: false,
              questionId: '3e6708e9-b8ae-4422-8050-a161ecdc7f65',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 44,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"ei7sd","text":"If another CRO worked on related studies for this customer:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7p6k4","text":"Which CRO was it?","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"73luk","text":"Which studies did they manage?","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3rv9r","text":"Why is the customer considering another CRO?","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="54fs6" data-offset-key="ei7sd-0-0"><div data-offset-key="ei7sd-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ei7sd-0-0"><span data-text="true">If another CRO worked on related studies for this customer:</span></span></div></div><ol class="public-DraftStyleDefault-ol" data-offset-key="7p6k4-0-0"><li class="public-DraftStyleDefault-orderedListItem public-DraftStyleDefault-reset public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="54fs6" data-offset-key="7p6k4-0-0"><div data-offset-key="7p6k4-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="7p6k4-0-0"><span data-text="true">Which CRO was it?</span></span></div></li><li class="public-DraftStyleDefault-orderedListItem public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="54fs6" data-offset-key="73luk-0-0"><div data-offset-key="73luk-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="73luk-0-0"><span data-text="true">Which studies did they manage?</span></span></div></li><li class="public-DraftStyleDefault-orderedListItem public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="54fs6" data-offset-key="3rv9r-0-0"><div data-offset-key="3rv9r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="3rv9r-0-0"><span data-text="true">Why is the customer considering another CRO?</span></span></div></li></ol></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'If another CRO worked on related studies for this customer: Which CRO was it? Which studies did they manage? Why is the customer considering another CRO?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'bf4c7713-2534-40a3-90ed-6e2110422d88': {
              isCustomQuestion: false,
              questionId: 'bf4c7713-2534-40a3-90ed-6e2110422d88',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 45,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"2f895","text":"Are we conducting other studies or providing standalone services for this customer? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="c2gf6" data-offset-key="2f895-0-0"><div data-offset-key="2f895-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="2f895-0-0"><span data-text="true">Are we conducting other studies or providing standalone services for this customer? </span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Are we conducting other studies or providing standalone services for this customer? ',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '14bd2b12-eb55-4ee1-9ca6-2856835e0286': {
              isCustomQuestion: false,
              questionId: '14bd2b12-eb55-4ee1-9ca6-2856835e0286',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 46,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              questionHint: 'Challenges, successes?',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"ebq0r","text":"Which studies or services? How has IQVIA/IQB performance been? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="9qgb4" data-offset-key="ebq0r-0-0"><div data-offset-key="ebq0r-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ebq0r-0-0"><span data-text="true">Which studies or services? How has IQVIA/IQB perfrormance been? </span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Which studies or services? How has IQVIA/IQB performance been? ',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"4qmgq","text":"Challenges, successes?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="38gn4" data-offset-key="4qmgq-0-0"><div data-offset-key="4qmgq-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="4qmgq-0-0"><span data-text="true">Challenges, successes?</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"bf4c7713-2534-40a3-90ed-6e2110422d88","fieldValue":"Yes","operator":"Equal"}]}'
            },
            '1f7fe284-98da-4120-98f6-9170caade40d': {
              isCustomQuestion: false,
              questionId: '1f7fe284-98da-4120-98f6-9170caade40d',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 47,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type,IQB Template OT',
              questionHint:
                'For losses, dig deeper than "price"; Where did we fail to demonstrate the value of our cost?',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"50rfk","text":"Proposal win/loss history and takeaways? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="3uvth" data-offset-key="50rfk-0-0"><div data-offset-key="50rfk-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="50rfk-0-0"><span data-text="true">Proposal win/loss history and takeaways? F</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Proposal win/loss history and takeaways? ',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"fn8uv","text":"For losses, dig deeper than \\"price\\"; Where did we fail to demonstrate the value of our cost?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="5qbcb" data-offset-key="fn8uv-0-0"><div data-offset-key="fn8uv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="fn8uv-0-0"><span data-text="true">For losses, dig deeper than "price"; Where did we fail to demonstrate the value of our cost?</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            '61c93129-67a6-487a-a6e6-876b0c0d1d57': {
              isCustomQuestion: false,
              questionId: '61c93129-67a6-487a-a6e6-876b0c0d1d57',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 48,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Core Opportunity Launch Call (APAC),Default Type',
              questionHint: 'Avoid generic responses',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"7k0pv","text":"List major competitors for this RFP and the strengths and weaknesses of each for this RFP.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":72,"length":4,"style":"UNDERLINE"},{"offset":81,"length":4,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="a5r2m" data-offset-key="7k0pv-0-0"><div data-offset-key="7k0pv-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="7k0pv-0-0"><span data-text="true">List major competitors for this RFP and the strengths and weaknesses of </span></span><span data-offset-key="7k0pv-0-1" style="text-decoration: underline;"><span data-text="true">each</span></span><span data-offset-key="7k0pv-0-2"><span data-text="true"> for this RFP.</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'List major competitors for this RFP and the strengths and weaknesses of each for this RFP.',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"aplpj","text":"Avoid generic responses","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><div data-block="true" data-editor="9ou5j" data-offset-key="aplpj-0-0"><div data-offset-key="aplpj-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="aplpj-0-0"><span data-text="true">Avoid generic responses</span></span></div></div></div>',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead'
            },
            'b39120ac-ebec-49cb-a425-298290854550': {
              isCustomQuestion: false,
              questionId: 'b39120ac-ebec-49cb-a425-298290854550',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 49,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"67tek","text":"Other than price, what do we need to do win this bid? What value-add can IQVIA offer that local and global competitors cannot offer? ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":133,"style":"color-#000000"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML: '',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Other than price, what do we need to do win this bid? What value-add can IQVIA offer that local and global competitors cannot offer? ',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Business Developer,Clinical DS&B,Medical Strategy Lead,Therapeutic Analytics Lead,Therapeutic Strategy Lead,Project Lead'
            },
            'f90b2310-ffbe-45f8-8252-956edfb47987': {
              isCustomQuestion: false,
              questionId: 'f90b2310-ffbe-45f8-8252-956edfb47987',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 50,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"52hd3","text":"For customers who intend to register the product in China","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":57,"style":"BOLD"},{"offset":0,"length":57,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"ahcdr","text":" Is support needed for the NMPA data submission? ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="a7ls8" data-offset-key="52hd3-0-0"><div data-offset-key="52hd3-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="52hd3-0-0" style="font-weight: bold; font-size: 12pt;"><span data-text="true">For customers who intend to register the product in China</span></span></div></div><div data-block="true" data-editor="a7ls8" data-offset-key="ahcdr-0-0"><div data-offset-key="ahcdr-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="ahcdr-0-0"><span data-text="true"> Is support needed for the NMPA data submission? </span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'For customers who intend to register the product in China  Is support needed for the NMPA data submission? ',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No', 'Not Sure', 'Not Applicable']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"binary","operation":"Or","condition":[{"type":"unary","operation":"","condition":[{"fieldName":"c8940199-749f-4d1c-817d-86d3f745a774","fieldValue":"China","operator":"Contains"}]},{"type":"unary","operation":"","condition":[{"fieldName":"c8940199-749f-4d1c-817d-86d3f745a774","fieldValue":"SAR China","operator":"Contains"}]}]}'
            },
            '90855b02-6a22-459a-8712-f38a31033f91': {
              isCustomQuestion: false,
              questionId: '90855b02-6a22-459a-8712-f38a31033f91',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 51,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              questionHint:
                'Biostatistics: Annotated CRF, SDTM Specification, SDTM Datasets, ADaM Specification, ADaM Datasets, Outputs, SDTM data definition file and review guideline, ADaM data definition file and review guideline, SAP/Shell Data Management: Chinese CRF layout, Chinese coding terms mapping, verbatims extract for translation Project Lead/Clinical Lead: Coordinate and QC the CRF translation',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"1sn76","text":"If yes, what support is needed:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="7qlhv" data-offset-key="1sn76-0-0"><div data-offset-key="1sn76-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="1sn76-0-0"><span data-text="true">If yes, what support is needed:</span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: false,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'If yes, what support is needed:',
              integration: '',
              answers: [],
              questionHintJSON:
                '{"blocks":[{"key":"escsa","text":"Biostatistics: Annotated CRF, SDTM Specification, SDTM Datasets, ADaM Specification, ADaM Datasets, Outputs, SDTM data definition file and review guideline, ADaM data definition file and review guideline, SAP/Shell","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cg6pp","text":"Data Management: Chinese CRF layout, Chinese coding terms mapping, verbatims extract for translation","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f0ude","text":"Project Lead/Clinical Lead: Coordinate and QC the CRF translation","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML:
                '<div data-contents="true"><ul class="public-DraftStyleDefault-ul" data-offset-key="escsa-0-0"><li class="public-DraftStyleDefault-unorderedListItem public-DraftStyleDefault-reset public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="4atjh" data-offset-key="escsa-0-0"><div data-offset-key="escsa-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="escsa-0-0"><span data-text="true">Biostatistics: Annotated CRF, SDTM Specification, SDTM Datasets, ADaM Specification, ADaM Datasets, Outputs, SDTM data definition file and review guideline, ADaM data definition file and review guideline, SAP/Shell</span></span></div></li><li class="public-DraftStyleDefault-unorderedListItem public-DraftStyleDefault-depth0 public-DraftStyleDefault-listLTR" data-block="true" data-editor="4atjh" data-offset-key="cg6pp-0-0"><div data-offset-key="cg6pp-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="cg6pp-0-0"><span data-text="true">Data Management: Chinese CRF layout, Chinese coding terms mapping, verbatims extract for translation</span></span></div></li></ul><div data-block="true" data-editor="4atjh" data-offset-key="f0ude-0-0"><div data-offset-key="f0ude-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="f0ude-0-0"><span data-text="true">Project Lead/Clinical Lead: Coordinate and QC the CRF translation</span></span></div></div></div>',
              answerConfiguration: {
                type: 'picklist',
                options: [
                  'Biostatistics',
                  'Data Management',
                  'Project Lead/Clinical Lead'
                ]
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Therapeutic Analytics Lead,Business Developer,Clinical DS&B,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Strategy Lead',
              logic:
                '{"type":"unary","operation":"","condition":[{"fieldName":"f90b2310-ffbe-45f8-8252-956edfb47987","fieldValue":"Yes","operator":"Equal"}]}'
            },
            'a19b26e6-9f08-426a-bac6-5330146caba5': {
              isCustomQuestion: false,
              questionId: 'a19b26e6-9f08-426a-bac6-5330146caba5',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 52,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"1str8","text":"Q2 Solutions","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"BOLD"},{"offset":0,"length":12,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"cqu36","text":"Please complete the Q2 Solutions question(s) in the Focal Point section.  ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":74,"style":"color-#000000"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="1pvro" data-offset-key="1str8-0-0"><div data-offset-key="1str8-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="1str8-0-0" style="font-weight: bold; font-size: 14pt;"><span data-text="true">Q2 Solutions</span></span></div></div><div data-block="true" data-editor="1pvro" data-offset-key="cqu36-0-0"><div data-offset-key="cqu36-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="cqu36-0-0" style="color: rgb(0, 0, 0);"><span data-text="true">Please complete the Q2 Solutions question(s) in the Focal Point section.  </span></span></div></div></div>',
              roleNames: ['Business Developer'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Q2 Solutions Please complete the Q2 Solutions question(s) in the Focal Point section.  ',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'checkbox',
                options: ['Okay!']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties:
                'Business Developer,Medical Strategy Lead,Project Lead,Proposal Developer,Therapeutic Analytics Lead,Therapeutic Strategy Lead,Clinical DS&B'
            },
            '49448b44-ec2f-420d-ba62-bd9004a9e1a1': {
              isCustomQuestion: false,
              questionId: '49448b44-ec2f-420d-ba62-bd9004a9e1a1',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 53,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"5uk5i","text":"Admin","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"},{"offset":0,"length":5,"style":"fontSize-14pt"}],"entityRanges":[],"data":{}},{"key":"3k6c9","text":"Sent back for additional info before triage?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: true,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML: '',
              roleNames: ['xAdmin'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText:
                'Admin Sent back for additional info before triage?',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'select',
                options: ['Yes', 'No', 'Not available before triage']
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties: 'xAdmin'
            },
            'c88307f8-8180-4403-bc6b-8764f3cac11a': {
              isCustomQuestion: false,
              questionId: 'c88307f8-8180-4403-bc6b-8764f3cac11a',
              section: {
                sectionOrder: 4,
                sectionName: 'RFP Prep for BD (to be completed prior to triage)'
              },
              active: true,
              sfField: 'n/a',
              questionOrder: 54,
              questionApproval: false,
              questionTableConfig: '{}',
              locked: false,
              opportunityType:
                'Default Type,Core Opportunity Launch Call (APAC)',
              proposalId: '0f846d97-1913-4081-8a7b-82794a370f80',
              questionJSON:
                '{"blocks":[{"key":"97a0u","text":"Pre-triage review comments","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              bidAnswerCopy: false,
              milestoneNew: [
                {
                  Name: 'Prep',
                  Color: '#10558a'
                }
              ],
              hasDifferentSFanswer: false,
              questionHTML:
                '<div data-contents="true"><div data-block="true" data-editor="9gt7" data-offset-key="97a0u-0-0"><div data-offset-key="97a0u-0-0" class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"><span data-offset-key="97a0u-0-0"><span data-text="true">Pre-triage review comments</span></span></div></div></div>',
              roleNames: ['xAdmin'],
              visible: true,
              notApplicable: false,
              sfObject: 'n/a',
              questionText: 'Pre-triage review comments',
              integration: '',
              answers: [],
              questionHintJSON: '',
              bidType: 'Early_Engagement_Bid',
              questionHintHTML: '',
              answerConfiguration: {
                type: 'text',
                options: []
              },
              events: '',
              latestAnsweredBidNo: null,
              interestedParties: 'xAdmin'
            }
          }
        }
      ],
      sectionsUnfiltered: [],
      approvals: [],
      notepadData: [],
      emailTemplates: [
        [
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
          },
          {
            EmailTemplateRecipientRule: {
              RecipientRuleGroups: [],
              RecipientRuleGroupOperator: 'Or'
            },
            EmailTemplateName: 'Table Resolve Placeholder',
            EmailTemplateDescription: 'Table Resolve Placeholder',
            EmailTemplateTORoles: [],
            EmailTemplateCC: [],
            EmailTemplateBody:
              '<p>[trp_1:9566a770-cd79-459e-af65-95873a441d0c]</p><p>[trp_2:f705bab0-1021-49d6-a4a1-96e8fb76365f]</p><p>[trp_3:c6327538-b5ec-407d-afdd-6c1832826de7]</p><p>[trp_4:481149fc-a28d-4a93-b0fe-402f2021832e]</p><p>[trp_5:941ebd7f-2c14-40d7-a536-e82b0ccd1a1f]</p><p>[business_developera:Proposal Team-P0X]</p><p>[trp_6:9441142d-f7ca-4ecc-9f5b-72f6335fcfb6]</p><p>[trp_7:7b54340f-037f-4234-8acc-62cc02af64e7]</p><p>[trp_8:b7a4e0e4-9948-4209-9a9e-cb1dfbdb23c7]</p><p>[trp_9:62c016d9-28b0-401b-9827-b7b3bacb3aae]</p><p>[trp_10:9a4d690f-c99a-4b9c-99df-784737cb99bc]</p><p>[new_trp_1:09f2cefc-e9a9-4b34-8b2d-b8a8b299c443]</p>',
            EmailTemplateSubject: 'Table Resolve Placeholder',
            EmailTemplateId: '5854b01a-b735-49de-aa14-1efbcd283b47',
            EmailTemplateTO: [
              {
                Value: 'srinivas.manchikatla@iqvia.com',
                Type: 'Email'
              }
            ],
            EmailTemplateOpportunityTypes:
              'Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Default Type',
            EmailTemplateCCRoles: []
          },
          {
            EmailTemplateRecipientRule: {
              RecipientRuleGroups: [
                {
                  RecipientRuleCCGroupFilter: 'Equal',
                  RecipientRuleGroupOperator: 'Or',
                  RecipientRuleGroupName: 'System Generated',
                  RecipientRuleToGroupFilter: 'Equal',
                  RecipientRuleCCAnswer: [
                    {
                      Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
                      Type: 'Role'
                    }
                  ],
                  RecipientRules: [
                    {
                      RecipientRuleOperator: 'Or',
                      RecipientRuleAnswerType: 'text',
                      QuestionId: 'Proposal Team-P0X',
                      RecipientRuleFilter: 'Equal',
                      RecipientRuleAnswer: ['11']
                    }
                  ],
                  RecipientRuleToAnswer: [
                    {
                      Value: '6fc957d5-081b-4299-846f-ffcb34d8ebd4',
                      Type: 'Role'
                    },
                    {
                      Value: '0c0b2e2b-0914-40c8-90f2-0e585428eb89',
                      Type: 'Role'
                    }
                  ]
                }
              ],
              RecipientRuleGroupOperator: 'Or'
            },
            EmailTemplateName: 'new template\nadded',
            EmailTemplateDescription: 'new template',
            EmailTemplateTORoles: [],
            EmailTemplateCC: [],
            EmailTemplateBody: '',
            EmailTemplateSubject: 'create new template',
            EmailTemplateId: '936d030e-18fb-4b38-9a0c-94c7c3d9918c',
            EmailTemplateTO: [],
            EmailTemplateOpportunityTypes:
              'Core Opportunity Launch Call (APAC),Non-Core Clinical Studies',
            EmailTemplateCCRoles: []
          }
        ]
      ],
      taskData: [
        [
          {
            id: 829,
            proposal_id: '0f846d97-1913-4081-8a7b-82794a370f80',
            task_id: 'a68eae93-b465-48b4-bd53-a127ecc2c7a7',
            description: '1 march task',
            primary_condition: 'Bid History Creation',
            operator: 'addition',
            unit_type: 'Business Days',
            no_of_units: 1,
            opportunity_types:
              'Non-Core Clinical Studies,Core Opportunity Launch Call (APAC),Core Opportunity Launch Call (AMR/EMEA),Ballpark OT,IQB Template OT,Default Type,PILOT - DO NOT USE: PROGRAMS',
            order: 1,
            is_completed: false,
            is_modified: true,
            is_deleted: false,
            is_custom: false,
            is_freezed: false,
            updated_by: 'Srinivas Manchikatla',
            updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
            created_date: '2024-03-04T04:49:08.633Z',
            updated_date: '2024-03-04T04:49:56.110Z',
            task_role: [],
            task_history: [
              {
                id: 362,
                task_list_id: 829,
                proposal_id: '0f846d97-1913-4081-8a7b-82794a370f80',
                task_id: 'a68eae93-b465-48b4-bd53-a127ecc2c7a7',
                action: 'is_completed',
                value: {
                  newValue: true,
                  oldValue: false
                },
                updated_by: 'Srinivas Manchikatla',
                updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
                created_date: '2024-03-04T04:49:47.960Z',
                updated_date: '2024-03-04T04:49:47.960Z'
              },
              {
                id: 363,
                task_list_id: 829,
                proposal_id: '0f846d97-1913-4081-8a7b-82794a370f80',
                task_id: 'a68eae93-b465-48b4-bd53-a127ecc2c7a7',
                action: 'task_role',
                value: {
                  newValue: [
                    {
                      name: 'komal vijaykumar.mulik',
                      email: 'komalvijaykumar.mulik@iqvia.com'
                    }
                  ],
                  oldValue: []
                },
                updated_by: 'Srinivas Manchikatla',
                updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
                created_date: '2024-03-04T04:49:49.212Z',
                updated_date: '2024-03-04T04:49:49.212Z'
              },
              {
                id: 385,
                task_list_id: 829,
                proposal_id: '0f846d97-1913-4081-8a7b-82794a370f80',
                task_id: 'a68eae93-b465-48b4-bd53-a127ecc2c7a7',
                action: 'task_role',
                value: {
                  newValue: [],
                  oldValue: [
                    {
                      name: 'komal vijaykumar.mulik',
                      email: 'komalvijaykumar.mulik@iqvia.com'
                    }
                  ]
                },
                updated_by: 'Srinivas Manchikatla',
                updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
                created_date: '2024-03-04T06:56:22.014Z',
                updated_date: '2024-03-04T06:56:22.014Z'
              },
              {
                id: 364,
                task_list_id: 829,
                proposal_id: '0f846d97-1913-4081-8a7b-82794a370f80',
                task_id: 'a68eae93-b465-48b4-bd53-a127ecc2c7a7',
                action: 'is_completed',
                value: {
                  newValue: false,
                  oldValue: true
                },
                updated_by: 'Srinivas Manchikatla',
                updated_by_email: 'Srinivas.Manchikatla@iqvia.com',
                created_date: '2024-03-04T04:49:56.110Z',
                updated_date: '2024-03-04T04:49:56.110Z'
              }
            ]
          }
        ]
      ]
    };
    await store.dispatch(resumeSearchAction(data));
  });
});
