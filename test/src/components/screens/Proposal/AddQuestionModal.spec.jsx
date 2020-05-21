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
  const answerTypesList = ['text', 'number', 'y/n'];
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
