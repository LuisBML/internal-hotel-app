import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ELEMENTS_PER_PAGE } from '../utils/constants';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ countElements }) {
  // URL params
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(countElements / ELEMENTS_PER_PAGE);

  const nextPage = function () {
    // if we are in the last page return currentPage else increase currentPage by 1
    const nextValue = currentPage === pageCount ? currentPage : currentPage + 1;

    // Save state in the URL/ set URL param
    searchParams.set('page', nextValue);
    setSearchParams(searchParams);
  };

  const prevPage = function () {
    // if we are in the first page return currentPage else decrease currentPage by 1
    const prevVaalue = currentPage === 1 ? currentPage : currentPage - 1;

    // Save state in the URL/ set URL param
    searchParams.set('page', prevVaalue);
    setSearchParams(searchParams);
  };

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * ELEMENTS_PER_PAGE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount
            ? countElements
            : currentPage * ELEMENTS_PER_PAGE}
        </span>{' '}
        of <span>{countElements}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
