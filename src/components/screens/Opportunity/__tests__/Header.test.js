import React from 'react';
import { shallow } from 'enzyme';
import Header from '../QuestionsForCustomerTab/Header';
import Typography from 'apollo-react/components/Typography';

describe('testing Header component', () => {
  test('test whether the component is rendered or not', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });

  test('testing the header', () => {
    const wrapper = shallow(<Header />);

    const header = <Typography>Questions for the Customer</Typography>;
    expect(wrapper.find(header)).toBeTruthy();
  });

  test('testing the sub-heading', () => {
    const wrapper = shallow(<Header />);

    const SubHeader = (
      <Typography> Add questions and answers as needed</Typography>
    );
    expect(wrapper.find(SubHeader)).toBeTruthy();
  });
});
