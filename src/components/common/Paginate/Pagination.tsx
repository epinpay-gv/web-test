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
      return pages;
    }
    if (current_page <= 5) {      
      for (let i = 1; i <= 8; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total_page);
    } else if (current_page >= total_page - 4) {
      pages.push(1);
      pages.push('...');
      for (let i = total_page - 7; i <= total_page; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current_page - 2; i <= current_page + 3; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total_page);
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
          text={page === 'empty' ? '' : String(page)}
          variant='tertiatry'
          size="sm"
          onClick={() => handlePageClick(page)}
          disabled={page === '...' || page === current_page || page === 'empty'}
          className={`flex items-center justify-center rounded-none border-t border-b border-r transition-all font-medium
          ${page === current_page ? 'border-none' : ''}   
          ${page === (current_page - 1) ? 'border-r-0' : ''}
          ${page === 'empty' ? 'invisible' : ''}
          `}
        />
      ))}

      {/* İleri Butonu */}
      <Button
        onClick={handleNext}
        variant='tertiatry'
        padding='xs'
        size='sm'
        icon={<AngleRight />}
        disabled={current_page === total_page}
        className={`flex items-center justify-center rounded-r-xl border-t border-b border-r- rounded-l-none transition-all
          ${current_page === total_page ? 'border-l' : '' }
          `}
        aria-label="Next page"
      />
    </div>
  );
};

export default Pagination;