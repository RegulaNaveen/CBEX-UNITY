// @flow
import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Map } from 'immutable';
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import Modal from './Modal';
import { PrimaryButton } from '../../common/atoms/Buttons';
import Multiselect from '../../common/atoms/inputs/Multiselect';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import TextArea from '../../common/atoms/inputs/TextArea';
import { Close } from '../../svg';
import {
  getQuestionSectionOrderInfo,
  getQuestionSectionInfo,
  getAnswerTypeInfo,
  getRoles,
  isSetQuestionLoading,
  isQuestionSectionInfoLoading,
  isAnswerTypesInfoLoading,
  isRolesInfoLoading,
} from '../../../redux/selectors';
import {
  getQuestionSection,
  getAnswerTypesInfo,
  getRolesInfo,
  setProposalQuestion,
} from '../../../redux/actions/proposal-actions';

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
  isRolesLoading: boolean,
};

type State = {
  questionText: string,
  section: Object,
  answerType: string,
  roleNames: Array<string>,
};

export class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      questionText: '',
      section: undefined,
      answerType: '',
      roleNames: [],
    };
  }

  componentDidMount() {
    const {
      getQuestionSectionF,
      getAnswerTypesDataF,
      getRolesInfoF,
    } = this.props;

    getQuestionSectionF();
    getAnswerTypesDataF();
    getRolesInfoF();
  }

  handleTextChange = (value: string) => {
    this.setState({ questionText: value });
  };

  onQuestionSectionChange = (value: string) => {
    const { questionSectionOrderInfo } = this.props;
    let sectionOrder = -1;

    questionSectionOrderInfo.forEach((section: Object) => {
      const { sectionOrder: order, sectionName: name } = section;
      if (name === value) sectionOrder = order;
    });

    if (sectionOrder > -1 && value)
      this.setState({ section: { sectionOrder, sectionName: value } });
  };

  onAnswerTypeChange = (value: string) => {
    this.setState({ answerType: value });
  };

  onRoleChange = (values: Array<string>) => {
    const roleNames = values.map((value) => value.replace(', ', ''));
    this.setState({ roleNames });
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
        roleNames,
      };

      setProposalQuestionF(proposalId, questionData);
    }
  };

  renderContent = (
    onClose: Function,
    questionSectionList: Array<string>,
    answerTypesList: Array<string>,
    rolesList: Array<string>,
    isLoading: boolean
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
            </div>
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
    const {
      onClose,
      questionSectionList,
      answerTypesList,
      rolesList,
      isLoading,
      isQuestionSectionLoading,
      isAnswerTypesLoading,
      isRolesLoading,
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
            isLoading
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
    isRolesLoading,
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getQuestionSectionF: getQuestionSection,
    getAnswerTypesDataF: getAnswerTypesInfo,
    getRolesInfoF: getRolesInfo,
    setProposalQuestionF: setProposalQuestion,
  })
)(AddQuestionModal);
