import { Button } from "react-bootstrap";
import React from "react";

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
