// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import sinon from 'sinon';
import type { stub } from 'sinon';
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
  constructor(items: Array<Object>, teams: Array<Object>) {
    this._functionStub = sinon.stub();
    const props = {
      onClose: this._functionStub,
      onSave: this._functionStub,
      items,
      teams
    };
    this._wrapper = shallow(<AddQuestionModal {...props} />);
    this._titleIndex = 0;
    this._labelIndex = 1;
    this._cancelButtonIndex = 0;
    this._okayButtonIndex = 1;
  }

  _wrapper: ShallowWrapper;

  _functionStub: stub;

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

  hasDropDown = (): boolean => this._getDropDown().length === 2;

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

  // Interactions

  doHandleDayChange = () => {
    this._getDatePicker()
      .props()
      .handleDayChange('testDay');
  };

  doHandleIsChecked = () => {
    this._getCheckbox()
      .props()
      .onChange();
  };

  doHandleDeleteTeam = () => {
    this._getSelectTeam()
      .at(0)
      .props()
      .onClick();
  };
}
