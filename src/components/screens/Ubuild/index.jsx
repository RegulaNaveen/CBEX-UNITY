// @flow
import React, { Component } from 'react';
import Toolbar from '../../views/toolbar';
import {UBUILD_ARTIFACT} from '../../../constants/api'
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
