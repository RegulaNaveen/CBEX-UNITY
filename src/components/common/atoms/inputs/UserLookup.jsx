// @flow
import React from 'react';
import { connect } from 'react-redux';
import Lookup from './Lookup';
import { getLookupUsers } from '../../../../redux/selectors';

type Props = {
  users: Array<Object>,
  onChange: Function,
  text?: string,
  placeholder?: string,
  title?: string,
  withReset?: boolean
};

const UserLookup = ({
  users,
  onChange,
  text,
  title,
  withReset,
  placeholder
}: Props) => (
  <Lookup
    data={users}
    getSelectedItem={onChange}
    text={text}
    placeholder={placeholder}
    title={title}
    withReset={withReset}
  />
);

UserLookup.defaultProps = {
  text: '',
  title: '',
  withReset: false,
  placeholder: ''
};

const mapStateToProps = state => ({
  users: getLookupUsers(state)
});

export default connect(mapStateToProps)(UserLookup);
