/* eslint-disable react/prop-types */
// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Toolbar from '../../views/UbuildToolbar';
import { UBUILD_ARTIFACT_V2, AUTH } from '../../../constants/api';
import { isUserUbuildAdmin } from '../../../utils/utils';
import { DASHBOARD } from '../../../routes';

const loadUbuildScript = (url, callback) => {
  const existingScript = document.getElementById('ubuild-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `${url}?t=${Date.now()}`;
    script.id = 'ubuild-script';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
    script.onerror = () => {
      window.location.replace(AUTH.REDIRECTION_URL);
    };
  }
  if (existingScript && callback) callback();
};

export class UbuildShell extends Component {
  componentDidMount = () => {
    const { history } = this.props;
    const results = isUserUbuildAdmin();
    if (!results) {
      history.push(DASHBOARD);
    }
    if (loadUbuildScript && UBUILD_ARTIFACT_V2)
      loadUbuildScript(UBUILD_ARTIFACT_V2, () => {});
  };

  render() {
    return (
      <div className="ubuild-wrapper">
        <Toolbar />
        <u-build-v2 />
      </div>
    );
  }
}

export default withRouter(UbuildShell);
