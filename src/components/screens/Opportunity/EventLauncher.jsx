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
import { extractEmails, parseStringifyJson } from '../../../utils/helpers';
import {
  getSelectedBid,
  selectProposalQuestions
} from '../../../redux/selectors/proposal';
import { getUserData } from '../../../redux/selectors';
import { updateEventSubjectBody } from '../../../utils/utils';

const modalStyle = { maxWidth: 545, width: '100%' };
const attendees = ['Expected team members', 'All assigned team members'];

const EventLauncher = ({
  questionData,
  proposalDetail,
  trackMatomoEventLauncher
}) => {
  const [bodyStr, setBodyStr] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const quesData = questionData?.toJS();
  const hasEvent = quesData?.events && !isEmpty(quesData?.events);
  const eventStartDate = !isEmpty(quesData?.answers)
    ? [...quesData?.answers].pop()?.answer
    : '';
  const userData = useSelector(getUserData);
  const allFlags = useSelector(state => state.proposal.get('eventflag'));
  const eventFlag = allFlags.eventLauncher || false;

  const { isCurrent } = useSelector(getSelectedBid)?.toJS();

  // Component will return null if no event found
  if (!hasEvent || !eventFlag || !isCurrent) return null;

  // Get proposalQuestions - Redux State
  const proposalQuestions = useSelector(selectProposalQuestions);
  const eventData = parseStringifyJson(quesData?.events);

  const bodytoHtml = eventData?.EventBody;
  const eventSubject = eventData?.EventSubject;

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

        let email = [];
        if (!isEmpty(answers)) {
          const { answer } = [...answers].pop();
          if (!isEmpty(answer.trim())) {
            email = [
              ...new Set(
                answer
                  .trim()
                  .split(',')
                  .map(i => extractEmails(i))
                  .filter(i => i !== null)
              )
            ];
          }
        }

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
    const updatedBody = updateEventSubjectBody(body, proposalDetail);
    const updatedSubject = updateEventSubjectBody(subject, proposalDetail);
    setBodyStr(updatedBody);
    const subjectStr = encodeURIComponent(
      updatedSubject.replace(new RegExp('\\n', 'g'), '<br />')
    );
    return `https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose%20&rru=addevent&startdt=${startDate}&enddt=${endDate}&to=${email}&.&subject=${subjectStr}&body=Unity%20has%20copied%20your%20invite%20details%20to%20your%20clipboard.%20Press%20Control%20%2B%20V%20to%20paste%20this%20content%20to%20include%20it%20in%20your%20meeting%20invite%20and%20share%20it%20with%20your%20team.&online=1`;
  };

  const checkDateAge = date => {
    const formattedDt = moment(date).format('YYYY-MM-DD');
    if (moment(formattedDt).isSame(moment(), 'day')) return 'today';
    if (moment(formattedDt).isAfter(moment(), 'day')) return 'future';
    if (moment(formattedDt).isBefore(moment(), 'day')) return null;
    return null;
  };

  const copyToClipboardAndOpenModal = async () => {
    try {
      const updatedBody = updateEventSubjectBody(bodytoHtml, proposalDetail);
      const blob = new Blob([updatedBody], { type: 'text/html' });
      const clipboardItem = new window.ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      setOpenModal(true);
    } catch (error) {
      console.log('Error copy email body to clipboard ', error);
    }
  };

  const launchRichTextButtonHandler = () => {
    const dateTimeFormat = 'YYYY-MM-DDTHH:mm:ss';
    const { EventBody: body, EventSubject: subject } = eventData;
    const dateAge = checkDateAge(eventStartDate);
    const formattedDt = moment(eventStartDate).format('YYYY-MM-DD');
    let startDate = `${formattedDt}T08:00:00`;
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
    const geturl = generateEventUrl(
      startDate,
      endDate,
      body,
      subject,
      filteredEmails.join(', ')
    );

    const trackEventPayload = {
      action: `Event Launched : ${subject} : ${body}`,
      customDimensions: [
        {
          id: 1,
          value: JSON.stringify({
            proposalDetail,
            questionText: quesData?.questionText,
            userData,
            event: quesData?.events,
            startDate,
            endDate
          })
        }
      ]
    };
    trackMatomoEventLauncher(trackEventPayload);
    window.open(geturl, '_blank', 'noopener,noreferrer');
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
          onClick: launchRichTextButtonHandler
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
          <Radio value={item} key={item} label={item} />
        ))}
      </RadioGroup>
    </CustomModal>
  );

  const eventIcon = (
    <IconButton
      className="event-launcher__tooltip-btn"
      disabled={isEmpty(eventStartDate.trim())}
      onClick={() => copyToClipboardAndOpenModal()}
    >
      <CalendarEvent />
    </IconButton>
  );

  return (
    <div className="event-launcher">
      {!isEmpty(eventStartDate.trim()) && !isEmpty(eventSubject.trim()) && (
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
          <span>{eventIcon}</span>
        </Tooltip>
      )}

      {/* Call Event Modal */}
      {eventLauncherModal}
    </div>
  );
};

EventLauncher.propTypes = {
  questionData: PropTypes.object.isRequired
};

export default EventLauncher;
