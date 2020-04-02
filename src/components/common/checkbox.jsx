// @flow
import React from 'react';
import '../../../styles/App.scss';

const CheckBox = () => (
  <label htmlFor='checkbox' type='checkbox' className='checkbox-label'>
    <input id='checkbox' type='checkbox' className='checkbox-input' />
    Remember my username
  </label>
);

export default CheckBox;
