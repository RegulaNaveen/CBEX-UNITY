// @flow
import React, { PureComponent } from 'react';
import { isEmpty, isString } from 'lodash';
import 'react-day-picker/src/style.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Trash from 'apollo-react-icons/Trash';
import Tooltip from 'apollo-react/components/Tooltip';
import { Map } from 'immutable'; // NOSONAR
import Loader from 'react-loader-spinner';
import { compose } from 'redux';
import classNames from 'classnames';
import { PrimaryButton } from '../../common/atoms/Buttons';
import Multiselect from '../../common/atoms/inputs/Multiselect';
import Dropdown from '../../common/atoms/inputs/Dropdown';
import TextArea from '../../common/atoms/inputs/TextArea';
import { Close } from '../../svg';
import {
  getAnswerTypeInfo,
  getRoles,
  isSetQuestionLoading,
  isQuestionSectionInfoLoading,
  isAnswerTypesInfoLoading,
  isRolesInfoLoading,
  getProposalDetails,
  getIsOpen,
  getEditQuestionData,
  getSelectedBid,
  getAllUnityTab,
  getAllApprovalTab
} from '../../../redux/selectors';
import {
  getfetchAllFlags,
  selectSectionNames,
  selectSectionOrderInfo
} from '../../../redux/selectors/proposal';
import {
  getAnswerTypesInfo,
  getRolesInfo,
  setProposalQuestion,
  setEditQuestionData,
  editProposalQuestion,
  deleteProposalQuestion
} from '../../../redux/actions/proposal-actions';
import MatomoHOC from '../../HOC/MatomoHOC';
import { SocketContext } from '../../../context/SocketContext';
import {
  setUnityQuestion,
  editUnityQuestion,
  deleteUnityQuestion
} from '../../../redux/actions/unitytab-action';
import { shouldShowSection } from '../../screens/UnityTabs/utils';

type Props = {
  onClose: Function,
  answerTypesList: Array<string>,
  rolesList: Array<string>,
  getAnswerTypesDataF: Function,
  getRolesInfoF: Function,
  setProposalQuestionF: Function,
  setUnityQuestionF: Function,
  isLoading: boolean,
  isQuestionSectionLoading: boolean,
  isAnswerTypesLoading: boolean,
  isRolesLoading: boolean,
  currentsection: mixed,
  eventCategories: any,
  trackEvent: any,
  proposalDetail: any,
  sectionsOrderInfo: Map,
  sectionNames: Array<string>,
  isSidebarOpen: boolean,
  setEditQuestionData: (data: Object) => void,
  editQuestionsData: Map,
  editProposalQuestion: (data: Object) => void,
  editUnityQuestion: (data: Object) => void,
  deleteProposalQuestion: (data: Object) => void,
  deleteUnityQuestion: (data: Object) => void,
  selectedBid: Map,
  isOnlyDateAnswer: boolean,
  allUnityTab: Map,
  allApprovalTab: Map,
  allFlags: Boolean
};

type State = {
  questionText: string,
  section: Object,
  answerType: string,
  roleNames: Array<string>
};

const MSG_FIELD_REQUIRED = 'This field is required';
export class AddQuestionModal extends PureComponent<Props, State> {
  static contextType = SocketContext;

  constructor(props: Object) {
    super(props);
    this.state = {
      questionText: '',
      section: undefined,
      answerType: '',
      roleNames: [],
      error: [],
      submit: false,
      loaderText: 'Uploading Question',
      unityAllTabSection: [],
      unityAllSectionOrderInfo: [],
      approvalAllTabSection: [],
      approvalAllSectionOrderInfo: []
    };
  }

