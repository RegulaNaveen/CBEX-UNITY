/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Map, OrderedMap } from 'immutable';
import { store } from '../../../../store';
import QuestionsSectionMapping from '../QuestionsSectionMapping';
import StateData from './mockdata/QuestionSectionMapping.json';

const proposal = StateData.proposal;
const selectedBidMap = Map(proposal.selectedBid);
proposal.selectedBid = selectedBidMap;

const sections = OrderedMap({
    "Adding new section": Map({
      "sectionOrder": 1,
      "sectionName": "Adding new section",
      "questions": OrderedMap({
        "c22451f2-9dda-4dd4-a09c-a34467bfd72a": Map({
          "isCustomQuestion": false,
          "questionId": "c22451f2-9dda-4dd4-a09c-a34467bfd72a",
          "section": {
            "sectionOrder": 24,
            "sectionName": "Adding new section"
          },
          "active": true,
          "sfField": "n/a",
          "questionOrder": 1,
          "questionApproval": false,
          "locked": false,
          "opportunityType": "Default Type,Core Strategy Call Template - AMR/EMEA,Core Strategy Call Template - APAC,Core Strategy and Data Planning Calls - AMR/EMEA,Non-Core Clinical Studies,Ballpark,Opportunity Launch Call (Pilot)",
          "proposalId": "86462966-7e94-4648-b1e7-fb908f48eaf0",
          "questionJSON": "{\"blocks\":[{\"key\":\"bcfph\",\"text\":\"Adding new question\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
          "milestoneNew": [],
          "hasDifferentSFanswer": false,
          "questionHTML": "<div data-contents=\"true\"><div data-block=\"true\" data-editor=\"6r9m6\" data-offset-key=\"bcfph-0-0\"><div data-offset-key=\"bcfph-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"bcfph-0-0\"><span data-text=\"true\">Adding new question</span></span></div></div></div>",
          "roleNames": [
            "Business Developer",
            "Business Account Manager"
          ],
          "visible": true,
          "notApplicable": false,
          "sfObject": "n/a",
          "questionText": "Adding new question",
          "integration": "",
          "answers": [],
          "questionHintJSON": "",
          "questionHintHTML": "",
          "answerConfiguration": {
            "type": "text",
            "options": []
          },
          "events": ""
        }),
        "255e6525-6a06-4690-9bd6-327e8d59a7fa": Map({
          "isCustomQuestion": false,
          "questionId": "255e6525-6a06-4690-9bd6-327e8d59a7fa",
          "section": {
            "sectionOrder": 24,
            "sectionName": "Adding new section"
          },
          "active": true,
          "sfField": "n/a",
          "questionOrder": 2,
          "questionApproval": false,
          "locked": false,
          "opportunityType": "Default Type,Opportunity Launch Call (Pilot),Core Strategy and Data Planning Calls - AMR/EMEA,Core Strategy Call Template - AMR/EMEA,Core Strategy Call Template - APAC,Non-Core Clinical Studies,Ballpark",
          "proposalId": "86462966-7e94-4648-b1e7-fb908f48eaf0",
          "questionJSON": "{\"blocks\":[{\"key\":\"81bi\",\"text\":\"Amrita 1\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
          "milestoneNew": [],
          "hasDifferentSFanswer": false,
          "questionHTML": "<div data-contents=\"true\"><div data-block=\"true\" data-editor=\"9emua\" data-offset-key=\"81bi-0-0\"><div data-offset-key=\"81bi-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"81bi-0-0\"><span data-text=\"true\">Amrita 1</span></span></div></div></div>",
          "roleNames": [
            "Business Developer"
          ],
          "visible": true,
          "notApplicable": false,
          "sfObject": "n/a",
          "questionText": "Amrita 1",
          "integration": "",
          "answers": [],
          "questionHintJSON": "",
          "questionHintHTML": "",
          "answerConfiguration": {
            "type": "text",
            "options": []
          },
          "events": ""
        }),
        "9ad3516b-f345-4fc9-a7c3-b62a8266a8a2": Map({
          "isCustomQuestion": false,
          "questionId": "9ad3516b-f345-4fc9-a7c3-b62a8266a8a2",
          "section": {
            "sectionOrder": 24,
            "sectionName": "Adding new section"
          },
          "active": true,
          "sfField": "n/a",
          "questionOrder": 3,
          "questionApproval": false,
          "locked": false,
          "opportunityType": "Default Type,Core Strategy Call Template - AMR/EMEA,Core Strategy and Data Planning Calls - AMR/EMEA,Core Strategy Call Template - APAC,Non-Core Clinical Studies,Ballpark,Opportunity Launch Call (Pilot)",
          "proposalId": "86462966-7e94-4648-b1e7-fb908f48eaf0",
          "questionJSON": "{\"blocks\":[{\"key\":\"ecm5h\",\"text\":\"Amrita 2\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
          "milestoneNew": [],
          "hasDifferentSFanswer": false,
          "questionHTML": "<div data-contents=\"true\"><div data-block=\"true\" data-editor=\"5fmeb\" data-offset-key=\"ecm5h-0-0\"><div data-offset-key=\"ecm5h-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"ecm5h-0-0\"><span data-text=\"true\">Amrita 2</span></span></div></div></div>",
          "roleNames": [
            "Business Developer"
          ],
          "visible": true,
          "notApplicable": false,
          "sfObject": "n/a",
          "questionText": "Amrita 2",
          "integration": "",
          "answers": [],
          "questionHintJSON": "",
          "questionHintHTML": "",
          "answerConfiguration": {
            "type": "text",
            "options": []
          },
          "events": ""
        })
      })
  }),
})
const initState = {
  sections: sections,
  filteredSections: Map(StateData.filteredSections),
  isQuestionsFiltersEnabled: false,
  filterMilestone: true,
  allSectionsExpanded: false,
  sidebarscroll: false,
  isNotepadOpen: true,
  proposal: Map(proposal),
  setQuestionToDisplayHistory: jest.fn(),
  setTabFromQuestionNotes: jest.fn(),
  onAddQuestion: jest.fn()
};

describe('QuestionSectionMapping component', () => {
  test('QuestionSectionMapping component render', async () => {
    const setHookState = newState =>
      jest.fn().mockImplementation(() => [newState.openModal, () => { }]);
    React.useState = setHookState({
      openModal: true
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <QuestionsSectionMapping {...initState} />
      </Provider>
    );
    // expect(getByTestId('question-section-test-id')).toBeInTheDocument();
  });
});
