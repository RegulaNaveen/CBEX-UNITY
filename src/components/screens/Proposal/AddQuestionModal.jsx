// @flow
import React, { PureComponent } from 'react';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
// import { parseDate, formatDate } from '../../../utils/DateUtils';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import { isEmpty } from 'lodash';
import Modal from '../../common/Modal';
import { PrimaryButton } from '../../common/Buttons';
import Multiselect from '../../common/Multiselect';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
// import DatePicker from '../../common/DatePicker';
// import Checkbox from '../../common/Checkbox';
// import SelectTeam from '../../common/SelectTeam';
import { Close } from '../../svg';
import {
  getQuestionSectionOrderInfo,
  getQuestionSectionInfo,
  getAnswerTypeInfo,
  getRoles,
  isSetQuestionLoading,
  isQuestionSectionInfoLoading,
  isAnswerTypesInfoLoading,
  isRolesInfoLoading
} from '../../../selectors';
import {
  getQuestionSection,
  getAnswerTypesInfo,
  getRolesInfo,
  setProposalQuestion
} from '../../../actions/proposal-actions';

type Props = {
  match: Match,
  onClose: Function,
  questionSectionOrderInfo: Map,
  questionSectionList: Array<string>,
  answerTypesList: Array<string>,
  rolesList: Array<string>,
  getQuestionSectionF: Function,
  getAnswerTypesDataF: Function,
  getRolesInfoF: Function,
  setProposalQuestionF: Function,
  isLoading: boolean,
  isQuestionSectionLoading: boolean,
  isAnswerTypesLoading: boolean,
  isRolesLoading: boolean
};

type State = {
  // isChecked: boolean,
  questionText: string,
  section: Object,
  answerType: string,
  roleNames: Array<string>,
  showAnswerOptions: boolean
};

