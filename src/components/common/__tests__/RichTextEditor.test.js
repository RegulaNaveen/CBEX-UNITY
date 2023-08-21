import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import { store } from '../../../store';
import RichTextEditor from '../RichTextEditor';

const defaultProps = {
    label: "",
    defaultValue: null,
    placeholder: "",
    readOnly: false,
    disabled: false,
    hideControls: [],
    customStyles: {},
    onChange: () => { },
}

describe('testing richtext editor component', () => {
    test('rendering the component without crashing', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <RichTextEditor {...defaultProps} />
            </Provider>
        );
        expect(getByTestId('rich-text-editor')).toBeInTheDocument();
    });

    test("displays the correct label", () => {
        render(<RichTextEditor label="Test Label" />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

})