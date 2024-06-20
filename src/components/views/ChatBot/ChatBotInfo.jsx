import React from 'react';
import Link from 'apollo-react/components/Link';
import Typography from 'apollo-react/components/Typography';

const ChatBotInfo = ({ className = 'chat-bot-info' }) => (
  <div className={className}>
    <Typography variant="bodySmall">
      {'BidAssist uses AI. Check for errors.'}
    </Typography>
  </div>
);

export default ChatBotInfo;
