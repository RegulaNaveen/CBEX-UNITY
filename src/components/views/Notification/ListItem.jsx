import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import Typography from 'apollo-react/components/Typography';
import StatusDotSolid from 'apollo-react-icons/StatusDotSolid';
import * as notificationActions from '../../../redux/actions/notification-actions';
import EnvelopeButton from './EnvelopeButton';

const ListItem = ({
  id,
  url,
  oppNo,
  data,
  isSeen,
  setSeenOne,
  createdAt,
  jsonBody
}) => {
  const { bidNo } = jsonBody;
  const history = useHistory();
  const getYesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d;
  };
  const determineDate = createdAt => {
    const timeFormat = 'hh:mm A';
    const dateFormat = 'MMM DD';
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = getYesterday()
      .toISOString()
      .slice(0, 10);
    const toCompare = moment(createdAt).format('YYYY-MM-DD');
    if (toCompare === today) {
      return moment(createdAt).format(timeFormat);
    } else if (toCompare === yesterday) {
      return 'Yesterday';
    } else {
      return moment(createdAt).format(dateFormat);
    }
  };
  const oppNoAsHyperlink = (word: string) =>
    `<a style="display: inline-block" href='${window.location.origin}${url}'>${word}</a>`;

  const dataToHtml = () => {
    const dataArr = data.split(' ').map((word, index, arr) => {
      // Converting the sentence "Opportunity <OPP_NO> Bid <BID_NO>" to hyperlink
      if (word === 'Opportunity' && arr[index + 1] === oppNo) {
        return oppNoAsHyperlink(word);
      }
      if (word === oppNo) {
        return oppNoAsHyperlink(word);
      }
      if (
       ( word === 'Early' &&
       arr[index + 1] === 'Engagement' &&
       arr[index - 1] === oppNo) || 
       (
        word === 'Post' &&
        arr[index + 1] === 'Award' &&
        arr[index - 1] === oppNo
       ) ||
       word === 'RFI' 
      ) {
        return oppNoAsHyperlink(word);
      }
      if (word === 'Engagement' && arr[index - 1] === 'Early') {
        return oppNoAsHyperlink(word);
      }
      if (word === `${bidNo}` && arr[index - 1] === 'Engagement') {
        return oppNoAsHyperlink(word);
      }
      if (word === `${bidNo}:` && arr[index - 1] === 'Engagement') {
        return oppNoAsHyperlink(word);
      }
      if (word === 'Bid' && arr[index - 1] === oppNo) {
        return oppNoAsHyperlink(word);
      }
      if (arr[index - 1] === 'Bid' && arr[index - 2] === oppNo) {
        return oppNoAsHyperlink(word);
      }
     

      if (word === 'Award' && arr[index - 1] === 'Post') {
        return oppNoAsHyperlink(word);
      }

      if (word === `${bidNo}` && arr[index - 1] === 'Award') {
        return oppNoAsHyperlink(word);
      }

      if (word === `${bidNo}:` && arr[index - 1] === 'Award') {
        return oppNoAsHyperlink(word);
      }

      if (word === `${bidNo}` && arr[index - 1] === 'RFI') {
        return oppNoAsHyperlink(word);
      }

      if (word === `${bidNo}:` && arr[index - 1] === 'RFI') {
        return oppNoAsHyperlink(word);
      }

      return word;
    });
    dataArr.unshift('<div>');
    dataArr.push('</div>');
    return dataArr.join(' ');
  };

  return (
    <div className="notification-item">
      {/* Dot Icon */}
      {!isSeen && (
        <StatusDotSolid fontSize="small" className="notification-item-dots" />
      )}
      {/* Content */}
      <div className="notification-item-content">
        {/* Header */}
        <div className="notification-item-header">
          <Typography
            variant="body2"
            className="notification-item-header-title"
            onClick={() => {
              history.push(url);
              history.go();
            }}
          >
            {oppNo}
          </Typography>

          {/* Envelope Button */}
          <EnvelopeButton isSeen={isSeen} onClick={() => setSeenOne(id)} />
        </div>
        {/* Date */}
        <Typography variant="body2" style={{ fontSize: '10px' }}>
          {determineDate(createdAt)}
        </Typography>
        {/* Notification content */}
        <div
          className="notification-content-data"
          dangerouslySetInnerHTML={{ __html: dataToHtml() }}
        ></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: Map) => ({});
const mapDispatchToProps = {
  setSeenOne: notificationActions.setSeenOne
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
