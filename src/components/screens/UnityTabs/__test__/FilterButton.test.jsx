import React from 'react';
import { shallow } from 'enzyme';
import Button from 'apollo-react/components/Button';
import Filter from 'apollo-react-icons/Filter';
import { useSelector } from 'react-redux';
import FilterButton from '../FilterButton';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('FilterButton', () => {
  let wrapper;
  const setIsShowFilters = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation(callback =>
      callback({
        unitytab: { filters: [] }
      })
    );
    wrapper = shallow(<FilterButton setIsShowFilters={setIsShowFilters} />);
  });

  afterEach(() => {
    setIsShowFilters.mockClear();
  });

  it('should render a Button component', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('should call setIsShowFilters when the Button is clicked', () => {
    wrapper.find(Button).simulate('click');
    expect(setIsShowFilters).toHaveBeenCalled();
  });

  it('should display "Filter" text when there are no filters applied', () => {
    expect(wrapper.find(Button).text()).toEqual('Filter');
  });

  it('should display "Filter (n)" text when n filters are applied', () => {
    useSelector.mockImplementation(callback =>
      callback({
        unitytab: { filters: [{ value: 'foo' }, { value: 'bar' }] }
      })
    );
    wrapper = shallow(<FilterButton setIsShowFilters={setIsShowFilters} />);
    expect(wrapper.find(Button).text()).toEqual('Filter (2)');
  });
});
