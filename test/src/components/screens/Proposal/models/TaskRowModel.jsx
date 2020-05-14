// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import { TaskRow } from '../../../../../../src/components/screens/Proposal/TaskRow';
import { Checkmark } from '../../../../../../src/components/svg';
import TextArea from '../../../../../../src/components/common/TextArea';
import Dropdown from '../../../../../../src/components/common/Dropdown';
import DatePicker from '../../../../../../src/components/common/DatePicker';
import Multiselect from '../../../../../../src/components/common/Multiselect';

export default class TaskRowModel {
  constructor(
    questionId: string,
    proposalId: string,
    answers: Array<Object>,
    questionText: string,
    answerConfiguration: Object
  ) {
    this._onSetProposalAnswerStub = sinon.stub();
    const props = {
      questionId,
      proposalId,
      answers,
      questionText,
      answerConfiguration,
      setProposalAnswer: this._onSetProposalAnswerStub
    };
    this._wrapper = shallow(<TaskRow {...props} />);
  }

  _wrapper: ShallowWrapper;

  _onSetProposalAnswerStub: stub;

  _getCheckmark = (): ShallowWrapper => this._wrapper.find(Checkmark);

  hasCheckmark = (): ShallowWrapper => this._getCheckmark().length === 1;

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getQuestionParagraph = (): ShallowWrapper => this._getParagraphs().at(0);

  hasQuestionParagraph = (questionText: string): boolean =>
    this._getQuestionParagraph().prop('children') === questionText;

  _getTextArea = (): ShallowWrapper => this._wrapper.find(TextArea);

  hasTextArea = (): boolean => this._getTextArea().length === 1;

  _getDropDown = (): ShallowWrapper => this._wrapper.find(Dropdown);

  hasDropDown = (): boolean => this._getDropDown().length === 1;

  _getDatePicker = (): ShallowWrapper => this._wrapper.find(DatePicker);

  hasDatePicker = (): boolean => this._getDatePicker().length === 1;

  _getMultiselect = (): ShallowWrapper => this._wrapper.find(Multiselect);

  hasMultiselect = (): boolean => this._getMultiselect().length === 1;

  getSelectedDay = (): string => this._wrapper.state('selectedDay');

  getTextValue = (): string => this._wrapper.prop('textValue');

  // Interactions
  onSetProposalAnswerCalledOnce = (): boolean =>
    this._onSetProposalAnswerStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onSetProposalAnswerStub.reset();
  };

  doHandleTextChange = () => {
    this._getTextArea()
      .props()
      .handleTextChange('textValue');
  };

  doOnClickChange = () => {
    this._getDropDown()
      .props()
      .onClick();
  };

  doOnSelectValues = () => {
    this._getMultiselect()
      .props()
      .onClick();
  };

  doHandleDayChange = () => {
    this._getDatePicker()
      .props()
      .handleDayChange('testDay');
  };

  doHandleDate = () => {
    this._getDatePicker()
      .props()
      .handleDate();
  };
}
