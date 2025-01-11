import React from "react";

interface PaginationProps {
  currentPage: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalRecords,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalRecords / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 border rounded ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Total Records: {totalRecords}
        </span>
        <div>
          <label className="mr-2 text-sm text-gray-600">Page Size:</label>
          <select
            className="border rounded px-2 py-1"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <button
          className={`mx-1 px-3 py-1 border rounded ${
            isFirstPage
              ? "opacity-50 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
          onClick={handlePrevious}
          disabled={isFirstPage}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className={`mx-1 px-3 py-1 border rounded ${
            isLastPage
              ? "opacity-50 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
          onClick={handleNext}
          disabled={isLastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
