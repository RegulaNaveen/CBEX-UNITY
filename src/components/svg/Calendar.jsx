// @flow
import * as React from 'react';

type Props = {
  className: string
};

const Calendar = ({ className }: Props) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" className={className}>
      <path
        d="M21.5 3h-2.75a.25.25 0 01-.25-.25V1a1 1 0 00-2 0v4.75a.75.75 0 11-1.5 0V3.5a.5.5 0 00-.5-.5H8.25A.25.25 0 018 2.751V1a1 1 0 10-2 0v4.75a.75.75 0 01-1.5 0V3.5A.5.5 0 004 3H2.5a2 2 0 00-2 2v17a2 2 0 002 2h19a2 2 0 002-2V5a2 2 0 00-2-2zM21 22H3a.5.5 0 01-.5-.5v-12A.5.5 0 013 9h18a.5.5 0 01.5.5v12a.5.5 0 01-.5.5z"
        fill="#999999"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default Calendar;
