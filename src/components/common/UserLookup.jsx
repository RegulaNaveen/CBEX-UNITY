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
  text?: string,
  title?: string
};

const UserLookup = ({ fetchUsers, users, onChange, text, title }: Props) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Lookup data={users} getSelectedItem={onChange} text={text} title={title} />
  );
};

UserLookup.defaultProps = {
  text: '',
  title: ''
};

const mapStateToProps = state => ({ users: getLookupUsers(state) });

export default connect(mapStateToProps, { fetchUsers: getAllUsers })(
  UserLookup
);
