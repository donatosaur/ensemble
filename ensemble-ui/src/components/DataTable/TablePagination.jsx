import { Button } from "react-bootstrap";

/**
 * Creates a table pagination component
 * @param {Object} props
 * @param {number} props.currentPage the current page number
 * @param {number} props.maxPage the maximum page number
 * @param {function(): void} props.setCurrentPage sets the current page number state
 * @returns {JSX.Element}
 */
export default function TablePagination({ currentPage, maxPage, setCurrentPage }) {
  return (
    <>
      <Button
        disabled={currentPage === 1}
        variant="outline"
        onClick={(event) => {
          event.preventDefault();
          setCurrentPage(Math.max(currentPage - 1, 1));
        }}
      >
        <i className="bi bi-chevron-left" />
      </Button>
      <p className="d-inline">{`Page ${currentPage} of ${maxPage}`}</p>
      <Button
        disabled={currentPage === maxPage}
        variant="outline"
        onClick={(event) => {
          event.preventDefault();
          setCurrentPage(Math.min(currentPage + 1, maxPage));
        }}
      >
        <i className="bi bi-chevron-right" />
      </Button>
    </>
  );
}
