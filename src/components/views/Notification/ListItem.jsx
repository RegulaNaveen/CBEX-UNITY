import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Typography from 'apollo-react/components/Typography';
import StatusDotSolid from 'apollo-react-icons/StatusDotSolid';
import * as notificationActions from '../../../redux/actions/notification-actions';
import EnvelopeButton from './EnvelopeButton';

const ListItem = ({ id, url, oppNo, data, isSeen, setSeenOne, createdAt }) => {
  const determineDate = createdAt => {
    const timeFormat = 'hh:mm A';
    const dateFormat = 'MMM DD';
    const today = new Date().toISOString().slice(0, 10);
    const toCompare = moment(createdAt).format('YYYY-MM-DD');
    return today === toCompare
      ? moment(createdAt).format(timeFormat)
      : moment(createdAt).format(dateFormat);
  };
  return (
    <div className='notification-item'>
      {/* Dot Icon */}
      <StatusDotSolid fontSize='small' className='notification-item-dot' />
      {/* Content */}
      <div className='notification-item-content'>
        {/* Header */}
        <div className='notification-item-header'>
          <Typography
            variant='body2'
            className='notification-item-header-title'
          >
            {oppNo}
          </Typography>
          {/* Envelope Button */}
          <EnvelopeButton isSeen={isSeen} onClick={() => setSeenOne(id)} />
        </div>
        {/* Date */}
        <Typography variant='body2' style={{ fontSize: '10px' }}>
          {determineDate(createdAt)}
        </Typography>
        {/* Notification content */}
        <div>
          <div className='notification-content-data'>{data}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: Map) => ({});
const mapDispatchToProps = {
  setSeenOne: notificationActions.setSeenOne
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