  componentDidMount() {
    let tabId = this.props.tabId;
    const {
      getAnswerTypesDataF,
      getRolesInfoF,
      editQuestionsData,
      isOnlyDateAnswer,
      allUnityTab,
      allFlags,
      allApprovalTab
    } = this.props;
    getAnswerTypesDataF();
    getRolesInfoF();

    this.calculateHeight();
    // on Edit Mode
    if (editQuestionsData.size > 0) {
      this.setState({
        questionText: editQuestionsData.get('questionText'),
        section: editQuestionsData.get('section'),
        answerType: editQuestionsData.get('answerType'),
        roleNames: editQuestionsData.get('roleNames').toJS()
      });

      tabId = editQuestionsData.get('tabId');
    }

    if (isOnlyDateAnswer) {
      this.setState({ answerType: 'date' });
    }

    let tab = allUnityTab[tabId] ? allUnityTab[tabId] : '';
    const sectionUnity = [];
    const sectionOrderInfoUnity = [];
    const sectionApproval = [];
    const sectionOrderInfoApproval = [];
    {
      tab.length > 0 &&
        tab.map(
          item => {
            if (shouldShowSection(item.UnityTabSectionId, tabId, allFlags)) {
              sectionUnity.push(item.UnityTabSectionTitle)
              sectionOrderInfoUnity.push({
                sectionName: item.UnityTabSectionTitle,
                sectionOrder: item.UnityTabSectionOrder,
                tabID: tabId
              })

            }
          }
        );
    }
    {
      allApprovalTab.length > 0 && allApprovalTab.map(item => {
        sectionApproval.push(item.ApprovalSectionTitle)
        sectionOrderInfoApproval.push({
          sectionName: item.ApprovalSectionTitle,
          sectionOrder: item.ApprovalSectionOrder,
        })
      }
      )
    }

    this.setState({
      unityAllTabSection: sectionUnity,
      unityAllSectionOrderInfo: sectionOrderInfoUnity,
      approvalAllTabSection: sectionApproval,
      approvalAllSectionOrderInfo: sectionOrderInfoApproval
    });
  }

  componentDidUpdate() {
    this.calculateHeight();
  }

  componentWillUnmount() {
    const { setEditQuestionData, editQuestionsData } = this.props;
    // clear Data on Edit mode
    if (editQuestionsData.size > 0) {
      setEditQuestionData({});
    }
  }

  // calculate modal window position
  calculateHeight = () => {
    const modalWrapperElem = document.getElementsByClassName(
      'add-question-modal-dialog-wrapper'
    )[0];

    const wrapperTop = modalWrapperElem.getBoundingClientRect().top || null;

    if (wrapperTop < 0) {
      modalWrapperElem.style.transform = 'none';
      modalWrapperElem.style.left = 'auto';
      modalWrapperElem.style.top = 0;
    }
  };

  handleTextChange = (value: string) => {
    this.setState({ questionText: value }, () => {
      this.validateQuestionText();
    });
  };

  onQuestionSectionChange = (value: string) => {
    let tabFlag = this.props.tabFlag;
    let tabId = this.props.tabId;
    const { sectionsOrderInfo, editQuestionsData } = this.props;
    const { unityAllSectionOrderInfo, approvalAllSectionOrderInfo } = this.state;
    const isEditMode = editQuestionsData.size > 0 || false;
    if (isEditMode) {
      tabFlag = editQuestionsData.get('tabFlag');
      tabId = editQuestionsData.get('tabId');
    }
    let sectionOrder = -1;
    if (tabFlag == 'customTab') {
      unityAllSectionOrderInfo.forEach((section: Object) => {
        const { sectionOrder: order, sectionName: name } = section;
        if (name === value) sectionOrder = order;
      });
      if (sectionOrder > -1 && value)
        this.setState(
          { section: { sectionOrder, sectionName: value, tabID: tabId } },
          () => {
            this.validateSection();
          }
        );
    } else if (tabFlag == 'Approvals') {
      approvalAllSectionOrderInfo.forEach((section: Object) => {
        const { sectionOrder: order, sectionName: name } = section;
        if (name === value) sectionOrder = order;
      });
      if (sectionOrder > -1 && value)
        this.setState(
          { section: { sectionOrder, sectionName: value } },
          () => {
            this.validateSection();
          }
        );


    } else {
      sectionsOrderInfo.forEach((section: Object) => {
        const { sectionOrder: order, sectionName: name } = section;
        if (name === value) sectionOrder = order;
      });
      if (sectionOrder > -1 && value)
        this.setState({ section: { sectionOrder, sectionName: value } }, () => {
          this.validateSection();
        });
    }
  };

  onAnswerTypeChange = (value: string) => {
    this.setState({ answerType: value }, () => {
      this.validateAnswer();
    });
  };

  onRoleChange = (values: Array<string>) => {
    const roleNames = values.map(value => value.replace(', ', ''));
    this.setState({ roleNames }, () => {
      this.validateRoles();
    });
  };

