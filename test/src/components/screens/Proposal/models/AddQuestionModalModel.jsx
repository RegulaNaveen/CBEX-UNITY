// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
import { Map } from 'immutable';
import { AddQuestionModal } from '../../../../../../src/components/screens/Proposal/AddQuestionModal';
import Modal from '../../../../../../src/components/common/Modal';
import DatePicker from '../../../../../../src/components/common/DatePicker';
import { PrimaryButton } from '../../../../../../src/components/common/Buttons';
import Checkbox from '../../../../../../src/components/common/Checkbox';
import Dropdown from '../../../../../../src/components/common/Dropdown';
import TextArea from '../../../../../../src/components/common/TextArea';
import SelectTeam from '../../../../../../src/components/common/SelectTeam';
import { Close } from '../../../../../../src/components/svg';

export default class AddQuestoinModalModel {
  constructor(
    questionSectionOrderInfo: Map,
    questionSectionList: Array<string>,
    answerTypesList: Array<string>,
    rolesList: Array<string>,
    isLoading: boolean
  ) {
    this._onEventStub = sinon.stub();
    this._getQuestionSectionStub = sinon.stub();
    this._getAnswerTypesDataStub = sinon.stub();
    this._getRolesInfoStub = sinon.stub();
    this._setProposalQuestionStub = sinon.stub();
    const props = {
      onClose: this._onEventStub,
      questionSectionOrderInfo,
      questionSectionList,
      answerTypesList,
      rolesList,
      getQuestionSectionF: this._getQuestionSectionStub,
      getAnswerTypesDataF: this._getAnswerTypesDataStub,
      getRolesInfoF: this._getRolesInfoStub,
      setProposalQuestionF: this._setProposalQuestionStub,
      isLoading
    };
    this._wrapper = shallow(<AddQuestionModal {...props} />);
    this._titleIndex = 0;
    this._labelIndex = 1;
    this._cancelButtonIndex = 0;
    this._okayButtonIndex = 1;
  }

  _wrapper: ShallowWrapper;

  _onEventStub: stub;

  _getQuestionSectionStub: stub;

  _getAnswerTypesDataStub: stub;

  _getRolesInfoStub: stub;

  _setProposalQuestionStub: stub;

  _titleIndex: number;

  _labelIndex: number;

  _cancelButtonIndex: number;

  _okayButtonIndex: number;

  _getModalComponent = (): ShallowWrapper => this._wrapper.find(Modal);

  _getParagraphs = (): ShallowWrapper => this._wrapper.find('p');

  _getCloseIcon = (): ShallowWrapper => this._wrapper.find(Close);

  _getTextArea = (): ShallowWrapper => this._wrapper.find(TextArea);

  _getDropDown = (): ShallowWrapper => this._wrapper.find(Dropdown);

  _getSelectTeam = (): ShallowWrapper => this._wrapper.find(SelectTeam);

  _getCheckbox = (): ShallowWrapper => this._wrapper.find(Checkbox);

  _getPrimaryButton = (): ShallowWrapper => this._wrapper.find(PrimaryButton);

  _getDatePicker = (): ShallowWrapper => this._wrapper.find(DatePicker);

  getSelectedDay = (): string => this._wrapper.state('selectedDay');

  getIsChecked = (): boolean => this._wrapper.state('isChecked');

  hasModalComponent = (): boolean => this._getModalComponent().length === 1;

  hasDatePicker = (): boolean => this._getDatePicker().length === 1;

  hasParagraphs = (): boolean => this._getParagraphs().length === 1;

  hasTitle = (): string =>
    this._getParagraphs()
      .at(this._titleIndex)
      .prop('children');

  hasLabel = (): string =>
    this._getParagraphs()
      .at(this._labelIndex)
      .prop('children');

  hasCloseIcon = (): boolean => this._getCloseIcon().length === 1;

  hasTextArea = (): boolean => this._getTextArea().length === 1;

  hasTextAreas = (): boolean => this._getTextArea().length === 2;

  hasDropDown = (): boolean => this._getDropDown().length === 3;

  hasSelectedTeam = (selectedTeamlength: number): boolean =>
    this._getSelectTeam().length === selectedTeamlength;

  getHandleDeleteTeam = (): Function =>
    this._getSelectTeam()
      .at(0)
      .props().onClick;

  hasCheckbox = (): boolean => this._getCheckbox().length === 1;

  hasCheckboxText = (): string =>
    this._getCheckbox()
      .first()
      .prop('children');

  hasPrimaryButton = (): boolean => this._getPrimaryButton().length === 2;

  hasCancelPrimaryButtonText = (): string =>
    this._getPrimaryButton()
      .at(this._cancelButtonIndex)
      .prop('children');

  hasOkayPrimaryButtonText = (): string =>
    this._getPrimaryButton()
      .at(this._okayButtonIndex)
      .prop('children');

  getOkayPrimaryButton = (): ShallowWrapper =>
    this._getPrimaryButton().at(this._okayButtonIndex);

  getQuestionText = (): string => this._wrapper.state('questionText');

  getAnswerType = (): string => this._wrapper.state('answerType');

  getSection = (): string => this._wrapper.state('section');

  getRoleName = (): string => this._wrapper.state('roleName');

  // Interactions

  doHandleTextChange = (value: string) =>
    this._getTextArea()
      .props()
      .onChange(value);

  doAnswerTypeChange = (value: string) =>
    this._getDropDown()
      .at(0)
      .props()
      .onClick(value);

  doAnswerTypeChange = (value: string) =>
    this._getDropDown()
      .at(0)
      .props()
      .onClick(value);

  doQuestionSectionChange = (value: string) =>
    this._getDropDown()
      .at(1)
      .props()
      .onClick(value);

  doRoleChange = (value: string) =>
    this._getDropDown()
      .at(2)
      .props()
      .onClick(value);

  doSave = () =>
    this.getOkayPrimaryButton()
      .props()
      .onClick();

  onProposalQuestionStubCalledOnce = (): boolean =>
    this._setProposalQuestionStub.calledOnce === true;

  resetEventHandlers = () => {
    this._onEventStub.reset();
    this._getQuestionSectionStub.reset();
    this._getAnswerTypesDataStub.reset();
    this._getRolesInfoStub.reset();
    this._setProposalQuestionStub.reset();
  };

  // TODO: Add tests when functionality is implemented
  // doHandleDayChange = () => {
  //   this._getDatePicker()
  //     .props()
  //     .handleDayChange('testDay');
  // };

  // doHandleIsChecked = () => {
  //   this._getCheckbox()
  //     .props()
  //     .onChange();
  // };

  // doHandleDeleteTeam = () => {
  //   this._getSelectTeam()
  //     .at(0)
  //     .props()
  //     .onClick();
  // };
}
