function sanitizeResponse(response, prefix = null) {
  let sanitizedResponse = response;
  if (prefix) {
    sanitizedResponse = sanitizedResponse.replace(
      new RegExp(`^${prefix}:`),
      ''
    );
  }
  sanitizedResponse = sanitizedResponse.replace('\n', ' ');
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
  if (!bubbles) return context;
  if (bubbles[bubbles.length - 1] && bubbles[bubbles.length - 1].is_ecoa_or_cd)
    return context;
  if (
    bubbles[bubbles.length - 1].type &&
    bubbles[bubbles.length - 1].type === 'WELCOME_MSG'
  )
    return context;
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
      } else {
        title = source.metadata.source || '';
        page = source.metadata.page || '';
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
