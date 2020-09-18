// @flow
import React from 'react';
import { connect } from 'react-redux';
import Lookup from './Lookup';
import { getLookupUsers } from '../../selectors';

type Props = {
  users: Array<Object>,
  onChange: Function,
  text?: string
};

const UserLookup = ({ users, onChange, text }: Props) => {
  return <Lookup data={users} getSelectedItem={onChange} text={text} />;
};

UserLookup.defaultProps = {
  text: ''
};

const mapStateToProps = state => ({
  users: getLookupUsers(state)
});

export default connect(mapStateToProps)(UserLookup);
