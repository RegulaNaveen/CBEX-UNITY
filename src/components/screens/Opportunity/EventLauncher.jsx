import React, { useState } from 'react';
import CalendarEvent from 'apollo-react-icons/CalendarEvent';
import Tooltip from 'apollo-react/components/Tooltip';
import Checkbox from 'apollo-react/components/Checkbox';
import CheckboxGroup from 'apollo-react/components/CheckboxGroup';
import isEmpty from 'lodash/isEmpty';

import CustomModal from '../../common/CustomModal';
import { PROPOSAL } from '../../../constants/app';
import { parseStringifyJson } from '../../../utils/helpers';

const modalStyle = { maxWidth: 545, width: '100%' };

const EventLauncher = ({ questionData }) => {
  // Cmponent State
  const [openModal, setOpenModal] = useState(false);
  const [value, setValue] = React.useState(['Core Team']);

  const quesData = questionData?.toJS();
  const hasEvent = quesData?.events && !isEmpty(quesData?.events);

  /**
   * Generate Event Url Function
   */
  const generateEventUrl = (startdate, enddate, body, subject, email) => {
    return `https://outlook.office.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose%20&rru=addevent&startdt=${startdate}&enddt=${enddate}&body=${body}&subject=${subject}&to=${email}&online=1`;
  };

  const handleChange = e => {
    setValue(e.target.value);
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
          label: 'Launch Outlook',
          disabled: false,
          onClick: () => {}
        }
      ]}
      modalStyle={modalStyle}
    >
      {console.log({ quesEvent: parseStringifyJson(quesData?.events) })}
      <i className="content-heading">Select Variables</i>
      <CheckboxGroup label="Attendees" value={value} onChange={handleChange}>
        <Checkbox value="Core Team" label="Core Team" />
        <Checkbox value="Whole Team" label="Whole Team" />
      </CheckboxGroup>
    </CustomModal>
  );

  // Component will return null if event not found
  if (!hasEvent) {
    return null;
  }

  return (
    <div className="event-launcher">
      <Tooltip
        variant="light"
        tabIndex={-1}
        placement="top"
        title={
          <div className="event-launcher__tooltip">
            <h3>Event Launcher</h3>
            <h4>Click icon to begin</h4>
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

export default EventLauncher;
