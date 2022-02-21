import React from 'react';

function StepsComponent({ title, stepsList = [], ...props }) {
  return (
    <div {...props}>
      <h3 className="text-primary-bold">{title}</h3>
      <div className="mt-4 rounded-lg overflow-y-auto bg-gray-200/50 px-1 py-1">
        {stepsList.map((step, index) => (
          <details
            key={index}
            className="text-slate-700 open:bg-white open:shadow-xl open:rounded-lg open:my-2 px-2 py-2 mx-2"
          >
            <summary className="text-sm leading-7 font-semibold select-none hover:cursor-pointer px-2">
              Step {index + 1}{' '}
            </summary>
            <p className="text-primary text-slate-700 leading-6 text-sm py-2 px-2">
              {step}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default StepsComponent;