  validateQuestionText = (...args) => {
    const { questionText, error } = this.state;
    if (args && args.length && questionText.trim().length === 0) {
      this.setState(
        {
          error: [...error.filter(v => !v.questiontext)]
        },
        () => {
          this.setState(prevState => ({
            error: [
              ...prevState.error,
              { questiontext: { message: MSG_FIELD_REQUIRED } }
            ]
          }));
        }
      );
    } else {
      if (questionText.length === 0 && !error.some(v => v.questiontext)) {
        this.setState(prevState => ({
          error: [
            ...prevState.error,
            { questiontext: { message: MSG_FIELD_REQUIRED } }
          ]
        }));
      }
      if (questionText.length > 0 && error.some(v => v.questiontext)) {
        this.setState({
          error: [...error.filter(v => !v.questiontext)]
        });
      }
    }
  };

  validateSection = () => {
    const { section, error } = this.state;

    if (
      (!section || section.length === 0 || section === '') &&
      !error.some(v => v.section)
    ) {
      this.setState(prevState => ({
        error: [
          ...prevState.error,
          { section: { message: MSG_FIELD_REQUIRED } }
        ]
      }));
    }
    if (
      section &&
      Object.keys(section).length > 0 &&
      error.some(v => v.section)
    ) {
      this.setState({ error: error.filter(v => !v.section) });
    }
  };

  validateAnswer = () => {
    const { answerType, error } = this.state;
    if (
      (!answerType || answerType.length === 0 || answerType === '') &&
      !error.some(v => v.answerType)
    ) {
      this.setState(prevState => ({
        error: [
          ...prevState.error,
          { answerType: { message: MSG_FIELD_REQUIRED } }
        ]
      }));
    }
    if (answerType && answerType.length > 0 && error.some(v => v.answerType)) {
      this.setState({ error: error.filter(v => !v.answerType) });
    }
  };

  validateRoles = () => {
    const { roleNames, submit, error } = this.state;
    if (submit && isEmpty(roleNames) && !error.some(v => v.roleNames)) {
      this.setState(prevState => ({
        error: [
          ...prevState.error,
          { roleNames: { message: MSG_FIELD_REQUIRED } }
        ]
      }));
    }
    if (roleNames.length > 0 && error.some(v => v.roleNames)) {
      this.setState({ error: error.filter(v => !v.roleNames) });
    }
  };

  onSave = () => {
    let tabFlag = this.props.tabFlag;
    const { questionText, section, answerType, roleNames } = this.state;

    const {
      setProposalQuestionF,
      setUnityQuestionF,
      editQuestionsData,
      editProposalQuestion,
      editUnityQuestion,
      selectedBid,
      onClose
    } = this.props;
    const isEditMode = editQuestionsData.size > 0 || false;
    if (isEditMode) {
      tabFlag = editQuestionsData.get('tabFlag');
    }
    this.setState({ submit: true }, async () => {
      this.validateQuestionText(true);
      this.validateSection();
      this.validateAnswer();
      this.validateRoles();

      if (
        questionText.trim() !== '' &&
        questionText.trim().length > 0 &&
        section &&
        answerType !== '' &&
        !isEmpty(roleNames)
      ) {
        const proposalId = selectedBid.get('id');
        let questionData = {};
        if (tabFlag == 'customTab') {
          questionData = {
            proposalId,
            questionText,
            section,
            answerType,
            options: [],
            roleNames,
            type: 'customTab'
          };
        } else if (tabFlag == 'Approvals') {
          section['approvalSectionName'] = section.sectionName ;
          section['sectionName'] = "Approvals";
          section['direction'] = "left" ;
          questionData = {
            proposalId,
            questionText,
            section,
            answerType,
            options: [],
            roleNames,
            type: 'Approvals'
          };

        } else {
          questionData = {
            proposalId,
            questionText,
            section,
            answerType,
            options: [],
            roleNames
          };
        }

        this.setState(prevState => ({
          error: []
        }));
        if (isEditMode) {
          this.setState({ loaderText: 'Updating Question' });
          if (tabFlag == 'customTab') {
            const result = editUnityQuestion(
              proposalId,
              editQuestionsData.get('questionId'),
              questionData,
              this.context
            );
          } else {
            editProposalQuestion(
              proposalId,
              editQuestionsData.get('questionId'),
              questionData,
              this.context
            );
          }
        } else {
          if (tabFlag == 'customTab' || tabFlag == 'Approvals') {
            const result = await setUnityQuestionF(
              proposalId,
              questionData,
              this.context
            );
            this.trackMatomoEventCreateQ(questionData);
            if (result) onClose();
          } else {
            setProposalQuestionF(proposalId, questionData, this.context);
            this.trackMatomoEventCreateQ(questionData);
          }
        }
      }
    });
  };

