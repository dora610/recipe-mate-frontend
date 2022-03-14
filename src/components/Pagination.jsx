import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

function Pagination({ currPage, pageCount, prevPage, nextpage }) {
  const pages = () => {
    let buttonRow = [];
    let start = 1;
    if (pageCount > 10 && pageCount - 10 < currPage) {
      start = pageCount - 10 + 1;
    }
    for (let i = start; i <= pageCount; i++) {
      buttonRow.push(
        <button
          key={i}
          className={`btn-mini backdrop-blur-2xl text-slate-800 ${
            i === currPage ? 'selected-page' : 'page-index'
          }`}
        >
          {i}
        </button>
      );
    }
    if (buttonRow.length > 10) {
      let start = 9;
      let deleteCount = pageCount - start - 1;
      buttonRow.splice(
        start,
        deleteCount,
        <span key={-1} className="text-white/50">
          ...
        </span>
      );
    }
    return buttonRow;
  };

  if (pageCount === 1) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center p-2 sm:mx-6">
      <button
        disabled={currPage === 1}
        onClick={prevPage}
        className="btn-mini disabled:bg-white/20 bg-white/70 backdrop-blur-2xl text-slate-800 p-1 md:px-4 mr-2"
      >
        <MdNavigateBefore className="md:text-2xl" />
      </button>
      <div className="flex gap-1">{pages()}</div>
      <button
        disabled={currPage === pageCount}
        onClick={nextpage}
        className="btn-mini disabled:bg-white/20 bg-white/70 backdrop-blur-2xl text-slate-800 p-1 md:px-4 ml-2"
      >
        <MdNavigateNext className="md:text-2xl" />
      </button>
    </div>
  );
}

export default Pagination;
