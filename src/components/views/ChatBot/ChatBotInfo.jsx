import React from 'react';
import { Link } from '@mui/material';
import Typography from 'apollo-react/components/Typography';

const ChatBotInfo = ({ className = 'chat-bot-info' }) => (
  <div className={className}>
    <Typography variant="bodySmall">
      {'BidAssist uses AI; please check for errors. View'}
    </Typography>

    <Typography variant="bodySmall">
      {' '}
      <Link
        href="https://quintiles.sharepoint.com/sites/ltc/CBEx/SitePages/ChatAssist-FAQs.aspx"
        size="smaller"
        className="chat-bot-info-link"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        {' '}
        {'FAQ.'}
      </Link>
    </Typography>
  </div>
);

export default ChatBotInfo;
