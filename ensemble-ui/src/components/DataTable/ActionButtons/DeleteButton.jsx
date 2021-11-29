import { Button } from "react-bootstrap";
import React from "react";

/**
 * @param {Object} props 
 * @param {() => {}} props.onClick
 * @returns {JSX.Element}
 */
export default function DeleteButton({ onClick }) {
  return (
    <>
      <Button
        className="actionButton"
        variant="outline-secondary"
        aria-label="Delete"
        onClick={onClick}
      >
        <i className="bi bi-trash" />
      </Button>
    </>
  );
}