export class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      // isChecked: false,
      questionText: '',
      section: undefined,
      answerType: '',
      roleNames: [],
      showAnswerOptions: false
    };
  }

  componentDidMount() {
    const {
      getQuestionSectionF,
      getAnswerTypesDataF,
      getRolesInfoF
    } = this.props;
    getQuestionSectionF();
    getAnswerTypesDataF();
    getRolesInfoF();
  }

  // handleIsChecked = () => {
  //   const { isChecked } = this.state;
  //   this.setState({ isChecked: !isChecked });
  // };

  // handleDeleteTeam = () => {
  //   // TODO: Delete a team item
  // };

  // handleDayChange = (selectedDay: string) => {
  //   this.setState({
  //     selectedDay
  //   });
  // };

  // handleDate = (date: string, format: string) => parseDate(date, format);

  // handleFormatDate = (date: Date, format: string) => formatDate(date, format);

  handleTextChange = (value: string) => {
    this.setState({
      questionText: value
    });
  };

  handleOptionsTextChange = () => {
    // this.setState({
    //   optionsText: value
    // });
  };

  onQuestionSectionChange = (value: string) => {
    const { questionSectionOrderInfo } = this.props;
    let sectionOrder = -1;
    questionSectionOrderInfo.forEach((section: Object) => {
      const { sectionOrder: order, sectionName: name } = section;
      if (name === value) sectionOrder = order;
    });
    if (sectionOrder > -1 && value) {
      this.setState({
        section: { sectionOrder, sectionName: value }
      });
    }
  };

  onAnswerTypeChange = (value: string) => {
    this.setState({
      answerType: value,
      showAnswerOptions: false
    });
    this.renderAnswerOptions(value);
  };

  onRoleChange = (values: Array<string>) => {
    const roleNames = values.map(value => value.replace(', ', ''));
    this.setState({ roleNames });
  };

  renderAnswerOptions = (type: string) => {
    if (type === 'select' || type === 'picklist' || type === 'multi-picklist')
      this.setState({ showAnswerOptions: true });
  };

  onSave = () => {
    const { questionText, section, answerType, roleNames } = this.state;
    const { setProposalQuestionF, match } = this.props;
    if (
      questionText !== '' &&
      section &&
      answerType !== '' &&
      !isEmpty(roleNames)
    ) {
      const proposalId = match.params.id;
      const questionData = {
        proposalId,
        questionText,
        section,
        answerType,
        options: [],
        roleNames
      };

      setProposalQuestionF(proposalId, questionData);
    }
  };

  renderContent = (
    onClose: Function,
    questionSectionList: Array<string>,
    answerTypesList: Array<string>,
    rolesList: Array<string>,
    isLoading: boolean,
    showAnswerOptions: boolean
  ) => {
    if (!isLoading) {
      return (
        <div className="modal-content">
          <div className="modal-wrapper-title">
            <div className="modal-segment-title">
              <p className="modal-title">Add New Question</p>
              <div
                title="Close"
                className="close-modal-icon"
                role="presentation"
                onClick={onClose}
              >
                <Close className="close-icon" />
              </div>
            </div>
            {/* <div className="modal-subtitle">Optional Subtitle</div> */}
          </div>
          <div className="modal-wrapper-body">
            <div className="modal-segment">
              <TextArea
                id="question-text-area"
                className="modal-text-area"
                placeholder="Hint text..."
                title="Enter Question Text"
                type="text"
                onChange={this.handleTextChange}
              />
            </div>
            <div className="modal-segment">
              <div className="modal-answer-type">
                <Dropdown
                  id="dd-andwer-type"
                  placeholder="Select"
                  items={answerTypesList}
                  title="Answer Type"
                  onClick={this.onAnswerTypeChange}
                />
              </div>
              {/* TODO: Uncomment if will use datepicker feature */}
              {/* <DatePicker
                label="Date"
                selectedDay={selectedDay}
                handleDayChange={this.handleDayChange}
                handleFormatDate={this.handleFormatDate}
                handleDate={this.handleDate}
              /> */}
            </div>
            {showAnswerOptions ? (
              <div className="modal-segment">
                <TextArea
                  id="question-text-area"
                  className="modal-options-text-area"
                  placeholder="Option 1, Option 2,..."
                  title="Enter Answer Options"
                  type="text"
                  onChange={this.handleOptionsTextChange}
                />
              </div>
            ) : null}
            <div className="modal-segment">
              <Dropdown
                id="dd-team-member"
                placeholder="Select"
                items={questionSectionList}
                title="Section"
                onClick={this.onQuestionSectionChange}
              />
            </div>
            <div className="modal-segment">
              <Multiselect
                id="dd-team-member"
                placeholder="Select"
                items={rolesList}
                title="Which team member roles will answer"
                onClick={this.onRoleChange}
              />
            </div>
            {/* TODO: Uncomment if will use a select team feature */}
            {/* <div className="modal-segment">
              {teams &&
                teams.map(team => {
                  const { id, name } = team;
                  return (
                    <SelectTeam
                      key={id}
                      id="selected-team-item"
                      onClick={this.handleDeleteTeam}
                    >
                      {name}
                    </SelectTeam>
                  );
                })}
            </div> */}
            {/* TODO: Uncomment to add notification feature */}
            {/* <div className="modal-segment">
              <Checkbox
                id="send-notification-checkbox"
                value="notification"
                name="notification"
                onChange={this.handleIsChecked}
                isChecked={isChecked}
              >
                Send notification now
              </Checkbox>
            </div> */}
          </div>
          <div className="modal-wrapper-footer">
            <div className="modal-button-cancel">
              <PrimaryButton
                className="close-button"
                id="cancel-button"
                onClick={onClose}
              >
                Cancel
              </PrimaryButton>
            </div>
            <div className="modal-button-okay">
              <PrimaryButton
                className="okay-button"
                id="okay-button"
                onClick={this.onSave}
              >
                Okay
              </PrimaryButton>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="modal-loader">
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        <p className="modal-loader-title">Uploading Question</p>
      </div>
    );
  };

  render() {
    const { showAnswerOptions } = this.state;
    const {
      onClose,
      questionSectionList,
      answerTypesList,
      rolesList,
      isLoading,
      isQuestionSectionLoading,
      isAnswerTypesLoading,
      isRolesLoading
    } = this.props;
    return (
      <Modal>
        {!isQuestionSectionLoading &&
        !isAnswerTypesLoading &&
        !isRolesLoading ? (
          this.renderContent(
            onClose,
            questionSectionList,
            answerTypesList,
            rolesList,
            isLoading,
            showAnswerOptions
          )
        ) : (
          <div className="modal-loader">
            <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
            <p className="modal-loader-title">
              Loading custom question options
            </p>
          </div>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const questionSectionList = getQuestionSectionInfo(state);
  const answerTypesList = getAnswerTypeInfo(state);
  const rolesList = getRoles(state);
  const questionSectionOrderInfo = getQuestionSectionOrderInfo(state);
  const isLoading = isSetQuestionLoading(state);
  const isQuestionSectionLoading = isQuestionSectionInfoLoading(state);
  const isAnswerTypesLoading = isAnswerTypesInfoLoading(state);
  const isRolesLoading = isRolesInfoLoading(state);

  return {
    questionSectionList,
    answerTypesList,
    rolesList,
    questionSectionOrderInfo,
    isLoading,
    isQuestionSectionLoading,
    isAnswerTypesLoading,
    isRolesLoading
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getQuestionSectionF: getQuestionSection,
    getAnswerTypesDataF: getAnswerTypesInfo,
    getRolesInfoF: getRolesInfo,
    setProposalQuestionF: setProposalQuestion
  })
)(AddQuestionModal);
