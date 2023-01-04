// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Toolbar from '../../views/UbuildToolbar';
import { UBUILD_ARTIFACT, AUTH } from '../../../constants/api';
import { isUserUbuildAdmin } from '../../../utils/utils';
import { DASHBOARD } from '../../../routes';

const loadUbuildScript = (url, callback) => {
  const existingScript = document.getElementById('ubuild-script');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `${url}`;
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

type State = {};

type Props = {};

export class UbuildShell extends Component<Props, State> {
  constructor(props: Object) {
    super(props);
  }

  componentDidMount = () => {
    const results = isUserUbuildAdmin();
    const { history } = this.props;
    if (!results) {
      history.push(DASHBOARD);
    }
    if (loadUbuildScript && UBUILD_ARTIFACT)
      loadUbuildScript(UBUILD_ARTIFACT, () => {});
  };

  render() {
    return (
      <div className="ubuild-wrapper">
        <Toolbar />
        <u-build />
      </div>
    );
  }
}

export default withRouter(UbuildShell);
