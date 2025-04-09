import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisibleButtons?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisibleButtons = 5,
}) => {
  const getPageNumbers = () => {
    const half = Math.floor(maxVisibleButtons / 2);
    let start = Math.max(currentPage - half, 1);
    const end = Math.min(start + maxVisibleButtons - 1, totalPages);

    if (end - start + 1 < maxVisibleButtons) {
      start = Math.max(end - maxVisibleButtons + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = getPageNumbers();

    return pages.map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`pagination-item ${currentPage === page ? "active" : ""}`}
        aria-label={`Ir a página ${page}`}
      >
        {page}
      </button>
    ));
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-container" aria-label="Paginación">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="pagination-nav"
        aria-label="Página anterior"
      >
        &laquo;
      </button>

      {currentPage > maxVisibleButtons / 2 + 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="pagination-item"
            aria-label="Ir a primera página"
          >
            1
          </button>
          {currentPage > maxVisibleButtons / 2 + 2 && (
            <span className="pagination-ellipsis">...</span>
          )}
        </>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages - maxVisibleButtons / 2 && (
        <>
          {currentPage < totalPages - maxVisibleButtons / 2 - 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="pagination-item"
            aria-label="Ir a última página"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-nav"
        aria-label="Página siguiente"
      >
        &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
