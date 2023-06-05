import React from 'react';
import EmailRead from 'apollo-react-icons/EmailRead';
import Email from 'apollo-react-icons/Email';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    "&:before": {
      border: '1px solid #dadde9',
    },
    color: theme.palette.common.white
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    border: '1px solid #dadde9',
    fontSize: theme.typography.pxToRem(13),
  },
}));

const EnvelopeButton = ({ isSeen, onClick }) => {
  const read = (
    <LightTooltip arrow title="read" placement="top">
      <EmailRead
        className="envelope-icon"
        data-testid="envelope-read"
        onClick={() => onClick()}
      />
    </LightTooltip>
  );
  const unread = (
    <LightTooltip arrow title="Mark as read" placement="top">
      <Email
        className="envelope-icon"
        data-testid="envelope-unread"
        onClick={() => onClick()}
      />
    </LightTooltip>
  );
  return isSeen ? read : unread;
};

export default EnvelopeButton;
