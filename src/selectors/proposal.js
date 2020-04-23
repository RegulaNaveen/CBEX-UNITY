// @flow
import { Map, fromJS } from 'immutable';

const getSections = (questions: Array<Object>) => {
  const sections = [];

  questions.forEach((question: Object) => {
    const { section } = question;
    if (!sections.includes(section)) sections.push(section);
  });

  return sections;
};

export const getQuestions = (proposal: Map): Map =>
  fromJS(getSections(proposal.get('proposalQuestions')));

export const DummyForExport = (state: Map): Map => state.get('asd');
