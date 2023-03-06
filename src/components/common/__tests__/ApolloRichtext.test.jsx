import React from 'react';
import { render } from '@testing-library/react';
import {
  MentionComponentWithName,
  MentionComponentWithEmail,
  MentionComponentWithLink
} from '../ApolloRichTextComponents/MentionComponent';

describe('Mention Components', () => {
  describe('MentionComponentWithName', () => {
    it('renders the component with the given name', () => {
      const name = 'John Doe';
      const { getByText } = render(
        <MentionComponentWithName>{name}</MentionComponentWithName>
      );
      expect(getByText(name)).toBeInTheDocument();
    });
  });

  describe('MentionComponentWithEmail', () => {
    it('renders the component with the given email', () => {
      const email = 'johndoe@example.com';
      const entityKey = '0';
      const contentState = {
        getEntity: () => ({ getData: () => ({ email }) })
      };
      const { getByText } = render(
        <MentionComponentWithEmail
          entityKey={entityKey}
          contentState={contentState}
        >
          {email}
        </MentionComponentWithEmail>
      );
      const link = getByText(email);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `mailto:${email}`);
    });

    it('renders the component with an empty href when no email is provided', () => {
      const entityKey = '0';
      const contentState = {
        getEntity: () => ({ getData: () => ({}) })
      };
      const { getByText } = render(
        <MentionComponentWithEmail
          entityKey={entityKey}
          contentState={contentState}
        >
          John Doe
        </MentionComponentWithEmail>
      );
      const link = getByText('John Doe');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'mailto:');
    });
  });

  describe('MentionComponentWithLink', () => {
    it('renders the component with the given link', () => {
      const text = '1234';
      const decoratedText = '1234';
      const { getByText } = render(
        <MentionComponentWithLink decoratedText={decoratedText}>
          {text}
        </MentionComponentWithLink>
      );
      const link = getByText(text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        'href',
        `${window?.location?.origin}/opportunities/${decoratedText}`
      );
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });
});
