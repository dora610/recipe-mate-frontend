import React from 'react';

function StepsComponent({ title, stepsList = [], ...props }) {
  return (
    <div {...props}>
      <div className="mt-4 rounded-lg px-1 py-1 ">
        <h3 className="text-primary-bold ml-4">{title}</h3>
        {stepsList.map((step, index) => (
          <details
            key={index}
            open={index === 0}
            className="text-slate-700 open:bg-white open:shadow-md open:rounded-lg open:my-2 px-2 py-2 mx-2 hover:open:shadow-lg"
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
