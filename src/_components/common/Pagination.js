'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, handlePageChange }) {
  console.log('Current Page:', page);
  console.log('Total Pages:', totalPages);
  const getPaginationNumbers = (currentPage, totalPages) => {
    const siblingCount = 1; // Number of pages to show immediately around the current page
    const lastPage = totalPages;

    const range = (start, end) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const totalPageNumbers = siblingCount * 2 + 5; // 1 (first) + siblingCount + current + siblingCount + last + 2 (ellipses)

    /*
      Case 1: If the number of total pages is less than or equal to the total numbers we want to show,
      we show all pages without any ellipses.
    */
    if (totalPageNumbers >= lastPage) {
      return range(1, lastPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;

    const firstPage = 1;

    /*
      Case 2: No left dots to show, but rights dots are needed
      [1, 2, 3, 4, ..., totalPages]
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount; // Pages 1, 2, 3 + siblings around current
      let leftRange = range(1, leftItemCount);

      return [...leftRange, '...', lastPage];
    }

    /*
      Case 3: No right dots to show, but left dots are needed
      [1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages]
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount; // Pages totalPages-2, totalPages-1, totalPages + siblings around current
      let rightRange = range(lastPage - rightItemCount + 1, lastPage);

      return [firstPage, '...', ...rightRange];
    }

    /*
      Case 4: Both left and right dots are needed
      [1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages]
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPage, '...', ...middleRange, '...', lastPage];
    }

    return []; // Should not reach here, but as a fallback
  };

  const paginationNumbers = getPaginationNumbers(page, totalPages);

  if (totalPages <= 1) return null; // Don't show pagination if there's only one page

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-full text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {paginationNumbers.map((num, index) =>
        num === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-700">
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-200${
              page === num
                ? ' bg-[#800000] text-white'
                : ' bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-current={page === num ? 'page' : undefined}
          >
            {num}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-full text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
} 