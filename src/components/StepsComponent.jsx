import React from 'react';

function StepsComponent({ title, stepsList = [], ...props }) {
  return (
    <div {...props}>
      <div className="rounded-lg py-1 bg-fuchsia-50/50 shadow-md">
        <h3 className=" ml-2 text-fuchsia-700 py-2 pl-4 text-xl font-semibold">
          {title}
        </h3>
        {stepsList.map((step, index) => (
          <details
            key={index}
            open
            className="text-slate-700 marker:text-fuchsia-600 open:bg-white open:shadow-md open:rounded-lg open:my-2 px-2 py-2 mx-2 hover:open:shadow-lg"
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
