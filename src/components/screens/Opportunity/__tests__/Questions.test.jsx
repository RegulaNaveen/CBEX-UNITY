/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment jsdom
 */
import React from 'react';
import { cleanup, render, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import axios from 'axios';
import Questions from '../Questions';
import data from './mockdata/question.json';
import Sidebar from '../../../views/Sidebar';
import BidHistory from '../../../common/Bidhistory';

const filterDataMap = {
  answerGroup: {
    answered: Map({
      checked: false,
      label: 'Answered',
      className: 'questions-filter__row1-col1'
    }),
    unanswered: Map({
      checked: false,
      label: 'Unanswered',
      className: 'questions-filter__row1-col1'
    }),
    logic: 'OR'
  },
  rolegroup: {
    myUserRole: Map({
      checked: false,
      label: 'Responsible',
      className: 'questions-filter__row1-col1'
    }),
    interestedParty: Map({
      checked: false,
      label: 'Informed',
      className: 'questions-filter__row2-col1'
    }),
    showInactiveQuestions: Map({
      checked: false,
      label: 'Include N/A Questions',
      className: 'questions-filter__row3-col1'
    }),
    logic: 'AND'
  },
  milestoneGroup: {
    Overview: Map({
      checked: false,
      label: 'Overview',
      className: 'questions-filter__item'
    }),
    'Data Planning': Map({
      checked: false,
      label: 'Data Planning',
      className: 'questions-filter__item'
    }),
    Text: Map({
      checked: false,
      label: 'Text',
      className: 'questions-filter__item'
    }),
    Budget: Map({
      checked: false,
      label: 'Budget',
      className: 'questions-filter__item'
    }),
    Team: Map({
      checked: false,
      label: 'Team',
      className: 'questions-filter__item'
    }),
    'Follow-Up': Map({
      checked: false,
      label: 'Follow-Up',
      className: 'questions-filter__item'
    }),
    logic: 'OR'
  }
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
data.proposal.selectedBid = Map(data.proposal.selectedBid);
data.editQuestionsData = Map(data.editQuestionsData);
data.getBid = Map(data.getBid);
data.proposal.questionsFilter.answerGroup = Map(
  data.proposal.questionsFilter.answerGroup
);
data.proposal.questionsFilter.rolegroup = Map(filterDataMap.rolegroup);
data.proposal.questionsFilter.milestoneGroup = Map(
  filterDataMap.milestoneGroup
);
data.proposal.questionsFilter = Map(data.proposal.questionsFilter);
data.setQuestion = Map(data.setQuestion);
data.sidebar = Map(data.sidebar);
data.proposal = Map(data.proposal);
data.ssoAuth = Map(data.ssoAuth);

const initalstate = {
  ...data,
  ...{
    expandAllSections: jest.fn(),
    fetchUsers: jest.fn(),
    applyQuestionsFilter: jest.fn(),
    callPickListLookupSfData: jest.fn(),
    clearQuestionsFilter: jest.fn(),
    fetchUserTagFlagInQuestion: jest.fn(),
    getPriceModeler: jest.fn(),
    getProposalInfoUpdated: jest.fn(),
    handleOpenClose: jest.fn(),
    handleShowNaCheckbox: jest.fn(),
    resetQuestionsFilter: jest.fn()
  }
};
const store = mockStore(initalstate);
const history = createMemoryHistory({
  initialEntries: [
    {
      pathname: '/opportunities/UZA89103'
    }
  ]
});
describe('Questions component', () => {
  test('Questions component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
    const { getByText, queryByTestId } = await render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Questions {...initalstate} />
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(getByText('Mark N/A')).toBeInTheDocument();
    expect(getByText('Expand All')).toBeInTheDocument();
    expect(queryByTestId('addquestionbtn')).toBeInTheDocument();
  });

  test('Questions Sidebar component render', async () => {
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn()
    };
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));
    const { findByText } = await render(
      <BrowserRouter>
        <Router history={history}>
          <Provider store={store}>
            <Questions {...initalstate}>
              <Sidebar {...initalstate} />
            </Questions>
          </Provider>
        </Router>
      </BrowserRouter>
    );
    expect(await findByText('Controls')).toBeInTheDocument();
  });

  // test('Questions Bid History component render', async () => {
    // jest.mock('axios', () => {
    //   const mAxiosInstance = { get: jest.fn() };
    //   return {
    //     create: jest.fn(() => mAxiosInstance),
    //     interceptors: {
    //       request: { use: jest.fn(), eject: jest.fn() },
    //       response: { use: jest.fn(), eject: jest.fn() }
    //     }
    //   };
    // });
  //   const response = {
  //     data: {
  //       history: [
  //         {
  //           Id: 2104,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: 'Asia Pacific',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-19T06:21:09.702Z',
  //           updatedAt: '2022-12-19T06:21:09.702Z'
  //         },
  //         {
  //           Id: 2091,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: 'Asia Pacific,Central ECG - Holter',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-19T06:00:40.936Z',
  //           updatedAt: '2022-12-19T06:00:40.936Z'
  //         },
  //         {
  //           Id: 2090,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c:
  //             'Asia Pacific,Central ECG - ECG,Central ECG - Holter',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-19T06:00:35.386Z',
  //           updatedAt: '2022-12-19T06:00:35.386Z'
  //         },
  //         {
  //           Id: 2089,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: 'Asia Pacific,Central ECG - ECG',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-19T05:59:52.945Z',
  //           updatedAt: '2022-12-19T05:59:52.945Z'
  //         },
  //         {
  //           Id: 2072,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: 'Asia Pacific',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-16T09:56:38.956Z',
  //           updatedAt: '2022-12-16T09:56:38.956Z'
  //         },
  //         {
  //           Id: 2071,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: 'Asia Pacific',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-16T09:53:38.173Z',
  //           updatedAt: '2022-12-16T09:53:38.173Z'
  //         },
  //         {
  //           Id: 2069,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: 'Asia Pacific,Europe/Middle East/Africa EMEA',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-16T08:58:50.503Z',
  //           updatedAt: '2022-12-16T08:58:50.503Z'
  //         },
  //         {
  //           Id: 2068,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: '',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-16T08:58:21.691Z',
  //           updatedAt: '2022-12-16T08:58:21.691Z'
  //         },
  //         {
  //           Id: 2067,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: '',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-16T08:57:55.610Z',
  //           updatedAt: '2022-12-16T08:57:55.610Z'
  //         },
  //         {
  //           Id: 2066,
  //           ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //           TherapyArea__c: 'Cardiology',
  //           Potential_Regions__c: '',
  //           Phase_P__c: 1,
  //           Number_of_Sites__c: 12,
  //           Patients_Enrolled__c: 123,
  //           Cost: '0',
  //           ErrorMsg: 'null',
  //           created_date: '2022-12-16T08:57:50.204Z',
  //           updatedAt: '2022-12-16T08:57:50.204Z'
  //         }
  //       ],
  //       latestDetails: {
  //         Id: 2104,
  //         ProposalId: '86462966-7e94-4648-b1e7-fb908f48eaf0',
  //         TherapyArea__c: 'Cardiology',
  //         Potential_Regions__c: 'Asia Pacific',
  //         Phase_P__c: 1,
  //         Number_of_Sites__c: 12,
  //         Patients_Enrolled__c: 123,
  //         Cost: '0',
  //         ErrorMsg: 'null',
  //         created_date: '2022-12-19T06:21:09.702Z',
  //         updatedAt: '2022-12-19T06:21:09.702Z'
  //       }
  //     }
  //   };
  //   let requestCallback = () => {
  //     console.log('There were no interceptors');
  //   };
  //   axios.create().get.mockResolvedValueOnce({});
  //   axios.interceptors.request.use.mockImplementation(callback => {
  //     requestCallback = callback;
  //   });
  //   axios.interceptors.response.use = jest.fn(() => response);

  //   axios.get.mockImplementation(() => {
  //     requestCallback();
  //     return {
  //       data: response.data
  //     };
  //   });
  //   const location = window.location;
  //   delete window.location;
  //   window.location = {
  //     ...location,
  //     reload: jest.fn()
  //   };
  //   global.ResizeObserver = jest.fn().mockImplementation(() => ({
  //     observe: jest.fn(),
  //     unobserve: jest.fn(),
  //     disconnect: jest.fn()
  //   }));
  //   const { findByText } = await render(
  //     <BrowserRouter>
  //       <Router history={history}>
  //         <Provider store={store}>
  //           <Questions {...initalstate}>
  //             <BidHistory />
  //           </Questions>
  //         </Provider>
  //       </Router>
  //     </BrowserRouter>
  //   );
  //   expect(await findByText('Bid History')).toBeInTheDocument();
  // });
  afterAll(cleanup);
});
