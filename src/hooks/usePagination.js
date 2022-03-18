import { useEffect, useRef, useState } from 'react';
import { API } from '../backend';

function usePagination(count, cb, url) {
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(Math.ceil(count / 5));

  useEffect(() => {
    setPageCount(Math.ceil(count / 5));
  }, [count]);

  const prevPage = () => {
    if (currPage <= 1) return;
    cb(`${url}${currPage - 1}`);
    setCurrPage(currPage - 1);
  };

  const nextPage = () => {
    if (currPage >= pageCount) return;
    cb(`${url}${currPage + 1}`);
    setCurrPage(currPage + 1);
  };

  const changePage = (pageIndex) => {
    if (pageIndex < 1 || pageIndex > pageCount) return;
    cb(`${url}${pageIndex}`);
    setCurrPage(pageIndex);
  };

  return [currPage, pageCount, prevPage, nextPage, changePage];
}

export default usePagination;
