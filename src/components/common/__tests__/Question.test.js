import React from "react";
import "@testing-library/jest-dom";
import { Provider } from 'react-redux';
import { render } from "@testing-library/react";
import { List, Map, OrderedMap } from "immutable";

import { store } from '../../../store';
import Question from "../Question";

const answersList = List([
    {
        "user": "AnswerPulledFromSalesforce",
        "userName": "AnswerPulledFromSalesforce",
        "userRole": "AnswerPulledFromSalesforce",
        "date": "2023-02-01T12:56:41.433Z",
        "answer": [
            "Viral hepatitis C"
        ],
        "formattedAnswer": [
            "Viral hepatitis C"
        ],
        "proposalId": "93c77a01-5e31-4191-9b2f-cfac782a21af",
        "updatedInPG": false
    },
]);
const answerConfigurationMap = Map({
    "type": "picklist-lookup",
    "options": []
});
const milestoneNewList = (
    {
        "Name": "Overview",
        "Color": "#015ff1"
    });
const oppdataOrderedmap = OrderedMap({});
const roleNamesList = List(
    [
        "Business Developer"
    ]);
const selectedBidMap = Map({});
const questionDataMap = Map({});
const proposalDetail = {
    "Customer": "Vamsitest",
    "CRM #": "UZA89202",
    "Bid due date": "2025-04-01",
    "Line of business": "Clinical",
    "Is this IQVIA Biotech": "Yes",
    "Phase": "Phase 3",
    "Verbatim indication": "chronic hcv",
    "Therapeutic area": "Endocrinology",
    "Protocol number": "gs - us - 342 - 1138",
    "Product name": "gs - 5816",
    "BoxId": "193778632818",
    IsFsp: "No",
    pertinentDetails: "QA",
    opportunityId: "0060100000BBXHsAAP",
    bidNo: 4
};
const currentSFanswerMap = Map({
    "value": [
        "Diabetes mellitus"
    ],
    "time": "2023-02-08T09:47:45.821Z"
});

describe.skip('test for question component', () => {
    const defaultProps = {
        answers: answersList,
        questionText: 'Indication',
        answerConfiguration: answerConfigurationMap,
        milestone: 'Overview',
        milestoneNew: milestoneNewList,
        ismilestoneavailable: true,
        loading: '',
        sfField: 'Indication__c',
        answerValue: '',
        sfObject: 'Opportunity',
        oppdata: oppdataOrderedmap,
        //currentSFanswer: currentSFanswerMap,
        qvidianIntegration: '',
        hasDifferentSFanswer: true,
        questionHint: '',
        questionHintHTML: '',
        questionHTML: '<div data-contents=\"true\"><div data-block=\"true\" data-editor=\"8vq7g\" data-offset-key=\"fao2w-0-0\"><div data-offset-key=\"fao2w-0-0\" class=\"public-DraftStyleDefault-block public-DraftStyleDefault-ltr\"><span data-offset-key=\"fao2w-0-0\"><span data-text=\"true\">Indication(</span></span></div></div></div>',
        questionJSON: "{\"blocks\":[{\"key\":\"fao2w\",\"text\":\"Indication\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        questionHintJSON: '',
        sectionName: "Opportunity Information from CRM (for Team review)",
        roleNames: roleNamesList,
        setEditQuestionData: jest.fn(),
        isCustomQuestion: false,
        selectedBid: selectedBidMap,
        proposalInfo: '',
        isNotepadOpen: true,
        questionId: '8959b856-0f49-4c4e-8ec8-f5955320866a',
        events: {},
        integrationsData: '',
        questionData: questionDataMap,
        proposalDetail: proposalDetail,
        eventCategories: '',
        NaLoading: false,
        showNaCheckbox: false,
    };

    test('render question component without crashing', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Question {...defaultProps} />
            </Provider>
        );

        expect(getByTestId('question')).toBeInTheDocument();
    });
})