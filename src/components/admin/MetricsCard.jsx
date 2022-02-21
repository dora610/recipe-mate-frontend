import React from 'react';

function MetricsCard({ content = '', count = 0 }) {
  return (
    <div className="grid place-items-center content-center bg-fuchsia-100 shadow-md hover:shadow-lg text-gray-600 h-32">
      <p className="text-5xl font-light leading-snug">{count}</p>
      <h4 className="text-sm font-semibold capitalize">{content}</h4>
    </div>
  );
}

export default MetricsCard;
