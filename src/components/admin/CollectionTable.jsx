import React from 'react';

function CollectionTable({ headers = [], className = '', children }) {
  return (
    <div
      className={`grid gap-1 ${className} text-sm bg-fuchsia-100/50 text-gray-700 px-1 py-1`}
    >
      {headers.map((head, index) => (
        <div className="cell" key={index}>
          {head}
        </div>
      ))}
      {children}
    </div>
  );
}

export default CollectionTable;
