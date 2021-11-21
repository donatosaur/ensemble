import { Button } from "react-bootstrap";
import React from "react";

export default function SearchButton({ onClick }) {
  return (
    <Button
      className="actionButton"
      variant="outline-secondary"
      aria-label="Search"
      onClick={onClick}
    >
      <i className="bi bi-search" />
      {`Search`}
    </Button>
  );
}
