import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CollapsibleList from '../CollapsibleList'
import configureMockStore from 'redux-mock-store'
import { configure, mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import Adapter from 'enzyme-adapter-react-16';
import { getSelectedSection, selectNotes } from '../../../redux/selectors'
import { getProposalDetails, getSelectedBid } from '../../../redux/selectors/proposal'

configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({});
const mockDispatch = store.dispatch;
store.dispatch = jest.fn(mockDispatch);

const setup = (props = {}) => {
    const setupProps = { ...props };
    return mount(
        <Provider store={store}>
            <CollapsibleList {...setupProps} />
        </Provider>
    )
}

const initProps = {};
describe('Test CollapsibleList Component', () => {
    const wrapper = setup(initProps);

    const props = {
        selectedSection: getSelectedSection(),
        notes: selectNotes(),
        proposalDetail: getProposalDetails(),
        selectedBid: getSelectedBid(),
        title: "Customer Scenarios & BTS RFPs"
    };
    test('matchsnapshot of collapsiblelist component', () => {
        const container = render(<Provider store={store}>
            <CollapsibleList {...props} />
        </Provider>);
        expect(container).toMatchSnapshot()
    });
    test('render collapsiblelist component', () => {
        expect(wrapper.length).toBe(1)
    });
    test('should render the component onto the screen', () => {
        const {getByTestId} = render(<Provider store={store}>
            <CollapsibleList {...props} />
        </Provider>);
        expect(screen.getByTestId('collapsible-list')).toBeInTheDocument();
    });
    test('call keyboardShortcutListener function', () => {
         const keyboardShortcutListenerFunc = jest.fn();
         const mockFunc = keyboardShortcutListenerFunc();
         expect(mockFunc).toBeUndefined();
         expect(keyboardShortcutListenerFunc).toHaveBeenCalledTimes(1);
         expect(keyboardShortcutListenerFunc).toHaveBeenCalledWith();
    });
});
