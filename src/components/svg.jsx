import React from 'react';

const SvgIcon = ({ path, width = 24, height = 24, fill = "currentColor", className = "", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      {...props}
    >
      <path d={path} />
    </svg>
  );
};

export default SvgIcon;
