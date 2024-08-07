import jwt_decode from 'jwt-decode';
import { getAccessTokenFromLocalStorage } from '../../../SessionHandler';
import moment from 'moment';

function parseQuestionReference(response) {
  // find if response has : and then extract the text before it
  let questionReference = '';
  if (response.includes(':')) {
    questionReference = response.split(':')[0];
  }
  // check if questionReference is empty and if empty continue to check if it has ? and extract the text before it
  if (!questionReference && response.includes('?')) {
    questionReference = response.split('?')[0];
  }
  // if questionReference is not empty and it's first character is ' then remove it
  if (questionReference && questionReference[0] === "'") {
    questionReference = questionReference.slice(1);
  }
  // if questionReference is not empty and it's last character is ' then remove it
  if (
    questionReference &&
    questionReference[questionReference.length - 1] === "'"
  ) {
    questionReference = questionReference.slice(0, -1);
  }
  // check if questionReference is still empty, set it to response and return
  if (!questionReference) {
    questionReference = response;
  }

  return questionReference;
}

function sanitizeResponse(response, prefix = null) {
  let sanitizedResponse = response;
  if (prefix) {
    sanitizedResponse = sanitizedResponse.replace(
      new RegExp(`^${prefix}:`),
      ''
    );
  }
  sanitizedResponse = sanitizedResponse.replaceAll(/\\n/g, '\n');
  sanitizedResponse = sanitizedResponse.split(/\n/).join(' ');
  return sanitizedResponse.trim();
}

function extractBidInfo(bidNo) {
  let targetBidType = '';
  let targetBidNumber = '';

  if (bidNo.startsWith('RFI_')) {
    targetBidType = 'RFI_Request';
    targetBidNumber = bidNo.slice(4);
  } else if (bidNo.startsWith('PA_')) {
    targetBidType = 'Post_Award_Bid';
    targetBidNumber = bidNo.slice(3);
  } else if (bidNo.startsWith('EE_')) {
    targetBidType = 'Early_Engagement_Bid';
    targetBidNumber = bidNo.slice(3);
  } else {
    targetBidType = 'Clinical_Bid';
    targetBidNumber = bidNo;
  }

  return { targetBidNumber, targetBidType };
}

function getAnswerAsText(answer) {
  if (Array.isArray(answer)) {
    return answer.reduce((acc, item, idx) => {
      if (idx === 0) return acc + item.result;
      else return acc + '\n' + item.result;
    }, '');
  } else {
    return answer;
  }
}

function extractContext(bubbles, maxNumOfCount) {
  const context = [];
  let count = 0;
  if (!bubbles) return [];
  if (bubbles[bubbles.length - 1] && bubbles[bubbles.length - 1].is_ecoa_or_cd)
    return [];
  if (
    bubbles[bubbles.length - 1].type &&
    bubbles[bubbles.length - 1].type === 'WELCOME_MSG'
  )
    return [];
  const lastHistory = bubbles[bubbles.length - 1];
  const tokenInfo = jwt_decode(getAccessTokenFromLocalStorage());
  const isLastChatHappenedInCurrentSession = moment(
    new Date(lastHistory.sentOrReceivedAt)
  ).isBetween(
    moment(new Date(tokenInfo.auth_time * 1000)),
    moment(new Date(tokenInfo.exp * 1000))
  );
  if (!isLastChatHappenedInCurrentSession) {
    return [];
  }
  for (let i = bubbles.length - 2; i >= 0; i -= 2) {
    if (count >= maxNumOfCount) break;

    if (
      bubbles[bubbles.length - 1] &&
      bubbles[bubbles.length - 1].is_ecoa_or_cd
    )
      break;

    const bubble = bubbles[i];
    if (bubble)
      if (bubble.variant === 'user') {
        context.push({
          question: bubble.children,
          answer: getAnswerAsText(bubbles[i + 1].children)
        });
        count++;
      }
  }

  return context;
}

