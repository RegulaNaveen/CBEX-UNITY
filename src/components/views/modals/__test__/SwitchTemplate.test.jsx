/**
 * jest-dom js environment
 */
import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { 
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import { store } from '../../../../store';
import SwitchTemplate from '../SwitchTemplate';
import * as ProposalApi from '../../../../api/proposal';

const SwitchWithRedux = (props) => (
    <Provider store={store}>
        <SwitchTemplate {...props} />
    </Provider>
);

const otList = [
    "Core Opportunity Launch Call (AMR/EMEA)",
    "Core Opportunity Launch Call (APAC)",
    "Non-Core Clinical Studies",
    "Ballpark",
    "IQB Template",
    "PILOT - DO NOT USE: PROGRAMS",
    "Default Type"
];

describe('testing switch template component', () => {
    test('render without crashing', () => {
        render(<SwitchWithRedux open />);
        expect(screen.getByText('Opportunity Type Override'))
            .toBeInTheDocument();
        fireEvent.click(screen.getByText('Cancel'));
    });

    test('change opportunity type with existing version', async () => {
        jest.spyOn(ProposalApi, 'changeProposalOT').mockResolvedValue({ 
            data: { message: 'rejected' } 
        });
        render(
            <SwitchWithRedux 
                open
                otList={otList}
                isBtnDisabledRefresh
                selectedBidId="12345"
                setOpenModal={jest.fn()}
                opportunityType="Default Type"
            />
        );
        const selectedOpType = screen.getByRole('button', { name: 'Default Type' });
        expect(selectedOpType).toBeInTheDocument();
        expect(screen.getByRole('button', { name:  /refresh/i}))
            .toBeDisabled();
        const changeBtn = screen.getByRole('button', { name:  /change/i});
        expect(changeBtn).toBeDisabled();

        fireEvent.click(selectedOpType);
        waitFor(() => {
            const IQBTemplate = screen.getByText('IQB Template')
            expect(IQBTemplate).toBeInTheDocument();
            fireEvent.click(IQBTemplate);
            expect(changeBtn).toBeEnabled();
            fireEvent.click(changeBtn);
        });
        
    });

    test('update opportunity type with latest version', async () => {
        jest.spyOn(ProposalApi, 'changeProposalOT').mockRejectedValue({ 
            data: { message: 'resolved' }
        });
        render(
            <SwitchWithRedux 
                open
                otList={otList}
                selectedBidId="12345"
                setOpenModal={jest.fn()}
                opportunityType="Core Opportunity Launch Call (AMR/EMEA)"
            />
        );
        expect(screen.getByText('Core Opportunity Launch Call (AMR/EMEA)')).toBeInTheDocument();
        const refreshBtn = screen.getByRole('button', { name:  /refresh/i});
        expect(refreshBtn).toBeEnabled();
        expect(screen.getByRole('button', { name:  /change/i})).toBeDisabled();

        fireEvent.click(refreshBtn);
        await waitFor (() => {
            expect(screen.getByText("Alert")).toBeInTheDocument();
            
        });
        waitFor(() => {
            fireEvent.click(screen.getByText("close"));
            expect(screen.getByText("Alert")).not.toBeInTheDocument();
        });
    });
});