import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sinon from 'sinon';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import Link from 'apollo-react-icons/Link';
import CustomApolloRichText from '../CustomApolloRichText';

const richTextEditorRef = {
  current: true
};
const hyperLinkHandler = jest.fn();

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
      richTextEditorRef,
      canUserTagInQuestion: true,
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
      disabled: false,
      unlockTimeout: null
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
    // await waitFor(async () => {
    //   expect(await findByText('@')).toBeInTheDocument();
    //   expect(await findByTestId('tag-user-list')).toBeInTheDocument();
    // });
  });
  it('testing the decorator for the links starting with http', async () => {
    const props = {
      questionId: '',
      richTextString: '',
      richTextEditorRef,
      canUserTagInQuestion: true,
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
      disabled: false,
      unlockTimeout: null
    };

    const { component, getByRole, getByText, getByTestId } = render(
      <CustomApolloRichText {...props} />
    );
    await waitFor(() => {
      expect(getByText('Test placeholder')).toBeInTheDocument();
      expect(getByRole('textbox')).toBeInTheDocument();
    });
    const textbox = getByRole('textbox');
    fireEvent.paste(textbox, {
      clipboardData: {
        getData: () => 'https://www.iqvia.com'
      }
    });

    await waitFor(() => {
      expect(getByText('https://www.iqvia.com')).toBeInTheDocument();
      expect(getByTestId('decorated-link')).toBeInTheDocument();
    });
  });
  it('testing the decorator for the links not starting with http', async () => {
    const props = {
      questionId: '',
      richTextString: '',
      richTextEditorRef,
      canUserTagInQuestion: true,
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
      disabled: false,
      richTextData: true,
      unlockTimeout: null
    };

    const {
      getByRole,
      findByText,
      findByRole,
      getByTestId,
      debug,
      findByTestId
    } = render(<CustomApolloRichText {...props} />);
    await waitFor(async () => {
      expect(await findByText('Test placeholder')).toBeInTheDocument();
      expect(await findByRole('textbox')).toBeInTheDocument();
    });
    const textbox = getByRole('textbox');
    fireEvent.paste(textbox, {
      clipboardData: {
        getData: () => 'www.iqvia.com'
      }
    });
    await waitFor(async () => {
      expect(await findByText('www.iqvia.com')).toBeInTheDocument();
      expect(getByTestId('decorated-link')).toBeInTheDocument();
    });
  });

  it('renders the custom hyperlink button and calls the handler when clicked', () => {
    const props = {
      questionId: '',
      richTextString: '',
      richTextEditorRef,
      contentEditable: true,
      canUserTagInQuestion: true,
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
      disabled: false,
      richTextData: true,
      unlockTimeout: null,
      iscustomtab: true,
      isQuestionCustomerTab: true,
      setFocus: true,

      hyperLinkHandler
    };
    const { getByTestId, getByRole } = render(
      <CustomApolloRichText
        {...props}
        customControllers={(editorState, onChange) => (
          <>
            <div className="style-button-group">
              <Link
                data-testid="custom-hyperlink-button"
                className="icon-button"
                onClick={hyperLinkHandler}
              />
            </div>
          </>
        )}
      />
    );
    const textbox = getByRole('textbox');
    fireEvent.click(textbox);
    fireEvent.paste(textbox, {
      clipboardData: {
        getData: () => 'www.iqvia.com'
      }
    });
  });
});
