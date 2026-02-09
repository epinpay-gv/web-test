import React from 'react';
import { Button } from '../Button/Button';
import { AngleLeft, AngleRight } from 'flowbite-react-icons/outline';

interface PaginationProps {
  count: number;
  current_page: number;
  has_more: boolean;
  per_page: number;
  total_page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current_page,
  total_page,
  onPageChange,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (total_page <= 10) {
      for (let i = 1; i <= total_page; i++) {
        pages.push(i);
      }
    } else {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      for (let i = total_page - 4; i <= total_page; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (current_page > 1) {
      onPageChange(current_page - 1);
    }
  };

  const handleNext = () => {
    if (current_page < total_page) {
      onPageChange(current_page + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center bg-(--bg-neutral-primary-soft) rounded-lg w-fit">
      {/* Geri Butonu */}
      <Button
        variant='tertiatry'
        onClick={handlePrevious}
        padding='xs'
        size='sm'
        icon={<AngleLeft />}
        disabled={current_page === 1}
        className={`flex items-center justify-center rounded-l-xl rounded-r-none border transition-all`}
        aria-label="Previous page"
      />

      {/* Sayfa Numaraları */}
      {pageNumbers.map((page, index) => (
        <Button
          key={index}
          text={String(page)}
          variant='tertiatry'
          size="sm"
          onClick={() => handlePageClick(page)}
          disabled={page === '...' || page === current_page}
          className={` flex items-center justify-center rounded-none border-t border-b border-r transition-all font-medium`}
        >
  
        </Button>
      ))}

      {/* İleri Butonu */}
      <Button
        onClick={handleNext}
        variant='tertiatry'
        padding='xs'
        size='sm'
        icon={<AngleRight />}
        disabled={current_page === total_page}
        className={`flex items-center justify-center rounded-r-xl border-t border-b border-r- rounded-l-none transition-all`}
        aria-label="Next page"
      />
    </div>
  );
};

export default Pagination;