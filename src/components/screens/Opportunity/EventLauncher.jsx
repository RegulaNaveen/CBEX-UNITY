import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CalendarEvent from 'apollo-react-icons/CalendarEvent';
import Tooltip from 'apollo-react/components/Tooltip';
import Radio from 'apollo-react/components/Radio';
import RadioGroup from 'apollo-react/components/RadioGroup';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import CustomModal from '../../common/CustomModal';
import { DEFAULT, PROPOSAL } from '../../../constants/app';
import { parseStringifyJson } from '../../../utils/helpers';
import { selectProposalQuestions } from '../../../redux/selectors/proposal';

const modalStyle = { maxWidth: 545, width: '100%' };
const attendees = [
  'Pre-defined event roles',
  'All Roles associated with opportunity'
];

const EventLauncher = ({ questionData }) => {
  const quesData = questionData?.toJS();
  const hasEvent = quesData?.events && !isEmpty(quesData?.events);

  // Component will return null if no event found
  if (!hasEvent) {
    return null;
  }

  // Get proposalQuestions - Redux State
  const proposalQuestions = useSelector(selectProposalQuestions);

  // Component State
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = React.useState(attendees[0]);
  // const [proposalTeam, setProposalTeam] = React.useState([]);

  // Get Proposal Team Section Data
  const proposalTeam = [];
  if (openModal) {
    proposalQuestions.forEach(item => {
      const { section, answers, roleNames, isCustomQuestion, active } = item;
      const { sectionName } = section;
      const visible =
        item.visible === true && (active === true || isCustomQuestion === true);
      if (
        sectionName === 'Proposal Team' &&
        !isEmpty(answers) &&
        !isEmpty(roleNames) &&
        (visible || typeof visible === 'undefined')
      ) {
        proposalTeam.push({
          userEmail: answers.map(({ user }) => user),
          roleNames
        });
      }
    });
  }
  console.log({ proposalTeam });

  /**
   * Generate Event Url Function
   */
  // const generateEventUrl = (startdate, enddate, body, subject, email) => {
  //   return `https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose%20&rru=addevent&startdt=${startdate}&enddt=${enddate}&body=${body}&subject=${subject}&to=${email}&online=1`;
  // };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const url = `https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose &rru=addevent&startdt=2022-07-31T19:30:00Z&enddt=2022-07-31T22:30:00Z&body=%27%0A%3Cstyle%3E%0Atable,%20th,%20td%20%7B%0A%20%20border:%201px%20solid%20black;%0A%20%20border-collapse:%20collapse;%0A%7D%0Ath,%20td%20%7B%0A%20%20padding:%205px;%0A%7D%0A%3C/style%3E%0A%0A%3Ch2%3ESample%20HTML%3C/h2%3E%0A%3Cp%3ELists%20can%20be%20nested%20(list%20inside%20list):%3C/p%3E%0A%0A%3Cul%3E%0A%20%20%3Cli%3ECoffee%3C/li%3E%0A%20%20%3Cli%3ETea%0A%20%20%20%20%3Cul%3E%0A%20%20%20%20%20%20%3Cli%3EBlack%20tea%3C/li%3E%0A%20%20%20%20%20%20%3Cli%3EGreen%20tea%3C/li%3E%0A%20%20%20%20%3C/ul%3E%0A%20%20%3C/li%3E%0A%20%20%3Cli%3EMilk%3C/li%3E%0A%3C/ul%3E%0A%3Cbr/%3E%0A%3Ctable%3E%0A%20%20%3Ctr%3E%0A%20%20%20%20%3Ctd%3E%0A%20%20%20%20%20%20%3Cp%3EThis%20is%20a%20paragraph%3C/p%3E%0A%20%20%20%20%20%20%3Cp%3EThis%20is%20another%20paragraph%3C/p%3E%0A%20%20%20%20%3C/td%3E%0A%20%20%20%20%3Ctd%3EThis%20cell%20contains%20a%20table:%0A%20%20%20%20%20%20%3Ctable%3E%0A%20%20%20%20%20%20%20%20%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%3EA%3C/td%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%3EB%3C/td%3E%0A%20%20%20%20%20%20%20%20%3C/tr%3E%0A%20%20%20%20%20%20%20%20%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%3EC%3C/td%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%3ED%3C/td%3E%0A%20%20%20%20%20%20%20%20%3C/tr%3E%0A%20%20%20%20%20%20%3C/table%3E%0A%20%20%20%20%3C/td%3E%0A%20%20%3C/tr%3E%0A%20%20%3Ctr%3E%0A%20%20%20%20%3Ctd%3EThis%20cell%20contains%20a%20list%0A%20%20%20%20%20%20%3Cul%3E%0A%20%20%20%20%20%20%20%20%3Cli%3Eapples%3C/li%3E%0A%20%20%20%20%20%20%20%20%3Cli%3Ebananas%3C/li%3E%0A%20%20%20%20%20%20%20%20%3Cli%3Epineapples%3C/li%3E%0A%20%20%20%20%20%20%3C/ul%3E%0A%20%20%20%20%3C/td%3E%0A%20%20%20%20%3Ctd%3EHELLO%3C/td%3E%0A%20%20%3C/tr%3E%0A%3C/table%3E%0A%27&subject=subject&to=sudhakar@iqvia.com, roopesh@iqvia.com&cc=sudhakar@iqvia.com&online=1`;

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
          disabled: false,
          onClick: () => window.open(url, '_blank', 'noopener,noreferrer')
        }
      ]}
      modalStyle={modalStyle}
    >
      {console.log({ quesEvent: parseStringifyJson(quesData?.events) })}
      <i className="content-heading">{PROPOSAL.SELECT_VARIABLES}</i>

      <RadioGroup
        label={PROPOSAL.ATTENDEES}
        aria-label="attendees"
        name="attendees"
        value={value}
        onChange={handleChange}
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
          <CalendarEvent onClick={() => setOpenModal(true)} />
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
