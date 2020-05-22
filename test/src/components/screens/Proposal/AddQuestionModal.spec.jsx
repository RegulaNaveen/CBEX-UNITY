// @flow
import expect from 'expect';
import { describe, it } from 'mocha';
import AddQuestionModalModel from './models/AddQuestionModalModel';

describe('AddQuestionModal component', () => {
  const questionSectionOrderInfo = [
    { sectionOrder: 1, sectionName: 'SectionOne' },
    { sectionOrder: 2, sectionName: 'SectionTwo' }
  ];
  const questionSectionList = ['SectionOne', 'SectionTwo'];
  const answerTypesList = ['text', 'number', 'y/n', 'select', 'picklist'];
  const rolesList = ['RoleOne', 'RoleTwo'];
  const isLoading = false;
  const title = 'Add New Question';
  // const checkboxText = 'Send notification now';
  const cancel = 'Cancel';
  const okay = 'Okay';

  describe('rendering', () => {
    it('should render all Paragraphs component', () => {
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.hasParagraphs()).toBe(true);
    });

    it('should render Title text', () => {
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.hasTitle()).toBe(title);
    });

    // TODO: Add test when DayPicker is implemented
    // it('should render DayPicker component', () => {
    //   const wrapper = new AddQuestionModalModel(
    //     questionSectionOrderInfo,
    //     questionSectionList,
    //     answerTypesList,
    //     rolesList,
    //     isLoading
    //   );
    //   expect(wrapper.hasDatePicker()).toBe(true);
    // });

    it('should render Close icon', () => {
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.hasCloseIcon()).toBe(true);
    });

    it('should render Text Area component', () => {
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.hasTextArea()).toBe(true);
    });

    it('should render correct ammount of Dropdown components', () => {
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.hasDropDown()).toBe(true);
    });

    // TODO: Add test when teams functionality is implemented
    // it('should render correct ammount of SelectedTeam components', () => {
    //   const wrapper = new AddQuestionModalModel(
    //     questionSectionOrderInfo,
    //     questionSectionList,
    //     answerTypesList,
    //     rolesList,
    //     isLoading
    //   );
    //   expect(wrapper.hasSelectedTeam(teams.length)).toBe(true);
    // });

    // TODO: Add test when checkbox functionality is implemented
    // it('should render Checkbox component', () => {
    //   const wrapper = new AddQuestionModalModel(
    //     questionSectionOrderInfo,
    //     questionSectionList,
    //     answerTypesList,
    //     rolesList,
    //     isLoading
    //   );
    //   expect(wrapper.hasCheckbox()).toBe(true);
    //   expect(wrapper.hasCheckboxText()).toBe(checkboxText);
    // });

    it('should render correct ammount of PrimaryButton components', () => {
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.hasPrimaryButton()).toBe(true);
      expect(wrapper.hasCancelPrimaryButtonText()).toBe(cancel);
      expect(wrapper.hasOkayPrimaryButtonText()).toBe(okay);
    });
  });

  describe('interactions', () => {
    it('should change questionText state when handleTextChange is called', () => {
      const testQuestion = 'testQuestion';
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.getQuestionText()).toBe('');
      wrapper.doHandleTextChange(testQuestion);
      expect(wrapper.getQuestionText()).toBe(testQuestion);
    });

    it('should change questionText state when handleTextChange is called', () => {
      const testAnswer = 'text';
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.getAnswerType()).toBe('');
      wrapper.doAnswerTypeChange(testAnswer);
      expect(wrapper.getAnswerType()).toBe(testAnswer);
    });

    it('should render correct ammount of TextArea components when answeType is select', () => {
      const testAnswer = 'select';
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.getAnswerType()).toBe('');
      wrapper.doAnswerTypeChange(testAnswer);
      expect(wrapper.getAnswerType()).toBe(testAnswer);
      expect(wrapper.hasTextAreas()).toBe(true);
    });

    it('should change section state when onQuestionSectionChange is called', () => {
      const selectedSection = { sectionOrder: 1, sectionName: 'SectionOne' };
      const testSection = 'SectionOne';
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.getSection()).toBe(undefined);
      wrapper.doQuestionSectionChange(testSection);
      expect(wrapper.getSection()).toEqual(selectedSection);
    });

    it('should change roleName state when onRoleChange is called', () => {
      const testRole = 'RoleOne';
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      expect(wrapper.getRoleName()).toBe('');
      wrapper.doRoleChange(testRole);
      expect(wrapper.getRoleName()).toEqual(testRole);
    });

    it('should setProposalQuestionF be called when Okay button onClick', () => {
      const testQuestion = 'testQuestion';
      const testAnswer = 'select';
      const testSection = 'SectionOne';
      const testRole = 'RoleOne';
      const wrapper = new AddQuestionModalModel(
        questionSectionOrderInfo,
        questionSectionList,
        answerTypesList,
        rolesList,
        isLoading
      );
      wrapper.doHandleTextChange(testQuestion);
      wrapper.doAnswerTypeChange(testAnswer);
      wrapper.doQuestionSectionChange(testSection);
      wrapper.doRoleChange(testRole);
      wrapper.doSave();
      expect(wrapper.onProposalQuestionStubCalledOnce()).toBe(true);
      wrapper.resetEventHandlers();
    });
    // TODO: Add test when teams functionality is implemented
    // it('should change selectedDay state when handleDayChange is called', () => {
    //   const wrapper = new AddQuestionModalModel(
    //     questionSectionOrderInfo,
    //     questionSectionList,
    //     answerTypesList,
    //     rolesList,
    //     isLoading
    //   );
    //   expect(wrapper.getSelectedDay()).toBe('');
    //   wrapper.doHandleDayChange();
    //   expect(wrapper.getSelectedDay()).toBe('testDay');
    // });
    // TODO: Add test when checkbox functionality is implemented
    // it('should change isChecked state when handleIsChecked is called', () => {
    //   const wrapper = new AddQuestionModalModel(
    //     questionSectionOrderInfo,
    //     questionSectionList,
    //     answerTypesList,
    //     rolesList,
    //     isLoading
    //   );
    //   expect(wrapper.getIsChecked()).toBe(false);
    //   wrapper.doHandleIsChecked();
    //   expect(wrapper.getIsChecked()).toBe(true);
    // });
    // TODO: Fix test
    // it('should call handleDeleteTeam on SelectedTeam onClick', () => {
    //   const wrapper = new AddQuestionModalModel(items, teams);
    //   wrapper.doHandleDeleteTeam();
    //   expect(wrapper.getHandleDeleteTeam()).toHaveBeenCalled();
    // });
  });
});
