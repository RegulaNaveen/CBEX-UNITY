import React from 'react';
import { shallow } from 'enzyme';
import ValidateTable from '../ValidateTable';
import { Map } from 'immutable';

describe('ValidateTable', () => {
    const data = [
        Map({
            title: 'Opportunity 1',
            unityData: 'CRM Data 1',
            intakeData: 'Intake Data 1',
            status: 'match'
        }),
        Map({
            title: 'Opportunity 2',
            unityData: 'CRM Data 2',
            intakeData: 'Intake Data 2',
            status: 'no match'
        }),
        Map({
            title: 'Opportunity 3',
            unityData: 'CRM Data 3',
            intakeData: 'Intake Data 3',
            status: 'null'
        })
    ];

    it('renders the correct number of rows', () => {
        const wrapper = shallow(<ValidateTable data={data} />);
        expect(wrapper.props().className).toBe('validate-table');
    });
});
