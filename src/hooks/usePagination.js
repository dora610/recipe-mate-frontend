import { useEffect, useRef, useState } from 'react';
import { API } from '../backend';

function usePagination(count, cb) {
  const [currPage, setCurrPage] = useState(1)
  const [pageCount, setPageCount] = useState(Math.ceil(count / 5))

  useEffect(() => {
    setPageCount(Math.ceil(count / 5))
  }, [count])
  

  const prevPage = () => {
    if(currPage <= 1) return;
    cb(`${API}/recipe/all?page=${currPage - 1}`);
    setCurrPage(currPage-1)
};

const nextPage = () => {
    if(currPage >= pageCount) return;
    cb(`${API}/recipe/all?page=${currPage + 1}`);
    setCurrPage(currPage+1)
  };

  return [currPage, pageCount, prevPage, nextPage]
}

export default usePagination;