import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sinon from 'sinon';
import CustomApolloRichText from '../CustomApolloRichText';

describe('CustomApolloRichText unit tests', () => {
  const sinonSandbox = Sinon.createSandbox();

  beforeEach(() => {
    sinonSandbox.restore();
  });

  afterAll(() => {
    sinonSandbox.restore();
  });

  it('should render richtext editor with placeholder', async () => {
    const props = {
      questionId: '',
      richTextString: '',
      richTextVal: { blocks: [] },
      richTextHtml: '',
      placeholder: 'Test placeholder',
      onBlur: () => {},
      onChange: () => {},
      onFocus: () => {},
      isEditable: false,
      enableFocus: true,
      className: '',
      error: false,
      disabled: false
    };

    const { getByRole, findByText, findByRole, debug, findByTestId } = render(
      <CustomApolloRichText {...props} />
    );
    await waitFor(async () => {
      expect(await findByText('Test placeholder')).toBeInTheDocument();
      expect(await findByRole('textbox')).toBeInTheDocument();
    });
    const textbox = getByRole('textbox');
    fireEvent.paste(textbox, {
      clipboardData: {
        types: ['text/plain'],
        getData: () => '@'
      }
    });
    await waitFor(async () => {
      expect(await findByText('@')).toBeInTheDocument();
      expect(await findByTestId('tag-user-list')).toBeInTheDocument();
    });
  });
});
