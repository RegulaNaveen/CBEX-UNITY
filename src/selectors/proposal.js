// @flow
import { Map, fromJS } from 'immutable';
import _ from 'lodash';

const getSections = (questions: Array<Object>) => {
  const questionsList = _.mapValues(_.groupBy(questions, 'section'), sections =>
    sections.map(question => _.omit(question, 'section'))
  );
  console.log('>>>>', questionsList);
  
  return questionsList;
};

export const getQuestions = (proposal: Map): Map =>
  fromJS(getSections(proposal.get('proposalQuestions')));

export const DummyForExport = (state: Map): Map => state.get('asd');
