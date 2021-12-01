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
  getIsOpen
} from '../../../redux/selectors';
import {
  selectSectionNames,
  selectSectionOrderInfo
} from '../../../redux/selectors/proposal';
import {
  getAnswerTypesInfo,
  getRolesInfo,
  setProposalQuestion
} from '../../../redux/actions/proposal-actions';
import MatomoHOC from '../../HOC/MatomoHOC';

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
  isSidebarOpen: boolean
};

type State = {
  questionText: string,
  section: Object,
  answerType: string,
  roleNames: Array<string>
};

export class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      questionText: '',
      section: undefined,
      answerType: '',
      roleNames: [],
      error: [],
      submit: false
    };
  }

  componentDidMount() {
    const { getAnswerTypesDataF, getRolesInfoF } = this.props;
    getAnswerTypesDataF();
    getRolesInfoF();
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

  validateQuestionText = () => {
    const { questionText } = this.state;
    if (
      questionText.length === 0 &&
      !this.state.error.some(v => v.questiontext)
    ) {
      this.setState(prevState => ({
        error: [
          ...prevState.error,
          { questiontext: { message: 'This field is required.' } }
        ]
      }));
    }
    if (questionText.length > 0 && this.state.error.some(v => v.questiontext)) {
      this.setState({
        error: [...this.state.error.filter(v => !v.questiontext)]
      });
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
          { section: { message: 'This field is required.' } }
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
          { answerType: { message: 'This field is required.' } }
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
          { roleNames: { message: 'This field is required.' } }
        ]
      }));
    }
    if (roleNames.length > 0 && this.state.error.some(v => v.roleNames)) {
      this.setState({ error: this.state.error.filter(v => !v.roleNames) });
    }
  };

  onSave = () => {
    const { questionText, section, answerType, roleNames } = this.state;
    const { setProposalQuestionF, match } = this.props;
    this.setState({ submit: true }, () => {
      this.validateQuestionText();
      this.validateSection();
      this.validateAnswer();
      this.validateRoles();

      if (
        questionText !== '' &&
        questionText.length > 0 &&
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
        this.setState(prevState => ({
          error: []
        }));
        setProposalQuestionF(proposalId, questionData);
        this.trackMatomoEventCreateQ(questionData);
      }
    });
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
    if(rolesList) rolesList = rolesList.sort();
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
                placeholder="Question text"
                title="Enter Question Text"
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
                  error={this.state.error.filter(v => v.answerType)}
                  onClick={this.onAnswerTypeChange}
                />
              </div>
            </div>
            <div className="modal-segment">
              <Dropdown
                id="dd-team-member"
                placeholder="Select"
                items={sectionNames}
                selectedValue={selectedValue}
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
                error={this.state.error.filter(v => v.roleNames)}
                onClick={this.onRoleChange}
              />
            </div>
          </div>
          <div className="modal-wrapper-footer">
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
    isSidebarOpen
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getAnswerTypesDataF: getAnswerTypesInfo,
    getRolesInfoF: getRolesInfo,
    setProposalQuestionF: setProposalQuestion
  })
)(MatomoHOC(AddQuestionModal));
