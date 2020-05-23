// @flow
import React from 'react';
import { Map } from 'immutable';
import CollapsibleList from './CollapsibleList';

type Props = {
  sections: Map
};

const SectionList = ({ sections }: Props) => {
  return (
    <div className="tasksList-wrapper">
      {sections.valueSeq().map(section => {
        const sectionName = section.get('sectionName');
        const questions = section.get(sectionName);
        return (
          <CollapsibleList
            questions={questions}
            title={sectionName}
            key={sectionName}
          />
        );
      })}
    </div>
  );
};

export default SectionList;
