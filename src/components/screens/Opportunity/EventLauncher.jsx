import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import CalendarEvent from 'apollo-react-icons/CalendarEvent';
import Tooltip from 'apollo-react/components/Tooltip';
import Radio from 'apollo-react/components/Radio';
import RadioGroup from 'apollo-react/components/RadioGroup';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import IconButton from 'apollo-react/components/IconButton';
import moment from 'moment';

import CustomModal from '../../common/CustomModal';
import { DEFAULT, PROPOSAL } from '../../../constants/app';
import {
  avoidSpecialChars,
  extractEmails,
  parseStringifyJson
} from '../../../utils/helpers';
import { selectProposalQuestions } from '../../../redux/selectors/proposal';

const modalStyle = { maxWidth: 545, width: '100%' };
const attendees = [
  'Pre-defined event roles',
  'All Roles associated with opportunity'
];

const EventLauncher = ({ questionData }) => {
  const quesData = questionData?.toJS();
  const hasEvent = quesData?.events && !isEmpty(quesData?.events);
  const eventStartDate = quesData?.answers[0]?.answer;

  // Component will return null if no event found
  if (!hasEvent) return null;

  // Get proposalQuestions - Redux State
  const proposalQuestions = useSelector(selectProposalQuestions);
  const eventData = parseStringifyJson(quesData?.events);

  // Component State
  const [openModal, setOpenModal] = useState(false);
  const [attendeesVal, setAttendeesVal] = React.useState(attendees[0]);

  const proposalTeam = useMemo(() => {
    if (!openModal) return []; // break func
    const team = [];
    proposalQuestions.forEach(item => {
      const { section, answers, roleNames, isCustomQuestion, active } = item;
      const { sectionName } = section;
      if (sectionName === 'Proposal Team') {
        const visible =
          item.visible === true &&
          (active === true || isCustomQuestion === true);
        const email = [
          ...new Set(
            answers
              .map(({ answer }) => answer.trim().split(','))
              .flat()
              .map(i => extractEmails(i))
              .filter(i => !isEmpty(i))
          )
        ];

        if (
          !isEmpty(email) &&
          !isEmpty(roleNames) &&
          (visible || typeof visible === 'undefined')
        ) {
          team.push({ email, roleNames });
        }
      }
    });
    return team;
  }, [openModal]);

  const filteredEmails = useMemo(() => {
    if (isEmpty(proposalTeam)) return []; // break func
    const { EventRoles: eventRoles } = eventData;
    // onChange attendees value
    if (attendeesVal === attendees[0]) {
      const filteredTeam = proposalTeam.filter(i =>
        i.roleNames.some(role => eventRoles.includes(role))
      );
      return [...new Set(filteredTeam.map(i => i.email).flat())];
    }
    return [...new Set(proposalTeam.map(i => i.email).flat())];
  }, [openModal, attendeesVal]);

  /**
   * Generate Event Url Function
   */
  const generateEventUrl = (startDate, endDate, body, subject, email) => {
    // console.log({ startDate, endDate, body, subject, email });
    const bodyStr = avoidSpecialChars(body);
    const subjectStr = avoidSpecialChars(subject);
    return `https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose%20&rru=addevent&startdt=${startDate}&enddt=${endDate}&body=${bodyStr}&subject=${subjectStr}&to=${email}&online=1`;
  };

  const checkDateAge = date => {
    const formatedDt = moment(date).format('YYYY-MM-DD');
    if (moment(formatedDt).isSame(moment(), 'day')) return 'today';
    if (moment(formatedDt).isAfter(moment(), 'day')) return 'future';
    if (moment(formatedDt).isBefore(moment(), 'day')) return null;
    return null;
  };

  const launchButtonHandler = () => {
    const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
    const { EventBody: body, EventSubject: subject } = eventData;
    const dateAge = checkDateAge(eventStartDate);
    const formatedDt = moment(eventStartDate).format('YYYY-MM-DD');

    let startDate = `${formatedDt}T08:00:00`;
    if (dateAge === 'today') {
      startDate = moment()
        .add(60, 'minutes')
        .startOf('hour')
        .format(dateTimeFormat);
    }
    const endDate = moment(startDate)
      .add(1, 'hours')
      .format(dateTimeFormat);

    // Calling generateEventUrl func
    const url = generateEventUrl(
      startDate,
      endDate,
      body,
      subject,
      filteredEmails.join(', ')
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Event Modal
  const eventLauncherModal = openModal && (
    <CustomModal
      open={openModal}
      title={PROPOSAL.EVENT_LAUNCHER}
      className="event-launcher__modal"
      onClose={() => setOpenModal(prev => !prev)}
      buttonProps={[
        { className: 'display-none' },
        {
          label: PROPOSAL.LAUNCH_OUTLOOK,
          disabled: isEmpty(filteredEmails),
          onClick: launchButtonHandler
        }
      ]}
      modalStyle={modalStyle}
    >
      <i className="content-heading">{PROPOSAL.SELECT_VARIABLES}</i>

      <RadioGroup
        label={PROPOSAL.ATTENDEES}
        aria-label="attendees"
        name="attendees"
        value={attendeesVal}
        onChange={e => setAttendeesVal(e.target.value)}
        error={isEmpty(filteredEmails)}
        helperText={
          isEmpty(filteredEmails)
            ? "Doesen't have valid email id for this option"
            : ''
        }
      >
        {attendees.map(item => (
          <Radio value={item} label={item} />
        ))}
      </RadioGroup>
    </CustomModal>
  );

  return (
    <div className="event-launcher">
      <Tooltip
        variant="light"
        tabIndex={-1}
        placement="top"
        title={
          <div className="event-launcher__tooltip">
            <h3>{PROPOSAL.EVENT_LAUNCHER}</h3>
            <h4>{DEFAULT.CLICK_ICON_TO_BEGIN}</h4>
          </div>
        }
      >
        <span>
          <IconButton
            className="event-launcher__tooltip-btn"
            disabled={
              isEmpty(quesData?.answers) || !checkDateAge(eventStartDate)
            }
            onClick={() => setOpenModal(true)}
          >
            <CalendarEvent />
          </IconButton>
        </span>
      </Tooltip>

      {/* Call Event Modal */}
      {eventLauncherModal}
    </div>
  );
};

EventLauncher.propTypes = {
  questionData: PropTypes.object.isRequired
};

export default EventLauncher;
