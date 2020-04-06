// @flow
import React from 'react';
import { shallow } from 'enzyme';
import type { ShallowWrapper } from 'enzyme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../../src/PrivateRoute';
import App from '../../src/App';

export default class AppModel {
  constructor() {
    this._wrapper = shallow(<App />);
  }

  _wrapper: ShallowWrapper;

  _getBroswerRouter = (): ShallowWrapper => this._wrapper.find(BrowserRouter);

  _getSwitch = (): ShallowWrapper => this._wrapper.find(Switch);

  _getLogin = (): ShallowWrapper => this._wrapper.find(Route);

  _getPrivateRoute = (): ShallowWrapper => this._wrapper.find(PrivateRoute);

  hasBroswerRouter = (): boolean => this._getBroswerRouter().length === 1;

  hasSwitch = (): boolean => this._getSwitch().length === 1;

  hasLoginRoute = (): boolean => this._getLogin().length === 1;

  getLoginPath = (): string => this._getLogin().prop('path');

  hasPrivateRoute = (): boolean => this._getPrivateRoute().length === 1;
}
