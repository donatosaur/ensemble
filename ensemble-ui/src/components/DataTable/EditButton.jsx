import { Button } from "react-bootstrap";
import React from "react";

export default function EditButton({ onClick }) {
  return (
    <>
      <Button
        className="actionButton"
        variant="outline-dark"
        color="primary"
        aria-label="Edit"
        onClick={onClick}
      >
        <i className="bi bi-pencil-fill" />
      </Button>
    </>
  );
}
