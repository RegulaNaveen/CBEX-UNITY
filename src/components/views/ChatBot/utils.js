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
    content.forEach((item, idx) => {
      if (item.result) {
        text += `${idx + 1}. ${getContentAsText(item.result)}\n`;
      }
    });
    return text;
  } else if (typeof content === 'object') {
    return content.text;
  } else {
    return content;
  }
}

export { sanitizeResponse, extractBidInfo, extractContext, getContentAsText };
