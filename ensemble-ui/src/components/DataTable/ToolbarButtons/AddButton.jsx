import { Button } from "react-bootstrap";
import React from "react";

export default function AddButton({ onClick }) {
  return (
    <Button
      className="actionButton"
      variant="outline-secondary"
      aria-label="Add Entity"
      onClick={onClick}
    >
      <i className="bi bi-plus-lg" />
      {`Add New`}
    </Button>
  );
}
