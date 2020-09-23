// @flow
import React from 'react';
import { connect } from 'react-redux';
import Lookup from './Lookup';
import { getLookupUsers } from '../../selectors';

type Props = {
  users: Array<Object>,
  onChange: Function,
  text?: string,
  title?: string
};

const UserLookup = ({ users, onChange, text, title }: Props) => (
  <Lookup data={users} getSelectedItem={onChange} text={text} title={title} />
);

UserLookup.defaultProps = {
  text: '',
  title: ''
};

const mapStateToProps = state => ({
  users: getLookupUsers(state)
});

export default connect(mapStateToProps)(UserLookup);
