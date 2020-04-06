// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../../src/PrivateRoute';

export default class PrivateRouteModel {
  constructor(children: any, isAuthenticated: boolean) {
    const props = {
      children,
      isAuthenticated
    };
    this._wrapper = shallow(<PrivateRoute {...props} />);
  }

  _wrapper: ShallowWrapper;

  _getRoute = (): ShallowWrapper => this._wrapper.find(Route);

  hasRoute = (): boolean => this._getRoute().length === 1;

  getRenderedChildren = (): any | Redirect => {
    const renderFunction = this._getRoute().prop('render');
    const children = renderFunction();
    return children;
  };

  getRedirectToPath = (): string => this.getRenderedChildren().props.to;
}
