import { Button } from "react-bootstrap";
import React from "react";

/**
 * @param {Object} props 
 * @param {() => {}} props.onClick
 * @returns {JSX.Element}
 */
export default function EditButton({ onClick }) {
  return (
    <>
      <Button
        className="actionButton"
        variant="outline-secondary"
        aria-label="Edit"
        onClick={onClick}
      >
        <i className="bi bi-pencil-fill" />
      </Button>
    </>
  );
}
