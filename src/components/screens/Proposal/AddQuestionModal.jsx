// @flow
import React, { PureComponent } from 'react';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { parseDate, formatDate } from '../../../utils/DateUtils';
import Modal from '../../common/Modal';
import DatePicker from '../../common/DatePicker';
import { PrimaryButton } from '../../common/Buttons';
// import Checkbox from '../../common/Checkbox';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/TextArea';
// import SelectTeam from '../../common/SelectTeam';
import { Close } from '../../svg';
import {
  getQuestionSectionInfo,
  getAnswerTypeInfo,
  getRoles
} from '../../../selectors';
import {
  getQuestionSection,
  getAnswerTypesInfo,
  getRolesInfo
} from '../../../actions/proposal-actions';

type Props = {
  onClose: Function,
  onSave: Function,
  getQuestionSectionList: Map,
  getAnswerTypesList: Array<string>,
  getRolesList: Array<string>,
  getQuestionSectionF: Function,
  getAnswerTypesDataF: Function,
  getRolesInfoF: Function
};

type State = {
  isChecked: boolean,
  selectedDay: string
};

export class AddQuestionModal extends PureComponent<Props, State> {
  constructor(props: Object) {
    super(props);

    this.state = {
      isChecked: false,
      selectedDay: ''
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

  handleIsChecked = () => {
    const { isChecked } = this.state;
    this.setState({ isChecked: !isChecked });
  };

  handleDeleteTeam = () => {
    // TODO: Delete a team item
  };

  handleDayChange = (selectedDay: string) => {
    this.setState({
      selectedDay
    });
  };

  handleDate = (date: string, format: string) => parseDate(date, format);

  handleFormatDate = (date: Date, format: string) => formatDate(date, format);

  handleTextChange = () => {
    // TODO: Get values and make the logic
  };

  onClickChange = () => {
    // TODO: Get values and make the logic
  };

  render() {
    const { selectedDay } = this.state;
    const {
      onClose,
      onSave,
      getQuestionSectionList,
      getAnswerTypesList,
      getRolesList
    } = this.props;
    console.log(
      'DATAONSCREEN',
      getQuestionSectionList,
      getAnswerTypesList,
      getRolesList
    );

    return (
      <Modal>
        <div className="modal-content">
          <div className="modal-wrapper-title">
            <div className="modal-segment-title">
              <p className="modal-title">Add New Question</p>
              <div
                className="close-modal-icon"
                role="presentation"
                onClick={onClose}
              >
                <Close className="close-icon" />
              </div>
            </div>
            <div className="modal-subtitle">Optional Subtitle</div>
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
                  items={getAnswerTypesList}
                  title="Answer Type"
                  onClick={this.onClickChange}
                />
              </div>
              <DatePicker
                label="Date"
                selectedDay={selectedDay}
                handleDayChange={this.handleDayChange}
                handleFormatDate={this.handleFormatDate}
                handleDate={this.handleDate}
              />
            </div>
            <div className="modal-segment">
              <Dropdown
                id="dd-team-member"
                placeholder="Select"
                items={getQuestionSectionList}
                title="Question Section"
                onClick={this.onClickChange}
              />
            </div>
            <div className="modal-segment">
              <Dropdown
                id="dd-team-member"
                placeholder="Select"
                items={getRolesList}
                title="Which team member roles will answer"
                onClick={this.onClickChange}
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
                onClick={onSave}
              >
                Okay
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state: Map) => {
  const getQuestionSectionList = getQuestionSectionInfo(state);
  const getAnswerTypesList = getAnswerTypeInfo(state);
  const getRolesList = getRoles(state);
  return { getQuestionSectionList, getAnswerTypesList, getRolesList };
};

export default connect(mapStateToProps, {
  getQuestionSectionF: getQuestionSection,
  getAnswerTypesDataF: getAnswerTypesInfo,
  getRolesInfoF: getRolesInfo
})(AddQuestionModal);
