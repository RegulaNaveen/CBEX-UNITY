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
