import { Button } from "react-bootstrap";
import React from "react";

export default function DensityButton({ onClick }) {
  return (
   <Button
     className="actionButton"
     variant="outline-secondary"
     aria-label="Change Density"
     onClick={onClick}
   >
     <i className="bi bi-border-width" />
     {`Density`}
   </Button>
  );
}
