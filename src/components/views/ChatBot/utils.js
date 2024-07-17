import jwt_decode from 'jwt-decode';
import { getAccessTokenFromLocalStorage } from '../../../SessionHandler';
import moment from 'moment';

function sanitizeResponse(response, prefix = null) {
  let sanitizedResponse = response;
  if (prefix) {
    sanitizedResponse = sanitizedResponse.replace(
      new RegExp(`^${prefix}:`),
      ''
    );
  }
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
          answer: bubbles[i + 1].children
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
      if (item.result) {
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
  let page = '';

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
        }
      } else {
        title = source.metadata.source || '';
        page = source.metadata.page || '';
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

  return { title, content, page };
}

export {
  sanitizeResponse,
  extractBidInfo,
  extractContext,
  getContentAsText,
  getSourceDocTooltipInfo
};
