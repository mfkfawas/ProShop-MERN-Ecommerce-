import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';

interface PaginateProps {
  total: number;
  page: number;
  // isAdmin?: boolean;
  // keyword?: string;
}

const Paginate = ({ total, page }: PaginateProps) => {
  const location = useLocation();
  const path = location.pathname;
  const baseURL = path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0];

  if (total <= 1) return null;
  return (
    <Pagination className='justify-content-center my-3'>
      {[...Array(total).keys()].map(p => (
        <LinkContainer key={p} to={`${baseURL}/page/${p + 1}`}>
          <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
