import { Button } from "react-bootstrap";
import React from "react";

export default function AddButton({ onClick }) {
  return (
    <Button
      className="actionButton"
      variant="primary"
      aria-label="Add Entity"
      onClick={onClick}
    >
      <i className="bi bi-plus-lg me-1" />
      {`Add New`}
    </Button>
  );
}
