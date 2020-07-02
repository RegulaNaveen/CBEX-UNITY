// @flow
import React from 'react';
import { Map } from 'immutable';
import CollapsibleList from './CollapsibleList';

type Props = {
  sections: Map,
  isCheckedAll: boolean
};

const SectionList = ({ sections, isCheckedAll }: Props) => {
  return (
    <div className="tasksList-wrapper">
      {sections.valueSeq().map(section => {
        const sectionName = section.get('sectionName');
        const questions = section.get('questions');
        return (
          <CollapsibleList
            questions={questions}
            title={sectionName}
            key={sectionName}
            isCheckedAll={isCheckedAll}
          />
        );
      })}
    </div>
  );
};

export default SectionList;
