// @flow
import React from 'react';
import { connect } from 'react-redux';
import Lookup from './Lookup';
import { getLookupUsers } from '../../../../redux/selectors';

type Props = {
  users: Array<Object>,
  onChange: Function,
  text?: string,
  title?: string,
  withReset?: boolean
};

const UserLookup = ({ users, onChange, text, title, withReset }: Props) => (
  <Lookup
    data={users}
    getSelectedItem={onChange}
    text={text}
    title={title}
    withReset={withReset}
  />
);

UserLookup.defaultProps = {
  text: '',
  title: '',
  withReset: false
};

const mapStateToProps = (state) => ({
  users: getLookupUsers(state)
});

export default connect(mapStateToProps)(UserLookup);
