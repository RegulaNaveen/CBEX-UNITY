import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import Typography from 'apollo-react/components/Typography';
import { useSelector } from 'react-redux';
import { parseMomentDate } from '../../../../utils/DateUtils';
import CustomComponents from '../CustomComponents';

// Mock useSelector hook
jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('CustomComponents', () => {
  let dateCellWrapperProps;

  beforeEach(() => {
    dateCellWrapperProps = {
      value: moment('2022-01-01'),
      currentBidDetails: [
        {
          bidDate: moment('2022-01-01'),
          bidDueDate: moment('2022-01-02')
        }
      ],
      children: <div>Children</div>
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('should render dateCellWrapper with Bid Created annotation', () => {
    useSelector.mockReturnValue({
      toJS: () => ({ isCurrent: true })
    });
    const wrapper = shallow(
      <CustomComponents.dateCellWrapper {...dateCellWrapperProps} />
    );
    expect(wrapper.find(Typography).text()).toEqual('Bid Created');
  });

  it('should render dateCellWrapper with Bid Due annotation', () => {
    useSelector.mockReturnValue({
      toJS: () => ({ isCurrent: true })
    });
    dateCellWrapperProps.value = moment('2022-01-02');
    const wrapper = shallow(
      <CustomComponents.dateCellWrapper {...dateCellWrapperProps} />
    );
    expect(wrapper.find(Typography).text()).toEqual('Bid Due');
  });

  it('should render dateCellWrapper without any annotation', () => {
    useSelector.mockReturnValue({
      toJS: () => ({ isCurrent: false })
    });
    dateCellWrapperProps.value = moment('2022-01-03');
    const wrapper = shallow(
      <CustomComponents.dateCellWrapper {...dateCellWrapperProps} />
    );
    expect(wrapper.find(Typography)).toHaveLength(0);
  });

  it('should render dateCellWrapper with past date style', () => {
    useSelector.mockReturnValue({
      toJS: () => ({ isCurrent: false })
    });
    dateCellWrapperProps.value = moment('2021-12-31');
    const wrapper = shallow(
      <CustomComponents.dateCellWrapper {...dateCellWrapperProps} />
    );
    expect(wrapper.prop('style').backgroundColor).toEqual('#F2F2F2');
  });
});
