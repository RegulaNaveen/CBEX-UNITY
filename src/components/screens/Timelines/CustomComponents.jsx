import Typography from 'apollo-react/components/Typography';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedBid } from '../../../redux/selectors/proposal';
import { parseMomentDate } from '../../../utils/DateUtils';

const CustomComponents = {
  dateCellWrapper: dateCellWrapperProps => {
    const selectedBid = useSelector(getSelectedBid)?.toJS();
    const { isCurrent } = selectedBid;

    const BidCreationDateAnnotation =
      parseMomentDate(dateCellWrapperProps.value) ===
      parseMomentDate(dateCellWrapperProps.currentBidDetails[0].bidDate);

    const BidDueDateAnnotation =
      parseMomentDate(dateCellWrapperProps.value) ===
      parseMomentDate(dateCellWrapperProps.currentBidDetails[0].bidDueDate);

    const isPastDate =
      moment(dateCellWrapperProps.value).isBefore(new Date()) &&
      !(
        parseMomentDate(dateCellWrapperProps.value) ===
        parseMomentDate(new Date())
      );

    const style = {
      display: 'flex',
      flex: 1,
      border: `${
        BidCreationDateAnnotation || BidDueDateAnnotation
          ? '1.2px solid #A9A9A9'
          : ''
      }`,
      borderLeft: `${
        BidCreationDateAnnotation || BidDueDateAnnotation
          ? '1.2px solid #A9A9A9'
          : '1px solid #DDD'
      }`,
      backgroundColor: `${isPastDate ? '#F2F2F2' : '#fff'}`
    };

    return (
      <div style={style}>
        {BidCreationDateAnnotation && (
          <Typography
            style={{
              color: '#999999',
              fontFamily: 'Proxima Nova',
              fontSize: '16px',
              fontWeight: 600,
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              textAlign: 'center'
            }}
          >
            Bid Created
          </Typography>
        )}
        {BidDueDateAnnotation && (
          <Typography
            style={{
              color: '#999999',
              fontFamily: 'Proxima Nova',
              fontSize: '16px',
              fontWeight: 600,
              alignSelf: 'flex-end',
              justifyContent: 'flex-end',
              textAlign: 'center'
            }}
          >
            Bid Due
          </Typography>
        )}
        {dateCellWrapperProps.children}
      </div>
    );
  }
};

export default CustomComponents;
