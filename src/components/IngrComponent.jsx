import React from 'react';

function IngrComponent({ title, contentList = [] }) {
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-primary-bold">{title}</h3>
      <ul className="flex gap-2 flex-wrap mt-3 bg-fuchsia-50/50 px-2 py-2 rounded-xl">
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
