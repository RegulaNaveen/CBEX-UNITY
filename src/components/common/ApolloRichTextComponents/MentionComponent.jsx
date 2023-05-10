import React from 'react';

const mentionStyles = {
  color: '#0768fd'
};

// MENTION entity's component with name (first and last name)
export function MentionComponentWithName(props) {
  return <span style={mentionStyles}>{props.children}</span>;
}

// MENTION entity's component with email
export function MentionComponentWithEmail(props) {
  const data = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      style={mentionStyles}
      href={`mailto:${(data && data.email && data.email) || ''}`}
    >
      {props.children}
    </a>
  );
}

// MENTION entity's component with HyperLink
export function MentionComponentWithLink(props) {
  const { decoratedText } = props;
  return (
    <a
      style={mentionStyles}
      href={`${window?.location?.origin}/opportunities/${decoratedText}`}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
// Function to add http to the link address
function parseUrl(decoratedText) {
  let urlWithHttp;
  if (decoratedText.startsWith('http')) {
    urlWithHttp = decoratedText;
  } else if (decoratedText.startsWith('www')) {
    urlWithHttp = `https://${decoratedText}`;
  } else {
    urlWithHttp = `https://www.${decoratedText}`;
  }

  return urlWithHttp;
}
// MENTION entity's component with HyperLink(Copied hyperlink)
export function MentionComponentWithCopiedHyperlink(props) {
  const { decoratedText } = props;
  const data = props.contentState.getEntity(props.entityKey).getData();
  const { url } = data;
  let urlWithHttp;
  if (url) {
    urlWithHttp = parseUrl(url);
  }

  return (
    <span>
      <a
        style={mentionStyles}
        href={urlWithHttp}
        target="_blank"
        rel="noreferrer"
        data-testid="decorated-copied-link"
      >
        {props.children}
      </a>
    </span>
  );
}
// Mention component with all types of links
export function MentionComponentWithHyperLink(props) {
  const { decoratedText } = props;
  const urlWithHttp = parseUrl(decoratedText);

  return (
    <a
      style={mentionStyles}
      href={urlWithHttp}
      target="_blank"
      rel="noreferrer"
      data-testid="decorated-link"
    >
      {props.children}
    </a>
  );
}
