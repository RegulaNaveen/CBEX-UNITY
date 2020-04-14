// @flow
import * as React from 'react';

type Props = {
  className: string
};

function CloseCircle(props: Props) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" {...props}>
      <path
        d="M20.488 3.515c-4.685-4.68-12.277-4.678-16.96.005-4.682 4.684-4.682 12.276 0 16.96 4.683 4.683 12.275 4.686 16.96.005 4.678-4.69 4.678-12.28 0-16.97zm-3.779 11.764a1 1 0 01-1.409 1.415l-3.11-3.11a.252.252 0 00-.354 0l-3.109 3.11c-.395.38-1.02.38-1.415 0a1 1 0 010-1.415l3.11-3.109a.249.249 0 000-.353l-3.11-3.11a1 1 0 011.41-1.415l3.109 3.11a.25.25 0 00.354 0l3.11-3.11a1 1 0 011.414 1.415l-3.11 3.11a.25.25 0 000 .353l3.11 3.109z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  )
}

export default CloseCircle;
