import React from 'react';
import { shallow } from 'enzyme';
import ValidateTable from '../ValidateTable';
import { List } from 'immutable';

describe.skip('ValidateTable', () => {
    const data = List([
        {
            title: 'Opportunity 1',
            unityData: 'CRM Data 1',
            intakeData: 'Intake Data 1',
            status: 'match'
        },
        {
            title: 'Opportunity 2',
            unityData: 'CRM Data 2',
            intakeData: 'Intake Data 2',
            status: 'no match'
        },
        {
            title: 'Opportunity 3',
            unityData: 'CRM Data 3',
            intakeData: 'Intake Data 3',
            status: 'null'
        }
    ]);

    it('renders the correct number of rows', () => {
        const wrapper = shallow(<ValidateTable data={data} />);
        expect(wrapper.find('.row')).toHaveLength(data.size);
    });

    it('renders the correct title for each row', () => {
        const wrapper = shallow(<ValidateTable data={data} />);
        data.forEach((item, index) => {
            expect(wrapper.find('.row').at(index).find('.row-content').at(0).text()).toEqual(item.title);
        });
    });

    it('renders the correct unity data for each row', () => {
        const wrapper = shallow(<ValidateTable data={data} />);
        data.forEach((item, index) => {
            expect(wrapper.find('.row').at(index).find('.row-content').at(1).text()).toEqual(item.unityData);
        });
    });

    it.skip('renders the correct intake data for each row', () => {
        const wrapper = shallow(<ValidateTable data={data} />);
        data.forEach((item, index) => {
            expect(wrapper.find('.row').at(index).find('.crm-intake-data').find('.intake').find('p').text()).toEqual(item.intakeData);
        });
    });

    it.skip('renders the correct icon for each row', () => {
        const wrapper = shallow(<ValidateTable data={data} />);
        data.forEach((item, index) => {
            expect(wrapper.find('.row').at(index).find('.tooltip').find('.icon').prop('iconType')).toEqual(item.status);
        });
    });
});
