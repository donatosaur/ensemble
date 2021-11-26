import React from "react";
import { Button } from "react-bootstrap";

/**
 * Creates a table pagination component
 * @param {number} currentPage the current page number
 * @param handleDecrease handle left chevron click
 * @param handleIncrease handle right chevron click
 * @returns {JSX.Element}
 */
export default function TablePagination({
  currentPage,
  maxPage,
  // setCurrentPage,
  // setPageSize,
}) {

  return (
   <>
      <Button 
        disabled={Math.round(currentPage) === 1} 
        variant="outline" 
        // onClick={setCurrentPage(Math.max(currentPage - 1, 1))}
        >
        <i className="bi bi-chevron-left" />
      </Button>
        {`Page ${currentPage} of 2`}
      <Button 
        disabled={Math.round(currentPage) === maxPage} 
        variant="outline" 
        // onClick={setCurrentPage(Math.min(currentPage + 1, maxPage))}
      >
        <i className="bi bi-chevron-right" />
      </Button>
   </>
  )
}