  onDelete = () => {
    const {
      deleteProposalQuestion,
      deleteUnityQuestion,
      editQuestionsData,
      selectedBid
    } = this.props;

    const proposalId = selectedBid.get('id');
    const tabFlag = editQuestionsData.get('tabFlag');
    this.setState({ loaderText: 'Deleting Question' });

    if (tabFlag == 'customTab') {
      const question_data = {
        proposalId: proposalId,
        questionId: editQuestionsData.get('questionId'),
        sectionName: editQuestionsData.get('section'),
        tabId: editQuestionsData.get('tabId'),
        type: tabFlag
      };
      const res = deleteUnityQuestion(question_data, this.context);
    }else if(tabFlag == 'Approvals'){

      const question_data = {
        proposalId: proposalId,
        questionId: editQuestionsData.get('questionId'),
        sectionName: editQuestionsData.get('section'),
        type: tabFlag
      };
      const res = deleteUnityQuestion(question_data, this.context);

    } else {
      const res = deleteProposalQuestion(
        proposalId,
        editQuestionsData.get('questionId'),
        this.context
      );
    }
  };

  trackMatomoEventCreateQ = data => {
    const { eventCategories, proposalDetail, trackEvent } = this.props;
    trackEvent({
      category: eventCategories.pd(this.props),
      action: `Question Added: ${data.questionText} (${data.section.sectionName})`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({ ...data, ...proposalDetail })
        }
      ]
    });
  };

  renderContent = (
    onClose: Function,
    sectionNames: Array<string>,
    answerTypesList: Array<string>,
    rolesList: Array<string>,
    isLoading: boolean,
    selectedValue: String
  ) => {
    if (rolesList) rolesList = rolesList.sort();
    const { editQuestionsData, isOnlyDateAnswer } = this.props;
    let tabFlag = this.props.tabFlag;
    const {
      questionText,
      section,
      answerType,
      roleNames,
      loaderText,
      error,
      unityAllTabSection,
      approvalAllTabSection
    } = this.state;
    var filteredSectionNames = '';
    const isEditMode = editQuestionsData.size > 0 || false;
    if (isEditMode) {
      tabFlag = editQuestionsData.get('tabFlag');
    }
    if (tabFlag == 'customTab') {
      filteredSectionNames =
        unityAllTabSection.length > 0 ? unityAllTabSection : '';
    } else if (tabFlag == 'Approvals') {
      filteredSectionNames =
        approvalAllTabSection.length > 0 ? approvalAllTabSection : '';
    } else {
      filteredSectionNames = sectionNames.filter(
        sectionName => sectionName !== 'Questions_for_the_Customer_left_panel'
      );
    }


    const isQuestionAnswered = editQuestionsData.get('questionAnswered');
    if (!isLoading) {
      return (
        <div className="modal-content">
          <div className="modal-wrapper-title">
            <div className="modal-segment-title">
              <p className="modal-title">
                {isEditMode ? 'Edit Question' : 'Add New Question'}
              </p>
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
                placeholder="Question text"
                title="Enter Question Text"
                value={isEditMode ? questionText : questionText || ''}
                type="text"
                error={error.filter(v => v.questiontext)}
                onChange={e => this.handleTextChange(e)}
              />
            </div>
            <div className="modal-segment">
              <div className="modal-answer-type">
                <Dropdown
                  id="dd-andwer-type"
                  placeholder="Select"
                  items={answerTypesList}
                  title="Answer Type"
                  selectedValue={
                    (isEditMode && answerType) ||
                    (isOnlyDateAnswer && answerType)
                  }
                  error={error.filter(v => v.answerType)}
                  onClick={this.onAnswerTypeChange}
                  disabled={isQuestionAnswered || isOnlyDateAnswer}
                />
                {isQuestionAnswered && (
                  <p className="disabled-text">
                    The option is disabled due to the question already been
                    answered
                  </p>
                )}
              </div>
            </div>
            <div className="modal-segment">
              <Dropdown
                id="dd-team-member"
                placeholder="Select"
                items={filteredSectionNames}
                selectedValue={
                  isEditMode
                    ? isString(section)
                      ? section
                      : section?.sectionName
                    : selectedValue
                }
                title="Section"
                error={error.filter(v => v.section)}
                onClick={this.onQuestionSectionChange}
              />
            </div>
            <div className="modal-segment">
              <Multiselect
                id="dd-team-member"
                placeholder="Select"
                items={rolesList}
                title="Which team member roles will answer"
                value={isEditMode && roleNames}
                error={error.filter(v => v.roleNames)}
                onClick={this.onRoleChange}
                onChange={() => { }}
              />
            </div>
          </div>
          <div className="modal-wrapper-footer">
            <div className="modal-footer-content">
              <div className="modal-footer-left">
                {isEditMode && (
                  <>
                    <div className="modal-button-delete">
                      <PrimaryButton
                        className="delete-button"
                        id="delete-button"
                        onClick={this.onDelete}
                        disabled={isQuestionAnswered}
                      >
                        {isQuestionAnswered ? (
                          <Tooltip
                            title="The question was answered previously and cannot be deleted"
                            placement="top"
                          >
                            <div>
                              <Trash
                                className="trash-icon"
                                fontSize="extraSmall"
                              />{' '}
                              Delete
                            </div>
                          </Tooltip>
                        ) : (
                          <div>
                            <Trash
                              className="trash-icon"
                              fontSize="extraSmall"
                            />{' '}
                            Delete
                          </div>
                        )}
                      </PrimaryButton>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer-right">
                <div className="modal-button-cancel">
                  <PrimaryButton
                    className="close-button"
                    id="cancel-button"
                    onClick={() => {
                      this.setState({ error: [] });
                      onClose();
                    }}
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
                    {isEditMode ? 'Save' : 'Okay'}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="modal-loader">
        <Loader type="TailSpin" color="#297DFD" height={100} width={100} />
        <p className="modal-loader-title">{loaderText}</p>
      </div>
    );
  };

  render() {
    const {
      onClose,
      answerTypesList,
      rolesList,
      isLoading,
      isQuestionSectionLoading,
      isAnswerTypesLoading,
      isRolesLoading,
      currentsection,
      sectionNames,
      isSidebarOpen
    } = this.props;
    const { error } = this.state;
    if (
      error &&
      error.length > 0 &&
      document.getElementsByClassName('modal-wrapper-body')
    ) {
      document.getElementsByClassName(
        'modal-wrapper-body'
      )[0].style.marginBottom = '5px';
    } else if (
      document.getElementsByClassName('modal-wrapper-body') &&
      document.getElementsByClassName('modal-wrapper-body').length
    ) {
      document.getElementsByClassName(
        'modal-wrapper-body'
      )[0].style.marginBottom = '40px';
    }
    return (
      <div
        data-testid="question-model-testid"
        className={classNames('add-question-modal-wrapper', {
          'sidebar-open': isSidebarOpen
        })}
      >
        <div className="add-question-modal-dialog-blur" />
        <div className="add-question-modal-dialog-wrapper">
          {!isQuestionSectionLoading &&
            !isAnswerTypesLoading &&
            !isRolesLoading ? (
            this.renderContent(
              onClose,
              sectionNames,
              answerTypesList,
              rolesList,
              isLoading,
              currentsection
            )
          ) : (
            <div className="modal-loader">
              <Loader
                type="TailSpin"
                color="#297DFD"
                height={100}
                width={100}
              />
              <p className="modal-loader-title">
                Loading custom question options
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const answerTypesList = getAnswerTypeInfo(state);
  const rolesList = getRoles(state);
  const isLoading = isSetQuestionLoading(state);
  const isQuestionSectionLoading = isQuestionSectionInfoLoading(state);
  const isAnswerTypesLoading = isAnswerTypesInfoLoading(state);
  const isRolesLoading = isRolesInfoLoading(state);
  const proposalDetail = getProposalDetails(state);
  const sectionNames = selectSectionNames(state);
  const sectionsOrderInfo = selectSectionOrderInfo(state);
  const isSidebarOpen = getIsOpen(state);

  return {
    answerTypesList,
    rolesList,
    isLoading,
    isQuestionSectionLoading,
    isAnswerTypesLoading,
    isRolesLoading,
    proposalDetail,
    sectionNames,
    sectionsOrderInfo,
    isSidebarOpen,
    editQuestionsData: getEditQuestionData(state),
    selectedBid: getSelectedBid(state),
    allUnityTab: getAllUnityTab(state),
    allApprovalTab: getAllApprovalTab(state),
    allFlags: getfetchAllFlags(state),

  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getAnswerTypesDataF: getAnswerTypesInfo,
    getRolesInfoF: getRolesInfo,
    setProposalQuestionF: setProposalQuestion,
    setUnityQuestionF: setUnityQuestion,
    setEditQuestionData,
    editProposalQuestion,
    editUnityQuestion,
    deleteProposalQuestion,
    deleteUnityQuestion
  })
)(MatomoHOC(AddQuestionModal));
