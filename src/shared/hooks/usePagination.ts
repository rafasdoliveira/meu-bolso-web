import { PageResponse } from '../types/pageResponse';
import { useState } from 'react';

function usePagination() {
  const [pageInfo, setPageInfo] = useState<PageResponse>({
    page: 1,
    perPage: 10,
    total: 0,
  });

  function handlePreviousPage() {
    setPageInfo({ ...pageInfo, page: pageInfo.page - 1 });
  }

  function handleNextPage() {
    setPageInfo({ ...pageInfo, page: pageInfo.page + 1 });
  }

  function handleSelectPerPage(perPage: number) {
    setPageInfo({ ...pageInfo, page: 1, perPage: perPage });
  }

  return {
    handlePreviousPage,
    handleNextPage,
    handleSelectPerPage,
    pageInfo: {
      value: pageInfo,
      set: setPageInfo,
    },
  };
}

export { usePagination };
