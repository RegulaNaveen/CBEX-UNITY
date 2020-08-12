// @flow
import * as React from 'react';

type Props = {
  className: string
};

const ClipboardPencil = ({ className }: Props) => {
  return (
    <svg width={36} height={36} viewBox="0 0 24 24" className={className}>
      <defs>
        <path
          id="prefix__a"
          d="M11.812 20.068a.25.25 0 01.249.062l2.811 2.809c.065.065.09.161.062.25a.249.249 0 01-.19.172l-3.143.629a.498.498 0 01-.59-.59l.628-3.142a.248.248 0 01.173-.19zm7.617-8.204a2.71 2.71 0 013.606-.274 2.626 2.626 0 01.197 3.882l-6.679 6.679a.25.25 0 01-.353 0l-3.351-3.354a.25.25 0 010-.353zM8.998 0c1.353 0 2.605.715 3.294 1.879.043.074.122.12.208.121h4A1.5 1.5 0 0118 3.5v7.567a.25.25 0 01-.073.177l-2.5 2.5a.25.25 0 01-.427-.177V5.5a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h6.6a.25.25 0 01.197.095c.047.06.065.138.047.213-.142.614-.434 1.992-.542 2.5a.242.242 0 01-.243.192H1.5A1.5 1.5 0 010 20.5v-17A1.5 1.5 0 011.5 2h4a.243.243 0 00.204-.121A3.828 3.828 0 018.998 0zM10 14.75a.75.75 0 010 1.5H6a.75.75 0 010-1.5zm2-3.5a.75.75 0 010 1.5H6a.75.75 0 010-1.5zm0-3.5a.75.75 0 010 1.5H6a.75.75 0 010-1.5z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="none" d="M0 0h24v24H0z" />
        <mask id="prefix__b" fill="#fff">
          <use xlinkHref="#prefix__a" />
        </mask>
        <g fill="#b350bf" mask="url(#prefix__b)">
          <path d="M0 0h24v24H0z" />
        </g>
      </g>
    </svg>
  );
};

export default ClipboardPencil;
