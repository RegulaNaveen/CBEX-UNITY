// @flow
import React, { Component } from 'react';
import Toolbar from '../../views/toolbar';
import {UBUILD_ARTIFACT, AUTH} from '../../../constants/api'

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
        console.log('Could not load web component artifacts');
        window.location.replace(AUTH.REDIRECTION_URL);
      };
    }
    if (existingScript && callback) callback();
};

type State = {
};

type Props = {
};

export class UbuildShell extends Component<Props, State> {

  constructor(props: Object) {
    super(props);
  }

  componentDidMount = () => {
    if(loadUbuildScript && UBUILD_ARTIFACT)  
        loadUbuildScript(UBUILD_ARTIFACT, ()=>console.log('Ubuild web component loaded'));
  }
  render() {
    return ( 
      <div className='ubuild-wrapper'>
          <Toolbar />
          <u-build></u-build>
      </div>
    );
  }
}

export default UbuildShell;
