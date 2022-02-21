import React from 'react';

function IngrComponent({ title, contentList = [] }) {
  return (
    <div className="flex flex-col items-start">
      <h3>{title}</h3>
      <ul className="flex gap-2 flex-wrap my-4 bg-gray-200/50 px-2 py-2 rounded-xl">
        {contentList.map((ele, index) => (
          <li key={index} className="min-card-blocks">
            {ele}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngrComponent;
