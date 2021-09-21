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
  withReset?: boolean,
  className?: string
};

const UserLookup = ({
  users,
  onChange,
  text,
  title,
  withReset,
  placeholder,
  className
}: Props) => (
  <Lookup
    data={users}
    getSelectedItem={onChange}
    text={text}
    className={className || ''}
    placeholder={placeholder}
    title={title}
    withReset={withReset}
  />
);

UserLookup.defaultProps = {
  text: '',
  title: '',
  withReset: false,
  placeholder: '',
  className: ''
};

const mapStateToProps = state => ({
  users: getLookupUsers(state)
});

export default connect(mapStateToProps)(UserLookup);
