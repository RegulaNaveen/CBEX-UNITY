// @flow
import React, { PureComponent } from 'react';
import { isEmpty } from 'lodash';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
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
  getSelectedBid
} from '../../../redux/selectors';
import {
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
import Trash from 'apollo-react-icons/Trash';
import Tooltip from 'apollo-react/components/Tooltip';

type Props = {
  match: Match,
  onClose: Function,
  answerTypesList: Array<string>,
  rolesList: Array<string>,
  getAnswerTypesDataF: Function,
  getRolesInfoF: Function,
  setProposalQuestionF: Function,
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
  deleteProposalQuestion: (data: Object) => void,
  selectedBid: Map
};

type State = {
  questionText: string,
  section: Object,
  answerType: string,
  roleNames: Array<string>
};

const MSG_FIELD_REQUIRED = 'This field is required';
export class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      questionText: '',
      section: undefined,
      answerType: '',
      roleNames: [],
      error: [],
      submit: false,
      loaderText: 'Uploading Question'
    };
  }

  componentDidMount() {
    const {
      getAnswerTypesDataF,
      getRolesInfoF,
      editQuestionsData
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
    }
  }

  componentDidUpdate() {
    this.calculateHeight();
  }

  // calculate modal window position
  calculateHeight = () => {
    const modalWrapperElem = document.getElementsByClassName(
      'add-question-modal-dialog-wrapper'
    )[0];

    let wrapperTop = modalWrapperElem.getBoundingClientRect().top || null;

    if (wrapperTop < 0) {
      modalWrapperElem.style.transform = 'none';
      modalWrapperElem.style.left = 'auto';
      modalWrapperElem.style.top = 0;
    }
  };

  componentWillUnmount() {
    const { setEditQuestionData, editQuestionsData } = this.props;
    // clear Data on Edit mode
    if (editQuestionsData.size > 0) {
      setEditQuestionData({});
    }
  }

  handleTextChange = (value: string) => {
    this.setState({ questionText: value }, () => {
      this.validateQuestionText();
    });
  };

  onQuestionSectionChange = (value: string) => {
    const { sectionsOrderInfo } = this.props;
    let sectionOrder = -1;

    sectionsOrderInfo.forEach((section: Object) => {
      const { sectionOrder: order, sectionName: name } = section;
      if (name === value) sectionOrder = order;
    });

    if (sectionOrder > -1 && value)
      this.setState({ section: { sectionOrder, sectionName: value } }, () => {
        this.validateSection();
      });
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
    const { questionText } = this.state;
    if (args && args.length && questionText.trim().length == 0) {
      this.setState(
        {
          error: [...this.state.error.filter(v => !v.questiontext)]
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
      if (
        questionText.length === 0 &&
        !this.state.error.some(v => v.questiontext)
      ) {
        this.setState(prevState => ({
          error: [
            ...prevState.error,
            { questiontext: { message: MSG_FIELD_REQUIRED } }
          ]
        }));
      }
      if (
        questionText.length > 0 &&
        this.state.error.some(v => v.questiontext)
      ) {
        this.setState({
          error: [...this.state.error.filter(v => !v.questiontext)]
        });
      }
    }
  };

  validateSection = () => {
    const { section } = this.state;
    if (
      (!section || section.length === 0 || section === '') &&
      !this.state.error.some(v => v.section)
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
      this.state.error.some(v => v.section)
    ) {
      this.setState({ error: this.state.error.filter(v => !v.section) });
    }
  };

  validateAnswer = () => {
    const { answerType } = this.state;
    if (
      (!answerType || answerType.length === 0 || answerType === '') &&
      !this.state.error.some(v => v.answerType)
    ) {
      this.setState(prevState => ({
        error: [
          ...prevState.error,
          { answerType: { message: MSG_FIELD_REQUIRED } }
        ]
      }));
    }
    if (
      answerType &&
      answerType.length > 0 &&
      this.state.error.some(v => v.answerType)
    ) {
      this.setState({ error: this.state.error.filter(v => !v.answerType) });
    }
  };

  validateRoles = () => {
    const { roleNames } = this.state;
    if (
      this.state.submit &&
      isEmpty(roleNames) &&
      !this.state.error.some(v => v.roleNames)
    ) {
      this.setState(prevState => ({
        error: [
          ...prevState.error,
          { roleNames: { message: MSG_FIELD_REQUIRED } }
        ]
      }));
    }
    if (roleNames.length > 0 && this.state.error.some(v => v.roleNames)) {
      this.setState({ error: this.state.error.filter(v => !v.roleNames) });
    }
  };

  onSave = () => {
    const { questionText, section, answerType, roleNames } = this.state;
    const {
      setProposalQuestionF,
      match,
      editQuestionsData,
      editProposalQuestion,
      selectedBid
    } = this.props;
    const isEditMode = editQuestionsData.size > 0 || false;
    this.setState({ submit: true }, () => {
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
        const questionData = {
          proposalId,
          questionText,
          section,
          answerType,
          options: [],
          roleNames
        };
        this.setState(prevState => ({
          error: []
        }));
        if (isEditMode) {
          this.setState({ loaderText: 'Updating Question' });

          editProposalQuestion(
            proposalId,
            editQuestionsData.get('questionId'),
            questionData
          );
        } else {
          setProposalQuestionF(proposalId, questionData);
          this.trackMatomoEventCreateQ(questionData);
        }
      }
    });
  };

  onDelete = () => {
    const {
      deleteProposalQuestion,
      editQuestionsData,
      match,
      selectedBid
    } = this.props;
    const proposalId = selectedBid.get('id');
    this.setState({ loaderText: 'Deleting Question' });
    const res = deleteProposalQuestion(
      proposalId,
      editQuestionsData.get('questionId')
    );
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
    const { editQuestionsData } = this.props;
    const {
      questionText,
      section,
      answerType,
      roleNames,
      loaderText
    } = this.state;
    const isEditMode = editQuestionsData.size > 0 || false;
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
                error={this.state.error.filter(v => v.questiontext)}
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
                  selectedValue={isEditMode && answerType}
                  error={this.state.error.filter(v => v.answerType)}
                  onClick={this.onAnswerTypeChange}
                  disabled={isQuestionAnswered}
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
                items={sectionNames}
                selectedValue={isEditMode ? section : selectedValue}
                title="Section"
                error={this.state.error.filter(v => v.section)}
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
                error={this.state.error.filter(v => v.roleNames)}
                onClick={this.onRoleChange}
                onChange={() => {}}
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
    if (
      this.state.error &&
      this.state.error.length > 0 &&
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
    selectedBid: getSelectedBid(state)
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getAnswerTypesDataF: getAnswerTypesInfo,
    getRolesInfoF: getRolesInfo,
    setProposalQuestionF: setProposalQuestion,
    setEditQuestionData,
    editProposalQuestion,
    deleteProposalQuestion
  })
)(MatomoHOC(AddQuestionModal));
