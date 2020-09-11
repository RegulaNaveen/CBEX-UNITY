// @flow
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Lookup from './Lookup';
import { getAllUsers } from '../../actions/auth-actions';
import { getLookupUsers } from '../../selectors';

type Props = {
  fetchUsers: Function,
  users: Array<Object>,
  onChange: Function,
  text?: string
};

const UserLookup = ({ fetchUsers, users, onChange, text }: Props) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  return <Lookup data={users} getSelectedItem={onChange} text={text} />;
};

UserLookup.defaultProps = {
  text: ''
};

const mapStateToProps = state => ({ users: getLookupUsers(state) });

export default connect(mapStateToProps, { fetchUsers: getAllUsers })(
  UserLookup
);
