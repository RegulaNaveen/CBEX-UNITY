// @flow
import React from 'react';
import type { Node } from 'react';

type Props = {
  child: Node,
  title: string,
  content: string
};

const ToolTip = ({ child, title, content }: Props) => (
  <div className="tooltip-wrapper">
    <div className="child">{child}</div>
    <div className="tooltip">
      <p>{title}</p>
      <p>{content}</p>
    </div>
  </div>
);

export default ToolTip;
