import Typography from 'apollo-react/components/Typography';
import React from 'react';
import { parseMomentDate } from '../../../utils/DateUtils';

const CustomComponents = {
  dateCellWrapper: dateCellWrapperProps => {
    const BidCreationDateAnnotation =
      parseMomentDate(dateCellWrapperProps.value) ===
      parseMomentDate(dateCellWrapperProps.currentBidDetails[0].bidDate);

    const BidDueDateAnnotation =
      parseMomentDate(dateCellWrapperProps.value) ===
      parseMomentDate(dateCellWrapperProps.currentBidDetails[0].bidDueDate);

    const style = {
      display: 'flex',
      flex: 1,
      borderLeft: '1px solid #DDD',
      backgroundColor: '#fff'
    };

    return (
      <div style={style}>
        {BidCreationDateAnnotation && (
          <Typography
            varient="h4"
            style={{
              color: '#999999',
              fontFamily: 'Proxima Nova',
              fontSize: '20px',
              fontWeight: 600,
              alignSelf: 'flex-end',
              justifyContent: 'center'
            }}
          >
            Bid Created
          </Typography>
        )}
        {BidDueDateAnnotation && (
          <Typography
            varient="h4"
            style={{
              color: '#999999',
              fontFamily: 'Proxima Nova',
              fontSize: '20px',
              fontWeight: 600,
              alignSelf: 'flex-end',
              justifyContent: 'center'
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