function getContentAsText(content) {
  if (Array.isArray(content)) {
    let text = '';
    content.forEach((item, idx, arr) => {
      if (typeof item.result === 'string' && item.result.length > 0) {
        if (arr.length > 1) {
          text += `${idx + 1}. `;
        }
        text += `${getContentAsText(item.result)}`;
        if (arr.length > 1) {
          text += `\n`;
        }
      }
    });
    return text;
  } else if (typeof content === 'object') {
    return content.text;
  } else {
    return content;
  }
}

function getSourceDocTooltipInfo(source) {
  let title = '';
  let content = '';
  let subtitle = '';

  if (source) {
    if (source.metadata && source.metadata.doc_class) {
      if (source.metadata.doc_class.toLowerCase() === 'unity') {
        title = 'Unity';
        if (
          source.metadata.section_name &&
          source.metadata.section_name.toLowerCase() === 'notepad'
        ) {
          title = 'Unity Notepad';
        } else if (
          source.metadata.section_name &&
          source.metadata.section_name.toLowerCase() === 'questions'
        ) {
          title = 'Unity Question';
        } else if (
          source.metadata.section_name &&
          source.metadata.section_name.toLowerCase() === 'pricemodular'
        ) {
          title = 'Unity';
          subtitle = 'Retrieved from price modeler section';
        } else {
          title = 'Unity';
          subtitle = 'Retrieved from opportunity info';
        }
      } else {
        title = source.metadata.source || '';
        subtitle = source.metadata.page ? `Page: ${source.metadata.page}` : '';
        if (
          source.metadata.box_file_id &&
          source.metadata.box_file_id.trim() &&
          !Number.isNaN(Number(source.metadata.box_file_id))
        ) {
          title = source.metadata.source.split('/').slice(-1)[0] || '';
        }
      }
    }
    if (source.page_content) {
      content = source.page_content;
    }
  }

  return { title, content, subtitle };
}

function isConnected(socket) {
  if (socket instanceof WebSocket) {
    return socket.readyState === WebSocket.OPEN;
  } else {
    console.info('[CHATBOT] socket is not an instance of WebSocket Object.');
    return null;
  }
}

function isConnecting(socket) {
  if (socket instanceof WebSocket) {
    return socket.readyState === WebSocket.CONNECTING;
  } else {
    console.info('[CHATBOT] socket is not an instance of WebSocket Object.');
    return null;
  }
}

async function sendWSMsgWithRetry(
  socket,
  message,
  initiateConnection,
  attempt = 0
) {
  if (attempt <= 10) {
    try {
      if (isConnected(socket)) {
        socket.send(message);
        return Promise.resolve(socket);
      } else if (isConnecting(socket)) {
        console.info(`[CHATBOT] Waiting for ${(1000 * (attempt + 1)) / 1000}s`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        console.info(`[CHATBOT] Retrying...`);
        return await sendWSMsgWithRetry(
          socket,
          message,
          initiateConnection,
          attempt++
        );
      } else {
        // Either WebSocket.CLOSING or WebSocket.CLOSED
        // Reconnect and retry again
        console.info(`[CHATBOT] Waiting for ${(1000 * (attempt + 1)) / 1000}s`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        console.info(`[CHATBOT] Retrying...`);
        return await sendWSMsgWithRetry(
          initiateConnection(),
          message,
          initiateConnection,
          attempt++
        );
      }
    } catch (e) {
      console.info('[CHATBOT] Error in sending msg through Websocket: ', e);
      return Promise.resolve(null);
    }
  } else {
    console.info(
      '[CHATBOT] Maximum retry achieved. Could not send msg through WebSocket.'
    );
    return Promise.resolve(null);
  }
}

export {
  parseQuestionReference,
  sanitizeResponse,
  extractBidInfo,
  extractContext,
  getContentAsText,
  getSourceDocTooltipInfo,
  sendWSMsgWithRetry
};
