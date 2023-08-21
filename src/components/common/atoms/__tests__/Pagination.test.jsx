import React from 'react';
import { mount } from 'enzyme';
import Pagination from '../Pagination';

describe('Pagination', () => {
  const props = {
    maxRows: 10,
    totalItems: 100,
    getCurrentPage: jest.fn(),
    eventCategories: {},
    userActions: {},
    trackEvent: jest.fn()
  };

  it('should render the correct number of pages', () => {
    const wrapper = mount(<Pagination {...props} />);
    const pages = wrapper.find('.pagination__page');
    expect(pages).toHaveLength(4);
  });

  it('should call getCurrentPage when a page button is clicked', () => {
    const wrapper = mount(<Pagination {...props} />);
    const pageBtn = wrapper.find('.pagination__page').at(3);
    pageBtn.simulate('click');
    expect(props.getCurrentPage).toHaveBeenCalledWith(4);
  });

  it('should go to the next chunk of pages when the right arrow is clicked', () => {
    const wrapper = mount(<Pagination {...props} />);
    const rightArrow = wrapper.find('.arrow__right');
    rightArrow.simulate('click');
    const pages = wrapper.find('.pagination__page');
    expect(pages).toHaveLength(4);
    expect(pages.first().text()).toEqual('5');
  });

  it('should go to the previous chunk of pages when the left arrow is clicked', () => {
    const wrapper = mount(<Pagination {...props} />);
    const rightArrow = wrapper.find('.arrow__right');
    rightArrow.simulate('click');
    const leftArrow = wrapper.find('.arrow__left');
    leftArrow.simulate('click');
    const pages = wrapper.find('.pagination__page');
    expect(pages).toHaveLength(4);
    expect(pages.first().text()).toEqual('1');
  });
});
