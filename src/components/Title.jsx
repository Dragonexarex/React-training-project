import React from 'react';

export default (props) => {
  const { className, title } = props;
  return (
    <div className={className}>
      <span>{title}</span>
    </div>
  );
};
