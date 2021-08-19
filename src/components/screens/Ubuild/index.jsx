// @flow
import React, { Component } from 'react';
type State = {
};

type Props = {
};
export class UbuildShell extends Component<Props, State> {

  constructor(props: Object) {
    super(props);
  }

  componentDidMount() {
      if(loadUbuildScript)
        loadUbuildScript();
  }
  render() {
    return (
      <div className='proposal-wrapper'>
          <u-build></u-build>
      </div>
    );
  }
}

export default UbuildShell;
