// Packages
import React from 'react';
import classNames from 'classnames';

// Components
import useStyles from './styles';
import { Box, IconButton } from '@mui/material';
import { usePagination, DOTS } from './usePagination';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// Component
interface CustomPaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className
}) => {
  const classes = useStyles();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // Renderers Vars
  const lastPage = paginationRange[paginationRange.length - 1];

  // Renderers
  return (
    <Box className={classNames(classes.container, { [className]: className })}>
      <IconButton disabled={_.isEqual(currentPage, 1)} onClick={onPrevious}>
        <ChevronLeft color="primary" />
      </IconButton>
      {paginationRange?.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={classNames(classes.paginationItem, 'dots')}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={classNames(classes.paginationItem, {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <IconButton disabled={_.isEqual(currentPage, lastPage)} onClick={onNext}>
        <ChevronRight color="primary" />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;
