import React from 'react';
import Link from 'apollo-react/components/Link';
import Typography from 'apollo-react/components/Typography';

const ChatBotInfo = ({ className = 'chat-bot-info' }) => (
  <div className={className}>
    <Typography variant="bodySmall">
      {'BidAssist uses AI. Check for errors.'}
    </Typography>
    <Link
      href="#"
      onClick={() => {
        console.log('You clicked Terms of use');
      }}
      size="smaller"
      className="chat-bot-info-link"
    >
      <Typography variant="bodySmall"> {'Terms of Use'} </Typography>
    </Link>
    <Typography variant="bodySmall">{'|'}</Typography>
    <Link
      href="#"
      onClick={() => {
        console.log('You clicked Privacy Policy');
      }}
      size="small"
      className="chat-bot-info-link"
    >
      <Typography variant="bodySmall">Privacy Policy</Typography>
    </Link>
  </div>
);

export default ChatBotInfo;
