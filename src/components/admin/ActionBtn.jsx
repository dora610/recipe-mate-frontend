import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';

function ActionBtn({ updateHandler, deleteHandler }) {
  return (
    <div className={`flex space-x-2 cell`}>
      <FiEdit3
        className="stroke-blue-700 hover:fill-blue-400"
        onClick={updateHandler}
      />
      <MdDeleteOutline
        className="fill-red-700 hover:fill-red-400"
        onClick={deleteHandler}
      />
    </div>
  );
}

export default ActionBtn;
